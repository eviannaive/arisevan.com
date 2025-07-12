import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import generateSlug from "@/lib/generateSlug";
import { uploadFile } from "@/lib/uploadFile";
import { parseForm } from "@/lib/parseForm";
import { IncomingMessage } from "http";

// 禁用 Next.js 的 body-parser，以便我們可以手動處理 FormData
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  // 將 Request 轉成 Node 的 IncomingMessage 方便解析 multipart/form-data
  const nodeReq = request as unknown as IncomingMessage;

  try {
    // 解析表單欄位與檔案
    const { fields, files } = await parseForm(nodeReq);

    // 解構欄位
    const {
      title,
      content,
      excerpt,
      published,
      categoryId,
      tags,
      slug: incomingSlug,
      coverImage: base64CoverImage,
    } = fields;

    // 驗證必填欄位
    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // 處理封面圖片（base64）
    let coverImageUrl: string | null = null;
    if (base64CoverImage) {
      const matches = String(base64CoverImage).match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const contentType = matches[1];
        const base64Data = matches[2];
        const fileBuffer = Buffer.from(base64Data, "base64");
        const fileName = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}`;
        coverImageUrl = await uploadFile(fileBuffer, fileName, contentType);
      } else {
        return NextResponse.json(
          { message: "Invalid cover image format" },
          { status: 400 },
        );
      }
    }

    // 處理 title 可能為陣列或字串
    const safeTitle = Array.isArray(title) ? title.join("") : title || "";

    // slug 沒傳就用 generateSlug
    const slug = incomingSlug || generateSlug(safeTitle);

    // tags 可能是字串或字串陣列，統一成陣列
    const tagNames = Array.isArray(tags) ? tags : [tags];
    // 先查詢這些 tag 的紀錄
    const tagRecords = await prisma.tag.findMany({
      where: {
        name: { in: tagNames },
      },
    });

    // 新增文章，同時連結 category 和 tags
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        published: published || false,
        coverImage: coverImageUrl,
        category: {
          connect: { id: categoryId },
        },
        tags: {
          create: tagRecords.map((tag: { id: string }) => ({
            tag: {
              connect: { id: tag.id },
            },
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
