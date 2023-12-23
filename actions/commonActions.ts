import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { CommonVoteParams } from "./shared.types";

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

  return value;
}
