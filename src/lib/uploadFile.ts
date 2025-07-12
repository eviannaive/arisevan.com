import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

/**
 * 將文件上傳到 S3
 * @param file 文件數據 (Blob 或 Buffer)
 * @param fileName 文件名 (包含擴展名)
 * @param folder 可選的 S3 文件夾路徑
 * @returns 上傳後的文件 URL
 */
export async function uploadFile(
  file: Blob | Buffer,
  fileName: string,
  folder?: string,
): Promise<string> {
  const key = folder ? `${folder}/${fileName}` : fileName;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: (file as Blob).type || "application/octet-stream", // 嘗試從 Blob 獲取類型，否則使用通用類型
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
    return fileUrl;
  } catch (error) {
    console.error("上傳到 S3 失敗:", error);
    throw new Error("無法上傳文件到 S3");
  }
}
