import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <footer className="relative z-10 w-screen h-auto flex flex-row justify-end items-center py-8 px-8 lg:px-16">
      <nav className="flex flex-row gap-8">
        <Link href="/tech" className="text-gray-500 hover:underline">
          Tech
        </Link>
        <Link
          target="_blank"
          href="https://www.linktr.ee/andrewxymusic"
          className="text-gray-500 hover:underline"
        >
          Music
        </Link>
      </nav>
    </footer>
  );
}
