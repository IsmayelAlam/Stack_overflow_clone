"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { CommonVoteParams } from "./shared.types";
import User from "@/database/user.model";

export async function voting({
  id,
  userId,
  hasupVoted,
  hasdownVoted,
  type,
  vote,
}: CommonVoteParams) {
  let updateQuery = {};

  if (vote === "up" ? hasupVoted : hasdownVoted) {
    updateQuery =
      vote === "up"
        ? { $pull: { upvotes: userId } }
        : { $pull: { downvotes: userId } };
  } else if (vote === "up" ? hasdownVoted : hasupVoted) {
    updateQuery =
      vote === "up"
        ? {
            $pull: { downvotes: userId },
            $push: { upvotes: userId },
          }
        : (updateQuery = {
            $pull: { upvotes: userId },
            $push: { downvotes: userId },
          });
  } else {
    updateQuery =
      vote === "up"
        ? { $addToSet: { upvotes: userId } }
        : { $addToSet: { downvotes: userId } };
  }

  const value =
    type === "question"
      ? await Question.findByIdAndUpdate(id, updateQuery, {
          new: true,
        })
      : await Answer.findByIdAndUpdate(id, updateQuery, {
          new: true,
        });

  if (!value) throw new Error(`No ${type} found`);

  if (vote === "up") {
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -2 : 2 * (hasdownVoted ? 2 : 1) },
    });

    await User.findByIdAndUpdate(value.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 * (hasdownVoted ? 2 : 1) },
    });
  }
  if (vote === "down") {
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? 2 : -2 * (hasupVoted ? 2 : 1) },
    });

    await User.findByIdAndUpdate(value.author, {
      $inc: { reputation: hasdownVoted ? 10 : -10 * (hasupVoted ? 2 : 1) },
    });
  }

  return value;
}
