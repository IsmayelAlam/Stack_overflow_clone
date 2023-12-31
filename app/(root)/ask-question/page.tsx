import { getUserById } from "@/actions/user.action";
import Questions from "@/components/forms/Questions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Questions | Stack Overflow",
  description: "Ask Questions on Stack Overflow clone app",
};

export default async function AskQuestions() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="my-9">
        <Questions mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </>
  );
}
