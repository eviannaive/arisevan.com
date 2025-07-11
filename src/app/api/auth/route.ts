import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = Number(process.env.JWT_EXPIRES_IN || 86400);

async function updateUserPassword(username: string, plainPassword: string) {
  const hashedPassword = await hash(plainPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { username },
    data: { password: hashedPassword },
  });

  console.log("Updated user:", updatedUser);
}

// 新增 group
export async function POST(req: Request) {
  try {
    if (!JWT_SECRET) {
      throw new Error("Missing JWT_SECRET env variable");
    }

    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (user && isPasswordValid) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES },
      );

      const response = NextResponse.json({ message: "login success" });

      response.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", //正式環境只允許在 HTTPS 傳輸 cookie
        sameSite: "lax",
        maxAge: JWT_EXPIRES,
        path: "/happycoding",
      });

      return response;
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

export async function PUT(req: Request) {
  try {
    const { username, oldPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    const isPasswordValid = await compare(oldPassword, user.password);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user && isPasswordValid) {
      await updateUserPassword(user.name, newPassword);

      return NextResponse.json(
        { message: "update password success!" },
        { status: 200 },
      );
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
