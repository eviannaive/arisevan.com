import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import generateSlug from "@/lib/generateSlug";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

async function uploadFileToS3(fileBuffer: Buffer, fileName: string, contentType: string) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const article = await prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      published,
      coverImage: base64CoverImage,
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

    let coverImageUrl = null;
    if (base64CoverImage) {
      const matches = base64CoverImage.match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const contentType = matches[1];
        const base64Data = matches[2];
        const fileBuffer = Buffer.from(base64Data, 'base64');
        const fileName = `covers/${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        coverImageUrl = await uploadFileToS3(fileBuffer, fileName, contentType);
      } else {
        return NextResponse.json({ message: "Invalid cover image format" }, { status: 400 });
      }
    }

    const slug = incomingSlug || generateSlug(title);

    const updatedPost = await prisma.post.update({
      where: { id },
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
          set: [], // Clear existing tags
          create: await Promise.all(tags.map(async (tagName: string) => {
            const tag = await prisma.tag.upsert({
              where: { name: tagName },
              update: {},
              create: { name: tagName },
            });
            return {
              tag: { connect: { id: tag.id } },
            };
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

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
