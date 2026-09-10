import { createDb } from "@repo/db";
import { createAuth } from "./lib/auth";
import { pages } from "@repo/db/src/schema";
import { sql } from "drizzle-orm";

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
  const db = createDb(env.DATABASE_URL);
  
  // Seed admin user
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@jauhariandev.com",
        password: "adminpassword123",
        name: "Admin"
      }
    });
    console.log("Admin user created:", user);
  } catch (error: any) {
    if (error?.body?.code === 'USER_ALREADY_EXISTS') {
      console.log("Admin user already exists");
    } else {
      console.error("Error creating user:", error);
    }
  }

  // Seed default pages
  const defaultPages = [
    {
      slug: "beranda",
      title: "Jauhariandev",
      content: "<p>Dengan pengalaman bertahun-tahun di industri desain dan pengembangan website, saya bangga dapat menciptakan desain yang unik, kreatif, dan berkualitas, dibangun dengan standar kode modern.</p>"
    },
    {
      slug: "tentang",
      title: "Membantu bisnis tampil menonjol di era digital.",
      content: "<p>Sebagai seorang desainer dan pengembang independen, saya memadukan estetika minimalis dengan teknologi web terkini untuk menghasilkan produk digital yang tidak hanya terlihat indah, tetapi juga berkinerja luar biasa.</p><p>Setiap baris kode dan setiap piksel desain disusun dengan tujuan yang jelas, memastikan pengalaman pengguna yang mulus dari awal hingga akhir.</p>"
    },
    {
      slug: "kontak",
      title: "Mari bekerja sama.",
      content: "<p>Jika Anda memiliki proyek baru, butuh bantuan teknologi, atau sekadar ingin menyapa, jangan ragu untuk menghubungi saya. Saya selalu terbuka untuk mendiskusikan ide-ide kreatif dan peluang kolaborasi baru.</p>"
    }
  ];

  for (const page of defaultPages) {
    await db.insert(pages).values(page)
      .onConflictDoUpdate({
        target: pages.slug,
        set: { title: page.title }
      });
    console.log(`Seeded page: ${page.slug}`);
  }

  console.log("Seeding complete!");
}

main();
