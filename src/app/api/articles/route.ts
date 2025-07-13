import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import generateSlug from "@/lib/generateSlug";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { uploadFile } from "@/lib/uploadFile";
import { parseForm } from "@/lib/parseForm";
import { IncomingMessage } from "http";

// const s3Client = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
//   },
// });

// async function uploadFileToS3(
//   fileBuffer: Buffer,
//   fileName: string,
//   contentType: string,
// ) {
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: fileName,
//     Body: fileBuffer,
//     ContentType: contentType,
//   };

//   const command = new PutObjectCommand(params);
//   await s3Client.send(command);
//   return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
// }

export async function POST(request: Request) {
  const nodeReq = request as unknown as IncomingMessage;

  try {
    // 解析表單欄位與檔案
    const { fields, files } = await parseForm(nodeReq);

    const {
      title,
      content,
      excerpt,
      published,
      coverImage: base64CoverImage,
      categoryId,
      tags,
      slug: incomingSlug,
    } = fields;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

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
