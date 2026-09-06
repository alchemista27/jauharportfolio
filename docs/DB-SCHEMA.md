# Database Schema (DBS-SCHEMA)

## Jauhariandev Portfolio

**Versi:** alpha
**Terakhir diperbarui:** 2026-09-06
**Referensi:** [PRD.md](./PRD.md) · [TDD.md](./TDD.md)
**Database:** PostgreSQL (Neon)
**ORM:** Drizzle (`drizzle-orm/neon-http`)

---

## 1. Ringkasan

| Tabel | Deskripsi | Relasi |
|-------|-----------|--------|
| `pages` | Konten halaman publik (beranda, tentang, kontak) | — |
| `portfolios` | Daftar project portofolio | — |
| `services` | Katalog layanan jasa | `services → orders` |
| `orders` | Pesanan layanan dari pengunjung | `orders → services` |
| `categories` | Kategori blog | `categories → posts` |
| `posts` | Artikel blog | `posts → categories` |
| `media` | Metadata gambar di media library | — |
| `settings` | Key-value store konfigurasi admin | — |
| `user` | Data admin (Better Auth) | `user → session` |
| `session` | Session aktif (Better Auth) | `session → user` |
| `account` | Provider accounts (Better Auth) | — |
| `verification` | Token verifikasi (Better Auth) | — |

---

## 2. Enum Types

### `order_status`

```sql
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'verified', 'rejected');
```

| Value | Deskripsi |
|-------|-----------|
| `pending` | Baru dibuat, menunggu pembayaran |
| `paid` | Sudah bayar (diklaim pengunjung) |
| `verified` | Diverifikasi admin |
| `rejected` | Ditolak admin |

---

## 3. Tabel Aplikasi

### 3.1 `pages`

Menyimpan konten halaman publik yang bisa diedit admin. Halaman portofolio dan layanan punya tabel terpisah karena kontennya terstruktur.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `slug` | `text` | NOT NULL, UNIQUE | Identifier halaman (`beranda`, `tentang`, `kontak`) |
| `title` | `text` | NOT NULL | Judul halaman |
| `content` | `text` | NOT NULL | Konten halaman (JSON string atau HTML) |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | Waktu terakhir diubah |

**Indexes:** unique index pada `slug` (dari constraint UNIQUE).

