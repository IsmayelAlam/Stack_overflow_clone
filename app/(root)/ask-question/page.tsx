import Questions from "@/components/forms/Questions";
import React from "react";

export default function AskQuestions() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Questions />
      </div>
    </>
  );
}
