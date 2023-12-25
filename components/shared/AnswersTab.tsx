import { getUserAnswers } from "@/actions/user.action";
import AnswerCard from "../cards/AnswerCard";
interface AnswersTabProps {
  userId: string;
  clerkId?: string | null;
  searchProps?: { [key: string]: string | undefined };
}

export default async function AnswersTab({
  searchProps,
  userId,
  clerkId,
}: AnswersTabProps) {
  const { userAnswers } = await getUserAnswers({ userId });

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

      <div className="mt-10">Pagination</div>
    </>
  );
}
