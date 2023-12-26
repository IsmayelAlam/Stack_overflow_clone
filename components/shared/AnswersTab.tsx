import { getUserAnswers } from "@/actions/user.action";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";
interface AnswersTabProps {
  userId: string;
  clerkId?: string | null;
  page: number;
}

export default async function AnswersTab({
  page,
  userId,
  clerkId,
}: AnswersTabProps) {
  const { userAnswers, isNext } = await getUserAnswers({ userId, page });

  return (
    <>
      {userAnswers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}

      <Pagination pageNumber={page} isNext={isNext} />
    </>
  );
}
