import { connectDB } from "@/db/index";
import { Post } from "@/models/post.model";

export async function POST(request) {
  await connectDB();
  const { title, description, imageUrl } = await request.json();

  if (!title || !description) {
    return new Response(
      JSON.stringify({ error: "Title and description are required" }),
      { status: 400 }
    );
  }

  try {

    const newPost = new Post({
      title,
      description,
      imageUrl,
      createdAt: new Date(),
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create post" }),
      { status: 500 }
    );
  }
}
