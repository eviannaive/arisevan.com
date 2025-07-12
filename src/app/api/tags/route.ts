import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 取得所有標籤
export async function GET() {
  const categories = await prisma.tag.findMany({
    orderBy: { name: "desc" },
  });
  return NextResponse.json(categories);
}

// 新增標籤
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    // 驗證 name 是否有值
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Invalid tag name" },
        { status: 400 },
      );
    }

    // 檢查名稱是否重複
    const existed = await prisma.tag.findUnique({ where: { name } });
    if (existed) {
      return NextResponse.json(
        { message: "Tag already exists" },
        { status: 409 },
      );
    }

    // 建立 tag（createdAt 會自動生成）
    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Create tag error:", error);
    return NextResponse.json(
      { message: "Create tag failed", error },
      { status: 500 },
    );
  }
}
