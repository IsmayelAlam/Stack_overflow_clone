import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

export default function RightSidebar() {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((q) => (
            <Link
              href="#"
              className="flex cursor-pointer items-center justify-between gap-7"
              key={q.id}
            >
              <p className="body-medium text-dark500_light700">{q.ques}</p>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-[30px]">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/// /////////////----------------------->
const questions = [
  {
    id: 1,
    ques: "question 01?",
  },
  {
    id: 2,
    ques: "question 02?",
  },
  {
    id: 3,
    ques: "question 03?",
  },
  {
    id: 4,
    ques: "question 04?",
  },
  {
    id: 5,
    ques: "question 05?",
  },
];
const popularTags = [
  {
    _id: 1,
    name: "JS",
    totalQuestions: 25,
  },
  {
    _id: 2,
    name: "NextJS",
    totalQuestions: 55,
  },
  {
    _id: 3,
    name: "Server",
    totalQuestions: 20,
  },
  {
    _id: 4,
    name: "NodeJS",
    totalQuestions: 10,
  },
  {
    _id: 5,
    name: "TS",
    totalQuestions: 5,
  },
];
