import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import generateSlug from "@/lib/generateSlug";
import { uploadFile } from "@/lib/uploadFile";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string | null;
    const slug = (formData.get("slug") as string) || generateSlug(title);
    const published = formData.get("published") === "true";
    const categoryId = formData.get("categoryId") as string;
    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];

    const file = formData.get("coverImage") as File | null;
    let coverImageUrl: string | null = null;

    if (typeof title !== "string") {
      return NextResponse.json({ message: "Missing title" }, { status: 400 });
    }
    if (typeof content !== "string") {
      return NextResponse.json({ message: "Missing content" }, { status: 400 });
    }
    if (typeof categoryId !== "string") {
      return NextResponse.json(
        { message: "Missing categoryId" },
        { status: 400 },
      );
    }

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      coverImageUrl = await uploadFile(buffer, file.name, "covers");
    }

    // 找到已存在的 tag
    const tagRecords = await prisma.tag.findMany({
      where: { name: { in: tags } },
    });

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        excerpt: excerpt || "",
        slug,
        published,
        coverImage: coverImageUrl,
        category: {
          connect: { id: categoryId },
        },
        tags: {
          create: tagRecords.map((tag: Tag) => ({
            tag: { connect: { id: tag.id } },
          })),
        },
      },
      include: {
        category: true,
        tags: {
          include: { tag: true },
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
