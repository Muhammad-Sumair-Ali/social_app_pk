import connectDB from "@/db";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectDB()

  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Please provide email and password" }),
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User Not Found" }),
        { status: 401 }
      );
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error logging in" }),
      { status: 500 }
    );
  }
}
