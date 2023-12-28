"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

// The AI function is disable for now. need paid plan, try next month

interface Props {
  question: string;
  authorId: string;
  editorRef: any;
}

export default function AiAnswer({ question, authorId, editorRef }: Props) {
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);

  const generateAiAnswer = async () => {
    if (!authorId) return;
    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ question }),
        }
      );

      const aiAnswer = await response.json();

      const formatedAnswer = aiAnswer.reply.replace(/\n/g, "<br />");
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formatedAnswer);
      }
    } catch (error: any) {
      return;
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <Button
      className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
      onClick={generateAiAnswer}
    >
      {isSubmittingAI ? (
        <>Generating...</>
      ) : (
        <>
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate AI answer
        </>
      )}
    </Button>
  );
}
