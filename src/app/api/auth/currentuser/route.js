import jwt from "jsonwebtoken";

// Get Current User
export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    
    if (!token) { 
      console.error("Token not found in cookies");
      return new Response(
        JSON.stringify({ error: "Not logged in" }),
        { status: 401 }
      );
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Decoded:", decoded);
  
    return new Response(
      JSON.stringify({ userId: decoded.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in token verification:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Invalid token" }),
      { status: 401 }
    );
  }
}
