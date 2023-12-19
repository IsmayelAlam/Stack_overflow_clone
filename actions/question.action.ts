"use server";

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../lib/mongoose";
import { CreateQuestionParams } from "./shared.types";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    const { title, content, tags, author } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDoc = [];
    // create tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, "i"),
          },
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDoc.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDoc } },
    });

    // create a interaction record for the user's ask question action
    await Interaction.create({
      user: author,
      question: question._id,
      action: "ask-question",
      tags: tagDoc,
    });

    // increment author reputation by +5 points for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });
  } catch (error) {
    console.log(error);
  }
}
