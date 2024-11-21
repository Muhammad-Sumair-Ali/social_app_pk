import { connectToDB } from "../../../utils/db";
import { Post } from "../../../models/Post";

export async function POST(request) {
  const { title, description, imageUrl } = await request.json();

  if (!title || !description) {
    return new Response(
      JSON.stringify({ error: "Title and description are required" }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

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
