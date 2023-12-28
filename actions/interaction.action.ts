"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { ViewQuestionParams } from "./shared.types";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (!existingInteraction) {
        await Interaction.create({
          user: userId,
          action: "view",
          question: questionId,
        });
        await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
      }
    } else {
      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
