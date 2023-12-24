import { getUserQuestions } from "@/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
interface QuestionTabProps {
  userId: string;
  clerkId?: string | null;
  searchProps?: { [key: string]: string | undefined };
}

export default async function QuestionTab({
  searchProps,
  userId,
  clerkId,
}: QuestionTabProps) {
  const { userQuestions } = await getUserQuestions({
    userId,
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
      <div className="mt-10">Pagination</div>
    </>
  );
}
