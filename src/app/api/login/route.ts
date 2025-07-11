import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 新增 group
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user && user.password === password) {
      return NextResponse.json({ message: "login seccess" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.log("error");
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
