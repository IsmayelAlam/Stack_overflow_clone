import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(2).max(150),
  explanation: z.string().min(150),
  tag: z.array(z.string().min(1).max(25)).min(1).max(5),
});
