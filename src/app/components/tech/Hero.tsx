import Link from "next/link";
import Image from "next/image";
import React from "react";

import bg from "@/public/bg.gif";
import { SiGithub } from "react-icons/si";

export default function Hero() {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8 bg-white">
      <Image
        src={bg}
        alt="bg"
        className="absolute inset-0 z-0 opacity-5 h-[112vh]"
      />
      <div className="flex flex-col items-center gap-32 z-10">
        <Link
          target="_blank"
          href="https://www.github.com/axyc13"
          className="transition-transform hover:scale-110"
        >
          <SiGithub className="w-50 h-50" />
        </Link>
        <Link
          href="/"
          className="text-gray-500 hover:bg-gray-500 hover:text-white text-sm rounded-lg border px-4 py-2"
        >
          Back Home.
        </Link>
      </div>
    </section>
  );
}
