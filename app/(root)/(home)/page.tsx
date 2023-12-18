import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import { title } from "process";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[40px] rounded-lg px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilter />
      <div className="mt-10 flex flex-col gap-6">
        {ques.length > 0 ? (
          ques.map((q) => "q")
        ) : (
          <NoResults
            title="There is no quesiton to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}

const ques = [];
// [
//   {
//     _id: 1,
//     title: "python import function?",
//     tags: [
//       { _id: 1, name: "python" },
//       { _id: 2, name: "sql" },
//     ],
//     author: "jhon",
//     upvotes: 10,
//     views: 100,
//     answers: 2,
//     createdAt: "2023-09-01T12:00:00.000Z",
//   },
//   {
//     _id: 2,
//     title: "Center a div in html?",
//     tags: [
//       { _id: 1, name: "html" },
//       { _id: 2, name: "css" },
//     ],
//     author: "Jassy",
//     upvotes: 8,
//     views: 120,
//     answers: 5,
//     createdAt: "2023-09-01T12:00:00.000Z",
//   },
// ];
