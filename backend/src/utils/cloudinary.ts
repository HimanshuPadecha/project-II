import { v2 as cloudnary } from "cloudinary";
import fs from "fs";
import logger from "./winston.logger";

cloudnary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  imageUrl: string
): Promise<uploadToCloudinaryResponse | undefined> => {
  try {
    const response = await cloudnary.uploader.upload(imageUrl, {
      access_mode: "public",
      allowed_formats: ["jpg", "png"],
      resource_type: "image",
    });

    return {
      uploadedImgUrl: response.secure_url,
    };
  } catch (error) {
    logger.error("Error while uploading to cloudinary :", error);
  } finally {
    fs.unlinkSync(imageUrl);
  }
};

export interface uploadToCloudinaryResponse {
  uploadedImgUrl: string;
}
