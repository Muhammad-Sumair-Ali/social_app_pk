import { NextResponse } from "next/server";
import { User } from "@/models/user.model";

export async function GET({ params }) {
  const { id } = params;

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
