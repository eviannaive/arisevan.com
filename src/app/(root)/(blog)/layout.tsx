"use client";
import Nav from "@/components/layouts/Nav";
import Image from "next/image";
import { useState, useRef } from "react";

const data_menu = [
  {
    img: "/menu/js.svg",
    label: "Javascript",
  },
  {
    img: "/menu/react.svg",
    label: "React",
  },
  {
    img: "/menu/vue.svg",
    label: "Vue",
  },
  {
    img: "/menu/workflow.svg",
    label: "Workflow",
  },
  {
    img: "/menu/fish.svg",
    label: "Arisevan",
  },
];

const data_sub = [
  { label: "sub1", route: "/sub1" },
  { label: "sub2", route: "/sub2" },
  { label: "sub3", route: "/sub3" },
  { label: "sub4", route: "/sub4" },
  { label: "geotkeiourioewjfkldjfklsafs fkl;dskf;s", route: "/sub5" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hoverTextMain, setHoverTextMain] = useState("");
  const [hoverTextSub, setHoverTextSub] = useState("");
  const [showBreadCrumb, setShowBreadCrumb] = useState(true);
  const [breadCrumb, setBreadCrumb] = useState(
    "Javascript/JavaScript 是一種腳本，也能稱它為程式語言，可以讓你在網頁中實現出複雜的功能。",
  );
  const [menuExpand, setMenuExpand] = useState(true);

  return (
    <>
      <Nav />
      <div className="">
        <div className="flex">
          <div
            className={`w-(--menu-width) h-screen border-r-2 bg-white/70 border-primary fixed top-0 left-0 shrink-0 z-10 transition-[width] ${menuExpand ? "w-(--menu-width)" : "w-16"}`}
          >
            <div className="flex pt-(--header-height) h-full relative">
              <div className="flex justify-between w-12 text-primary-800 absolute top-(--header-height) -right-6 pt-2 z-10">
                <button
                  className="cursor-pointer hover:text-teal-300"
                  onClick={() => setMenuExpand(false)}
                >
                  ◀
                </button>
                <button
                  className="cursor-pointer hover:text-teal-300"
                  onClick={() => setMenuExpand(true)}
                >
                  ▶
                </button>
              </div>
              <div className="w-16 bg-gray-300 px-1 pt-1 shrink-0 relative z-10">
                <div className="w-full grid grid-cols-1">
                  {data_menu.map((d, index) => (
                    <label
                      key={index}
                      className="w-full p-2 bg-gray-100/60 grid place-content-center cursor-pointer  border-4 border-gray-300 hover:border-primary-800/80 hover:bg-white has-checked:bg-white"
                      onMouseEnter={() => {
                        setShowBreadCrumb(false);
                        setHoverTextMain(`${d.label}`);
                        setHoverTextSub("");
                      }}
                      onMouseLeave={() => {
                        setShowBreadCrumb(true);
                      }}
                    >
                      <Image src={d.img} alt={d.label} width="50" height="50" />
                      <input
                        type="radio"
                        className="hidden"
                        name="main"
                        value={d.label}
                        onClick={() => {
                          setBreadCrumb(`${d.label}`);
                        }}
                      ></input>
                    </label>
                  ))}
                </div>
              </div>
              <div
                className={`flex-grow p-4 pt-8 custom-scrollbar h-[calc(100vh-var(--header-height))] overflow-y-scroll relative ${!menuExpand && "hidden"}`}
              >
                <ul className="grid grid-cols-1 break-words w-full">
                  {data_sub.map((d, index) => (
                    <label
                      className="py-1 hover:text-primary-900 cursor-pointer hover:underline has-checked:text-primary-900 has-checked:underline"
                      key={index}
                      onMouseEnter={() => {
                        setHoverTextSub(`${d.label}`);
                        setShowBreadCrumb(false);
                      }}
                      onMouseLeave={() => {
                        setShowBreadCrumb(true);
                      }}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        name="sub"
                        value={d.label}
                        onClick={() => {
                          setBreadCrumb(`${hoverTextMain}/${d.label}`);
                        }}
                      ></input>
                      <div>{d.label}</div>
                    </label>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`flex-grow h-[200vh] pt-(--header-height) ${menuExpand ? "pl-(--menu-width)" : "p-0"}`}
          >
            <div
              className={`px-4 py-2 pl-7 fixed top-(--header-height) ${menuExpand ? "left-(--menu-width)" : "left-16"}`}
            >
              {showBreadCrumb ? (
                <div>{breadCrumb}</div>
              ) : (
                <div>
                  {hoverTextMain}
                  {hoverTextSub && "/"}
                  {hoverTextSub}
                </div>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
