"use client";
import Link from "next/link";
import { useState } from "react";

const initialList = [
  { id: 1, title: "Title 1", content: "Content 1" },
  { id: 2, title: "Title 2", content: "Content 2" },
  { id: 3, title: "Title 3", content: "Content 3" },
  { id: 4, title: "Title 4", content: "Content 4" },
  { id: 5, title: "Title 5", content: "Content 5" },
  { id: 6, title: "Title 6", content: "Content 6" },
  { id: 7, title: "Title 7", content: "Content 7" },
  { id: 8, title: "Title 8", content: "Content 8" },
  { id: 9, title: "Title 9", content: "Content 9" },
  { id: 10, title: "Title 10", content: "Content 10" },
];

export default function Home() {
  const [list, setList] = useState(initialList);
  return (
    <>
      <div className="p-20">
        <Link href="/happycoding" className="text-5xl font-bold bg-gray-300">
          Go dash board
        </Link>
        <div>
          {list.map((item, index) => {
            return (
              <div key={index} className="border border-red-300 p-4 mt-4">
                <div className="flex justify-between">
                  <h2>{item.title}</h2>
                  <button
                    onClick={() =>
                      setList(list.filter((i) => i.id !== item.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
