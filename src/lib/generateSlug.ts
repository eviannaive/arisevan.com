export default function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // 把空白和非字母數字換成連字號
    .replace(/^-+|-+$/g, ""); // 移除開頭或結尾多餘的連字號
}
