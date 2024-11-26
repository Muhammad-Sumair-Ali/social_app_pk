import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import connectDB from "@/db";

export async function GET({ params }) {
  await connectDB()

  const { id } = params;

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
