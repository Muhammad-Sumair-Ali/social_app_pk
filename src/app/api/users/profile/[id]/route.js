import { NextResponse } from "next/server";
import { User } from "@/src/utils/db";

export async function GET(request, { params }) {
  const { id } = params;

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
