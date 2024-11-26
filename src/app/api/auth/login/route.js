
import connectDB from "@/db";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
   connectDB(); 
  try {
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Please provide email and password" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "User Not Found" }),
        { status: 404 }
      );
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
      expiresIn: "1d",
    });

    const loggedInUser = await User.findById(user._id).select("-password")

    const response = NextResponse.json({
      message: "Login successful",
      user: loggedInUser,
      token,
    }, { status: 200 });

    // Set token in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, 
    });
    

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error logging in, please try again later." }),
      { status: 500 }
    );
  }
}
