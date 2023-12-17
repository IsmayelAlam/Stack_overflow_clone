import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";

export default function Navbar() {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:p-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="stack overflow logo"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          stack<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      {/* GlobalSearch */}
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "h-8 w-8" },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
        {/* mobile */}
      </div>
    </nav>
  );
}
