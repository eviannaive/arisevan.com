import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 取得所有分類
export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(categories);
}
