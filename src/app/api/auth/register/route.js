import connectDB from "@/db";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function POST(request) {
   connectDB()
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ error: "Please fill all the fields" }),
      { status: 400 }
    );
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

   
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return new Response(
      JSON.stringify({ message: "User registered successfully", token }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error registering user" }),
      { status: 500 }
    );
  }
}
