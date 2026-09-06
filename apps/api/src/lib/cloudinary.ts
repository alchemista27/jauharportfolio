import { v2 as cloudinary } from "cloudinary";
import type { Env } from "../index";

export function configureCloudinary(env: Env) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

export async function uploadImage(
  env: Env,
  fileBuffer: ArrayBuffer,
  mimeType: string,
  folder: string
): Promise<{ secure_url: string; public_id: string; width: number; height: number }> {
  const cld = configureCloudinary(env);

  const base64String = Buffer.from(fileBuffer).toString("base64");
  const dataUri = `data:${mimeType};base64,${base64String}`;

  const result = await cld.uploader.upload(dataUri, {
    folder: `portofolio/${folder}`,
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(env: Env, publicId: string): Promise<void> {
  const cld = configureCloudinary(env);
  await cld.uploader.destroy(publicId);
}
