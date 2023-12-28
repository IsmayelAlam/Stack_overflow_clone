import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign in | Stack Overflow",
  description: "Sign in to Stack Overflow clone app",
};

export default function SignInPage() {
  return <SignIn />;
}
