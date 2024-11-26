import jwt from "jsonwebtoken";
import { User } from "@/models/user.model"; 
import connectDB from "@/db";

export async function GET(request) {
  connectDB()

  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Not logged in" }),
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    if (!decoded || !decoded.id) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ user: user, token:token || "" } ),
      { status: 200 }
    );
  } catch (error) {
    
    return new Response(
      JSON.stringify({ error: error.message || "Invalid token" }),
      { status: 401 }
    );
  }
}
