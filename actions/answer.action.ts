"use server";

import { connectToDatabase } from "@/lib/mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { voting } from "./commonActions";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { author, content, path, question } = params;

    const newAnswer = await Answer.create({
      author,
      content,
      question,
    });

    // add the answer to the question answers array
    // const questionObject =
    await Question.findByIdAndUpdate(question, {
      $push: {
        answers: newAnswer._id,
      },
    });

    revalidatePath(path);

    return newAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, path, hasdownVoted } = params;

    await voting({
      id: answerId,
      userId,
      hasupVoted,
      hasdownVoted,
      type: "answer",
      vote: "up",
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downVoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, path, hasdownVoted } = params;

    await voting({
      id: answerId,
      userId,
      hasupVoted,
      hasdownVoted,
      type: "answer",
      vote: "down",
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
