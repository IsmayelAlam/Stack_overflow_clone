import { getUserQuestions } from "@/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";
interface QuestionTabProps {
  userId: string;
  clerkId?: string | null;
  page: number;
}

export default async function QuestionTab({
  userId,
  clerkId,
  page,
}: QuestionTabProps) {
  const { userQuestions, isNext } = await getUserQuestions({
    userId,
    page,
  });

  return (
    <>
      {userQuestions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      <Pagination pageNumber={page} isNext={isNext} />
    </>
  );
}
