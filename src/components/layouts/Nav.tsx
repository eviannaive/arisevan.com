"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import splitText from "@/utils/splitText";

export default function Nav() {
  return (
    <>
      <div className="h-(--header-height) bg-primary p-5 flex items-center cursor-crosshair">
        <Image
          src="/common/logo_large.svg"
          alt="arisevan"
          width={180}
          height={160}
        />
        <Marquee className="font-silkscreen text-9xl whitespace-nowrap mx-5 overflow-hidden">
          <div>{splitText("The F2E Rollercoaster")}</div>
        </Marquee>
      </div>
    </>
  );
}
