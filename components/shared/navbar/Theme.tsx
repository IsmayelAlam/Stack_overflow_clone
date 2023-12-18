"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { THEMES } from "@/constants";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

export default function Theme() {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          <Image
            src={`/assets/icons/${mode}.svg`}
            width={20}
            height={20}
            alt="theme toggle button"
            className="active-theme cursor-pointer"
          />
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {THEMES.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => setMode(theme.value)}
            >
              <Image
                src={theme.icon}
                width={16}
                height={16}
                alt="theme toggle button"
                className={`${mode === theme.value && "active-theme"}`}
              />
              <span
                className={`body-semibold ${
                  mode === theme.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {theme.label}
              </span>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
