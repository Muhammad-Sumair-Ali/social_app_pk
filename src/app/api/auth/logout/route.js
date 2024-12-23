import connectDB from "@/db";
import { NextResponse } from "next/server";

export async function POST() {
  await connectDB()

  const response = NextResponse.json({ message: "Logout successfull" });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, 
  });

  return response;
}
