import { URLProps } from "@/types";
import { getUserById } from "@/actions/user.action";
import { auth } from "@clerk/nextjs";
import Profile from "@/components/forms/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Stack Overflow",
  description: "Edit your profile on Stack Overflow clone app",
};

export default async function EditUser({ params, searchParams }: URLProps) {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
}
