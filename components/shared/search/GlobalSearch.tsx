"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalResult from "./GlobalResult";

export default function GlobalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search, router, pathname, searchParams]);

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
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
        />
        {isOpen && <GlobalResult />}
      </div>
    </div>
  );
}
