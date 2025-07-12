import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import generateSlug from "@/lib/generateSlug";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      published,
      coverImage,
      categoryId,
      tags,
      slug: incomingSlug,
    } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const slug = incomingSlug || generateSlug(title);

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        published: published || false,
        coverImage,
        category: {
          connect: { id: categoryId },
        },
        tags: {
          create: tags.map((tagId: string) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
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