```typescript
// packages/db/src/schema/pages.ts
export const pages = pgTable("pages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 3.2 `portfolios`

Daftar project yang sudah selesai, ditampilkan di halaman portofolio.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `title` | `text` | NOT NULL | Judul project |
| `description` | `text` | NOT NULL | Deskripsi project |
| `image_url` | `text` | NOT NULL | URL gambar di Cloudinary |
| `project_url` | `text` | — | Link ke project (opsional) |
| `sort_order` | `integer` | NOT NULL, DEFAULT 0 | Urutan tampil |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

```typescript
// packages/db/src/schema/portfolios.ts
export const portfolios = pgTable("portfolios", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  projectUrl: text("project_url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 3.3 `services`

Katalog layanan jasa yang tersedia untuk dipesan.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `title` | `text` | NOT NULL | Judul layanan |
| `description` | `text` | NOT NULL | Deskripsi layanan |
| `price` | `integer` | NOT NULL | Harga dalam Rupiah penuh (contoh: `500000`) |
| `image_url` | `text` | NOT NULL | URL foto layanan di Cloudinary |
| `is_active` | `boolean` | NOT NULL, DEFAULT true | Tampilkan di halaman publik |
| `sort_order` | `integer` | NOT NULL, DEFAULT 0 | Urutan tampil |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

**Catatan:** Harga disimpan sebagai `integer` (Rupiah penuh) karena Rupiah tidak memiliki sub-unit yang relevan untuk harga layanan.

```typescript
// packages/db/src/schema/services.ts
export const services = pgTable("services", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const servicesRelations = relations(services, ({ many }) => ({
  orders: many(orders),
}));
```

---

### 3.4 `orders`

Pesanan layanan dari pengunjung. Pengunjung tidak perlu login.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `service_id` | `integer` | NOT NULL, FK → `services.id` | Layanan yang dipesan |
| `unique_code` | `integer` | NOT NULL | Kode unik 3 digit (100-999) |
| `total_price` | `integer` | NOT NULL | Harga layanan + kode unik |
| `status` | `order_status` | NOT NULL, DEFAULT `'pending'` | Status pesanan |
| `buyer_name` | `text` | NOT NULL | Nama pembeli |
| `buyer_phone` | `text` | NOT NULL | Nomor WhatsApp pembeli |
| `buyer_email` | `text` | — | Email pembeli (opsional) |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `verified_at` | `timestamp` | — | Waktu verifikasi oleh admin |

**Indexes:**
| Nama | Kolom | Tujuan |
|------|-------|--------|
| `order_service_idx` | `service_id` | Lookup pesanan per layanan |
| `order_status_idx` | `status` | Filter pesanan per status |
| `order_created_at_idx` | `created_at` | Sorting dan laporan penjualan |

```typescript
// packages/db/src/schema/orders.ts
export const orderStatusEnum = pgEnum("order_status", [
  "pending", "paid", "verified", "rejected",
]);

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  serviceId: integer("service_id").notNull().references(() => services.id),
  uniqueCode: integer("unique_code").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  buyerName: text("buyer_name").notNull(),
  buyerPhone: text("buyer_phone").notNull(),
  buyerEmail: text("buyer_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  verifiedAt: timestamp("verified_at"),
}, (t) => ({
  serviceIdx: index("order_service_idx").on(t.serviceId),
  statusIdx: index("order_status_idx").on(t.status),
  createdAtIdx: index("order_created_at_idx").on(t.createdAt),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  service: one(services, {
    fields: [orders.serviceId],
    references: [services.id],
  }),
}));
```

---

### 3.5 `categories`

Kategori blog. Satu kategori bisa memiliki banyak post.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `name` | `text` | NOT NULL | Nama kategori |
| `slug` | `text` | NOT NULL, UNIQUE | Slug untuk URL |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

```typescript
// packages/db/src/schema/categories.ts
export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));
```

---

### 3.6 `posts`

Artikel blog. Konten disimpan sebagai HTML dari Tiptap richtext editor.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `title` | `text` | NOT NULL | Judul post |
| `slug` | `text` | NOT NULL, UNIQUE | Slug untuk URL |
| `content` | `text` | NOT NULL | Konten HTML dari Tiptap |
| `excerpt` | `text` | — | Ringkasan singkat (opsional) |
| `feature_image_url` | `text` | — | URL feature image di Cloudinary |
| `category_id` | `integer` | FK → `categories.id` | Kategori post (opsional) |
| `is_published` | `boolean` | NOT NULL, DEFAULT false | Status publish |
| `published_at` | `timestamp` | — | Waktu publish |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

**Indexes:**
| Nama | Kolom | Tujuan |
|------|-------|--------|
| `post_category_idx` | `category_id` | Lookup post per kategori |
| `post_published_idx` | `is_published` | Filter post published/draft |
| `post_slug_idx` | `slug` | Lookup post by slug |

**Catatan:** Gambar yang disisipkan dalam konten menggunakan URL Cloudinary yang dipilih via media library, disimpan sebagai `<img>` tag di dalam HTML.

```typescript
// packages/db/src/schema/posts.ts
export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featureImageUrl: text("feature_image_url"),
  categoryId: integer("category_id").references(() => categories.id),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  categoryIdx: index("post_category_idx").on(t.categoryId),
  publishedIdx: index("post_published_idx").on(t.isPublished),
  slugIdx: index("post_slug_idx").on(t.slug),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));
```

---

### 3.7 `media`

Metadata gambar yang diupload ke Cloudinary via media library. File disimpan di Cloudinary, tabel ini hanya menyimpan referensi.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `integer` | PK, generated always as identity | — |
| `filename` | `text` | NOT NULL | Nama file asli |
| `url` | `text` | NOT NULL | URL publik di Cloudinary |
| `public_id` | `text` | NOT NULL | Cloudinary public_id (untuk delete) |
| `mime_type` | `text` | NOT NULL | MIME type (contoh: `image/webp`) |
| `size` | `integer` | NOT NULL | Ukuran file dalam bytes |
| `width` | `integer` | — | Lebar gambar dalam pixel |
| `height` | `integer` | — | Tinggi gambar dalam pixel |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

```typescript
// packages/db/src/schema/media.ts
export const media = pgTable("media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

---

### 3.8 `settings`

Key-value store untuk konfigurasi yang bisa diubah admin via dashboard.

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `key` | `text` | PK | Identifier setting |
| `value` | `text` | NOT NULL | Nilai setting |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | Waktu terakhir diubah |

**Data awal (seed):**

| Key | Contoh Value | Deskripsi |
|-----|-------------|-----------|
| `qris_image_url` | `https://res.cloudinary.com/...` | Gambar QRIS statis |
| `whatsapp_number` | `628xxxxxxxxxx` | Nomor WhatsApp admin |
| `site_name` | `Jauhariandev` | Nama situs |

```typescript
// packages/db/src/schema/settings.ts
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

## 4. Tabel Better Auth

Tabel ini di-generate otomatis oleh Better Auth via Drizzle adapter. Jalankan `npx @better-auth/cli generate` untuk membuat migration-nya.

### 4.1 `user`

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `text` | PK | UUID user |
| `name` | `text` | NOT NULL | Nama admin |
| `email` | `text` | NOT NULL, UNIQUE | Email admin |
| `email_verified` | `boolean` | NOT NULL, DEFAULT false | Status verifikasi email |
| `image` | `text` | — | URL avatar (opsional) |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

### 4.2 `session`

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `text` | PK | Session ID |
| `user_id` | `text` | NOT NULL, FK → `user.id` | Pemilik session |
| `token` | `text` | NOT NULL, UNIQUE | Session token |
| `expires_at` | `timestamp` | NOT NULL | Waktu kadaluarsa |
| `ip_address` | `text` | — | IP address saat login |
| `user_agent` | `text` | — | User agent browser |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

### 4.3 `account`

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `text` | PK | Account ID |
| `user_id` | `text` | NOT NULL, FK → `user.id` | Pemilik account |
| `account_id` | `text` | NOT NULL | Provider account ID |
| `provider_id` | `text` | NOT NULL | Provider (`credential`) |
| `access_token` | `text` | — | — |
| `refresh_token` | `text` | — | — |
| `expires_at` | `timestamp` | — | — |
| `password` | `text` | — | Hashed password (untuk email/password) |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

### 4.4 `verification`

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | `text` | PK | Verification ID |
| `identifier` | `text` | NOT NULL | Email atau identifier lain |
| `value` | `text` | NOT NULL | Token verifikasi |
| `expires_at` | `timestamp` | NOT NULL | Waktu kadaluarsa |
| `created_at` | `timestamp` | NOT NULL, DEFAULT now() | — |
| `updated_at` | `timestamp` | NOT NULL, DEFAULT now() | — |

---

## 5. ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    pages {
        int id PK
        text slug UK
        text title
        text content
        timestamp updated_at
    }

    portfolios {
        int id PK
        text title
        text description
        text image_url
        text project_url
        int sort_order
        timestamp created_at
        timestamp updated_at
    }

    services {
        int id PK
        text title
        text description
        int price
        text image_url
        boolean is_active
        int sort_order
        timestamp created_at
        timestamp updated_at
    }

    orders {
        int id PK
        int service_id FK
        int unique_code
        int total_price
        enum status
        text buyer_name
        text buyer_phone
        text buyer_email
        timestamp created_at
        timestamp updated_at
        timestamp verified_at
    }

    categories {
        int id PK
        text name
        text slug UK
        timestamp created_at
    }

    posts {
        int id PK
        text title
        text slug UK
        text content
        text excerpt
        text feature_image_url
        int category_id FK
        boolean is_published
        timestamp published_at
        timestamp created_at
        timestamp updated_at
    }

    media {
        int id PK
        text filename
        text url
        text public_id
        text mime_type
        int size
        int width
        int height
        timestamp created_at
    }

    settings {
        text key PK
        text value
        timestamp updated_at
    }

    user {
        text id PK
        text name
        text email UK
        boolean email_verified
        timestamp created_at
        timestamp updated_at
    }

    session {
        text id PK
        text user_id FK
        text token UK
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }

    account {
        text id PK
        text user_id FK
        text account_id
        text provider_id
        text password
        timestamp created_at
        timestamp updated_at
    }

    verification {
        text id PK
        text identifier
        text value
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }

    services ||--o{ orders : "dipesan menjadi"
    categories ||--o{ posts : "memiliki"
    user ||--o{ session : "memiliki"
    user ||--o{ account : "memiliki"
```

---

## 6. Ringkasan Index

| Tabel | Index | Kolom | Tipe |
|-------|-------|-------|------|
| `pages` | (unique constraint) | `slug` | UNIQUE |
| `orders` | `order_service_idx` | `service_id` | B-tree |
| `orders` | `order_status_idx` | `status` | B-tree |
| `orders` | `order_created_at_idx` | `created_at` | B-tree |
| `categories` | (unique constraint) | `slug` | UNIQUE |
| `posts` | `post_category_idx` | `category_id` | B-tree |
| `posts` | `post_published_idx` | `is_published` | B-tree |
| `posts` | `post_slug_idx` | `slug` | B-tree |
| `posts` | (unique constraint) | `slug` | UNIQUE |

---

## 7. Koneksi Database

```typescript
// packages/db/src/index.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export function createDb(databaseUrl: string) {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

export type Database = ReturnType<typeof createDb>;
```

**Driver:** `drizzle-orm/neon-http` — dioptimasi untuk edge runtime (Cloudflare Workers), menggunakan non-interactive transactions via HTTP.

**Connection string:** disimpan di environment variable `DATABASE_URL` (format: `postgresql://user:pass@host/db?sslmode=require`).

---

## 8. Migrasi

```bash
cd packages/db
npx drizzle-kit generate   # Generate migration files dari schema
npx drizzle-kit migrate    # Apply migration ke Neon
npx drizzle-kit studio     # Buka Drizzle Studio untuk inspeksi
```

Better Auth tables:
```bash
npx @better-auth/cli generate  # Generate migration untuk tabel auth
```

---

## 9. File Schema

```
packages/db/src/schema/
├── index.ts          # Re-export semua schema
├── pages.ts          # Tabel pages
├── portfolios.ts     # Tabel portfolios
├── services.ts       # Tabel services
├── orders.ts         # Tabel orders + enum order_status
├── categories.ts     # Tabel categories (blog)
├── posts.ts          # Tabel posts (blog)
├── media.ts          # Tabel media (media library)
└── settings.ts       # Tabel settings
```
