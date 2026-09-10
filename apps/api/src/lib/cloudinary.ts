import type { Env } from "../index";

async function generateSignature(params: Record<string, string>, apiSecret: string): Promise<string> {
  const keys = Object.keys(params).sort();
  let signatureString = "";
  for (const key of keys) {
    if (signatureString !== "") signatureString += "&";
    signatureString += `${key}=${params[key]}`;
  }
  signatureString += apiSecret;

  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hash = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function uploadImage(
  env: Env,
  fileBuffer: ArrayBuffer,
  mimeType: string,
  folder: string
): Promise<{ secure_url: string; public_id: string; width: number; height: number }> {
  const timestamp = Math.round(Date.now() / 1000).toString();
  const folderPath = `portofolio/${folder}`;

  const signatureParams = {
    folder: folderPath,
    timestamp,
  };
  
  const signature = await generateSignature(signatureParams, env.CLOUDINARY_API_SECRET);

  const base64String = Buffer.from(fileBuffer).toString("base64");
  const dataUri = `data:${mimeType};base64,${base64String}`;

  const formData = new FormData();
  formData.append("file", dataUri);
  formData.append("folder", folderPath);
  formData.append("api_key", env.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const result = await res.json() as any;
  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(env: Env, publicId: string): Promise<void> {
  const timestamp = Math.round(Date.now() / 1000).toString();

  const signatureParams = {
    public_id: publicId,
    timestamp,
  };
  
  const signature = await generateSignature(signatureParams, env.CLOUDINARY_API_SECRET);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", env.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/destroy`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Cloudinary delete failed: ${errorText}`);
  }
}
