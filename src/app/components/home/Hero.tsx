import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SiLinkedin } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { TbBrandLinktree } from "react-icons/tb";
import { SiGmail } from "react-icons/si";

import bg from "@/public/bg.gif";

export default function Hero() {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      <Image
        src={bg}
        alt="bg"
        className="absolute inset-0 z-0 opacity-5 h-[112vh]"
      />
      <div className="flex flex-col items-center gap-8 z-10">
        <h1 className="text-2xl md:text-4xl lg:text-6xl">
          Hi, I&apos;m Andrew!
        </h1>
        <p>Portfolio under construction</p>
        <div className="flex flex-row gap-8">
          <Link
            target="_blank"
            href="mailto:axyc13@gmail.com"
            className="transition-transform hover:scale-130"
          >
            <SiGmail className="w-8 h-8" />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/andrew-chen1"
            className="transition-transform hover:scale-130"
          >
            <SiLinkedin className="w-8 h-8" />
          </Link>
          <Link
            target="_blank"
            href="https://www.github.com/axyc13"
            className="transition-transform hover:scale-130"
          >
            <SiGithub className="w-8 h-8" />
          </Link>
          <Link
            target="_blank"
            href="https://www.linktr.ee/andrewxymusic"
            className="transition-transform hover:scale-130"
          >
            <TbBrandLinktree className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </section>
  );
}
