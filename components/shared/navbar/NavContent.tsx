"use client";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavContent() {
  const pathName = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathName.includes(link.route) && link.route.length > 1) ||
          pathName === link.route;

        return (
          <SheetClose asChild key={link.route}>
            <Link
              href={link.route}
              className={`flex items-center justify-start gap-4 bg-transparent p-4 ${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              }`}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={`${link.label} icon`}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <span className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </span>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
}
