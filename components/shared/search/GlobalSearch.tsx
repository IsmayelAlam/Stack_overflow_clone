import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

export default function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={"/assets/icons/search.svg"}
          width={24}
          height={24}
          alt="stack overflow logo"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          className="no-focus paragraph-regular placeholder:text-dark500_light500 text-dark100_light900 border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
}
