import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(2).max(150),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(20)).min(1).max(5),
});

export const answerSchema = z.object({
  answer: z.string().min(100),
});
