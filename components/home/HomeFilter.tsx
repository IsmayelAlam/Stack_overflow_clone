"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

export default function HomeFilter() {
  const active = "newest";
  return (
    <div className="my-2 flex items-center gap-2 max-md:hidden">
      {HomePageFilters.map((filter, i) => (
        <Button
          className={`${
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          } body-medium rounded-lg px-6 py-3 capitalize shadow-none`}
          key={filter.value}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}
