"use client";
import { useRef, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import splitText from "@/lib/splitText";

export default function Nav() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`h-(--header-height) duration-500 bg-primary flex items-center cursor-crosshair fixed top-0 left-0 z-20 p-3`}
        ref={wrapRef}
      >
        <div className="h-full">
          <Image
            src="/common/logo_md.svg"
            alt="arisevan"
            width={80}
            height={80}
            className="w-auto h-full"
          />
        </div>
        <div
          className={`flex-grow font-silkscreen  whitespace-nowrap mx-5 overflow-hidden text-[clamp(60px,4vw,80px)] leading-[0.8]`}
        >
          <Marquee>
            <div>{splitText(" ✦ The F2E Rollercoaster")}</div>
            <div>{splitText(" ✦ The F2E Rollercoaster")}</div>
          </Marquee>
        </div>
      </div>
    </>
  );
}
