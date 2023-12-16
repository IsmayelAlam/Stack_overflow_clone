import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Home() {
  return (
    <main>
      <h1>home</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
