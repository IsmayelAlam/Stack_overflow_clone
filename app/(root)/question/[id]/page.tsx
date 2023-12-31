import { getQuestionsById } from "@/actions/question.action";
import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, auth } from "@clerk/nextjs";
import { getUserById } from "@/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";
import { URLProps } from "@/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: URLProps): Promise<Metadata> {
  const question = await getQuestionsById({
    questionId: params.id,
  });
  return {
    title: `${question.title} | Stack Overflow`,
    description: `${question.title} question on Stack Overflow clone app`,
  };
}

export default async function Question({ params, searchParams }: URLProps) {
  const question = await getQuestionsById({ questionId: params.id });

  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) mongoUser = await getUserById({ userId: clerkId });

  return (
    <>
      <div className="flex-start w-full flex-col ">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={question.author.picture}
              alt="profile picture"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser?._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="=clock icon"
          value={`asked ${getTimeStamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={question.answers.length}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={question.id}
        userId={mongoUser?._id}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page}
      />

      <SignedIn>
        <Answer
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(mongoUser?._id)}
        />
      </SignedIn>
    </>
  );
}
