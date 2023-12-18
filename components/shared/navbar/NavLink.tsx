"use client";

import { SidebarLink } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({ link }: { link: SidebarLink }) {
  const pathName = usePathname();
  const isActive =
    (pathName.includes(link.route) && link.route.length > 1) ||
    pathName === link.route;

  return (
    <Link
      href={link.route}
      key={link.route}
      className={`flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4 ${
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
      <span
        className={`${
          isActive ? "base-bold" : "base-medium"
        }  max-lg:hidden max-sm:inline-block`}
      >
        {link.label}
      </span>
    </Link>
  );
}
