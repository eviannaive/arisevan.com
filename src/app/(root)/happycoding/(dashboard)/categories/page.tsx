"use client";
import Image from "next/image";
import useSWR from "swr";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";

export default function CategoriesPage() {
  const { data: data_category, isLoading } = useSWR<Category[]>(
    "/api/categories",
    () => {
      return fetch("/api/categories").then((res) => res.json());
    },
  );
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Categories</h1>
      <div className="grid grid-cols-1 gap-5 mt-10">
        {data_category?.map((category) => (
          <div key={category.id} className="group">
            <div className="flex items-center gap-3 bg-white/70 shadow-md p-4">
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
              ></Image>
              <p className="text-2xl font-semibold text-slate-500">
                {category.name}
              </p>
              <button className="cursor-pointer">
                <PencilSquareIcon className="size-5" color="gray" />
              </button>
              <Button
                isIconOnly
                className="ml-auto p-2 trext-white opacity-0  group-hover:opacity-100"
                color="danger"
                variant="bordered"
              >
                <TrashIcon className="size-10" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
