import { sidebarLinks } from "@/constants";
import NavLink from "./navbar/NavLink";
import { Button } from "../ui/button";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function LeftSidebar() {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => (
          <NavLink link={link} key={link.route} />
        ))}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                alt="Log In icon"
                className="invert-colors max-lg:inline-block max-sm:hidden lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden max-sm:inline-block">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                width={20}
                height={20}
                alt="Sign Up icon"
                className="invert-colors max-lg:inline-block max-sm:hidden lg:hidden"
              />
              <span className="max-lg:hidden max-sm:inline-block">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
}
