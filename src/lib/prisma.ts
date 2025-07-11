import { PrismaClient } from "@prisma/client";

// 宣告一個 global 變數，讓 TS 編譯器知道我們要放 prisma 上去
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 如果 global 上已經有 prisma 實例，使用那個；否則建立新的
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 在開發模式下，把 prisma 存進 global，避免 hot reload 時重建
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
