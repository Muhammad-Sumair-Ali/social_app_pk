import connectDB from "@/db";
import { User } from "@/models/user.model";



export async function GET(){
  await connectDB()
    try {
        const res = await User.find()
        if (!res) {
            return new Response(
                JSON.stringify({
                     message: "all users not founded"
                     }),
                { status: 401 }
              );
        }

        
        return new Response(
            JSON.stringify({
                 message: "All Users founded",
                 users: res
                 }),
            { status: 200 }
          );
    } catch (error) {
        return new Response(
          JSON.stringify({ error: "Failed TO find  users " }),
          { status: 500 }
        );
      }
}