import { connectToDatabase } from "@/lib/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.find({ userId });

    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "tag1", questions: ["test question"] },
      { _id: "2", name: "tag2", questions: ["test question"] },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tag = await Tag.find();

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
