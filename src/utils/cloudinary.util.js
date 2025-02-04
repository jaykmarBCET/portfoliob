import { v2 as cloudinary } from "cloudinary";
import env from 'dotenv';

env.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (imageData) => {
  try {
    
    const response = await cloudinary.uploader.upload(imageData, {
      resource_type: "auto",  
    });
    return response
  } catch (error) {
    console.log("Error while uploading image:", error);
    throw new Error("Something went wrong while uploading image");
  }
};

export { uploadImage };
