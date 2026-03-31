import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-screen h-[16vh] flex flex-col justify-center items-center bg-black">
      <div className="flex text-white px-8 items-center justify-center text-center w-full">
        <p>
          currently working at {""}
          <Link
            target="_blank"
            href="https://www.saha.co.nz"
            className="text-blue-500"
          >
            <u>Saha</u>
          </Link>{" "}
          and grinding leetcode 😔
        </p>
      </div>
    </footer>
  );
}
