import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No file path provided!");
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Auto-detect file type (image, video, etc.)
      folder: "socialapp", // Cloudinary folder for organization
    });
    fs.unlinkSync(localFilePath); // Delete local file after upload
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // If error occurs, delete the local file
    console.log(`Error uploading file to Cloudinary: ${error}`);
    return null;
  }
};
