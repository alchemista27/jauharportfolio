import { createDb } from "@repo/db";
import { createAuth } from "./lib/auth";

async function main() {
  const env = {
    DATABASE_URL: process.env.DATABASE_URL!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
    CLOUDINARY_CLOUD_NAME: "",
    CLOUDINARY_API_KEY: "",
    CLOUDINARY_API_SECRET: "",
  };

  const auth = createAuth(env);
  
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@jauhariandev.com",
        password: "adminpassword123",
        name: "Admin"
      }
    });
    console.log("Admin user created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

main();
