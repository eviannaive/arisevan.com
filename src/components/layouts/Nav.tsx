"use client";
import { useRef, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import splitText from "@/utils/splitText";

export default function Nav() {
  const [HeaderHeight, setHeaderHeight] = useState("");
  const HeaderHeightScroll = useRef("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [headerShow, setHeaderShow] = useState(false);
  const [headerSmall, setHeaderSmall] = useState(false);

  const style_header = useMemo(() => {
    const maxHeaderHeight = Number(HeaderHeight.replace("px", ""));
    const finalHeaderHeight = Number(
      HeaderHeightScroll.current.replace("px", ""),
    );
    const caculateHeight = maxHeaderHeight - scrollY;
    if (scrollY === 0) {
      return maxHeaderHeight;
    } else if (caculateHeight > finalHeaderHeight) {
      return caculateHeight;
    } else {
      return finalHeaderHeight;
    }
  }, [scrollY, HeaderHeight]);

  const storeScrollY = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(
        "--header-caculate",
        style_header + "px",
      );
      setHeaderShow(true);
      if (style_header <= 140) setHeaderSmall(true);
      else setHeaderSmall(false);
    }
  }, [style_header]);

  useEffect(() => {
    setHeaderHeight(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height",
      ),
    );
    HeaderHeightScroll.current = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--header-height-scroll");
    window.addEventListener("scroll", storeScrollY);
    return () => window.removeEventListener("scroll", storeScrollY);
  }, []);

  return (
    <>
      <div
        className={`h-(--header-height) teansition-[height] transition-opacity duration-500 bg-primary  flex items-center cursor-crosshair fixed top-0 left-0 z-10 ${headerShow ? "opacity-100" : "opacity-0"} ${headerSmall ? "p-3" : "p-5"}`}
        style={{ height: style_header + "px" }}
        ref={wrapRef}
      >
        {headerSmall ? (
          <div className="h-full">
            <Image
              src="/common/logo_md.svg"
              alt="arisevan"
              width={80}
              height={80}
              className="w-auto h-full mt-1"
            />
          </div>
        ) : (
          <Image
            src="/common/logo_large.svg"
            alt="arisevan"
            width={180}
            height={160}
          />
        )}
        <div
          className={`flex-grow font-silkscreen  whitespace-nowrap mx-5 overflow-hidden  ${headerSmall ? "text-[clamp(60px,4vw,80px)]" : "text-[clamp(60px,10vw,128px)]"}`}
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
