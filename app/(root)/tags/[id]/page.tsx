import { getQuestionsByTagId } from "@/actions/tag.action";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResults from "@/components/shared/NoResults";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { URLProps } from "@/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: URLProps): Promise<Metadata> {
  const { tagTitle } = await getQuestionsByTagId({
    tagId: params.id,
  });
  return {
    title: `Tags-${tagTitle} | Stack Overflow`,
    description: "Browse the Tags of Stack Overflow clone app",
  };
}

export default async function Tag({ params, searchParams }: URLProps) {
  const pageSize = 20;
  const page = searchParams?.page ? +searchParams?.page : 1;

  const { tagTitle, questions, isNext } = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    pageSize,
    page,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="my-10 flex flex-col gap-6">
        {questions.length > 0 ? (
          questions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="There is no tag quesiton to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <Pagination pageNumber={page} isNext={isNext} />
    </>
  );
}
