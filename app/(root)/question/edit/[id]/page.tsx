import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/actions/user.action";
import { getQuestionsById } from "@/actions/question.action";
import Questions from "@/components/forms/Questions";

export default async function EditQuestions({ params }: URLProps) {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const question = await getQuestionsById({ questionId: params.id });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Questions
          type="Edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionData={JSON.stringify(question)}
        />
      </div>
    </div>
  );
}
