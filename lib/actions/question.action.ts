"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: string) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}
