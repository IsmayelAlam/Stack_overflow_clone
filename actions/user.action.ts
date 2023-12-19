import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;

    // get user by id
    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
