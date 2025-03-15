import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

// 新增 group
export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();
    const user = await User.findOne({ username });

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
