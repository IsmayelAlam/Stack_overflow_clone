import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Stack Overflow",
  description:
    "A stack overflow clone to showcase the web development skills of ismayel alam",
  icons: "/assets/images/site-logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
