import { NextResponse } from "next/server";
import { User } from "@/models/user.model"; // Import your User model
import { uploadOnCloudinary } from "@/utils/cloudinary"; // Cloudinary upload utility
import connectDB from "@/db";

export async function POST(req) {
  await connectDB()

  try {
    const formData = await req.formData(); // Retrieve form data
    const userId = formData.get("userId"); // Get userId from the form data
    const file = formData.get("file"); // Get uploaded file

    if (!file) {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    // Save file locally for Cloudinary upload
    const tempFilePath = `/tmp/${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    require("fs").writeFileSync(tempFilePath, fileBuffer);

    // Upload file to Cloudinary
    const uploadResponse = await uploadOnCloudinary(tempFilePath);

    if (!uploadResponse) {
      return NextResponse.json(
        { message: "Failed to upload image to Cloudinary." },
        { status: 500 }
      );
    }

    // Update user profile with uploaded image URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile picture updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updating profile picture:", error);
    return NextResponse.json(
      { message: "Error updating profile picture.", error: error.message },
      { status: 500 }
    );
  }
}
