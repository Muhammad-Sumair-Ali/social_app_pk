import { User } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function PUT(request) {
  const { id, name, bio } = await request.json();

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, bio },
    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: updatedUser });
}
