# jauhariandev portfolio

Ini adalah sebuah project portofolio yang untuk layanan jasa saya. Project ini akan diakses via web dan akan terdiri dari 5 halaman antara lain:
1. Beranda
2. Tentang Saya
3. Portofolio
4. Layanan
5. Blop
6. Kontak

Semua halaman dapat diedit secara dinamis via Dashboard admin yang bisa saya akses sendiri. 

Halaman portofolio bisa saya edit dengan menambahkan project yang sudah selesai. Halaman layanan bisa saya akses untuk menambahkan jasa, mengedit jasa yang sudah ada. Informasi jasa berupa:
1. Foto
2. Judul layanan
3. Harga

Ketika klik layanan yang dipilih akan muncul popup (modals) yang berisi:
1. Foto
2. Judul layanan
3. Harga
4. Deskripsi
5. Tombol checkout

Ketika pengunjung checkout, dia akan diarahkan ke halaman pembayaran yang berisi detail pembelian layanan, total harga (total harga ini adalah harga layanan + 3 digit khusus untuk saya memastikan orderan) dan panduan pembayaran.
Pembayaran menggunakan QRIS statis yang gambarnya bisa saya upload via dashboard admin. Pengunjung yang memesan tidak perlu login. Setelah melakukan pembayaran, ada halaman yang mengarahkan pengunjung menghubungi saya dengan detail pesanan via whatsapp.

Di dashboard admin selain mengedit tampilan halaman public. Terdapat juga laporan penjualan, baik secara mingguan maupun bulanan. Dan ada juga fitur untuk mencetak kwitansi pembayaran untuk pembayaran layanan yang sudah terveridikasi. Jadi saya bisa download kwitansi ini dan kirim ke pemesan layanan.

Untuk Blog, ini fiturnya kayak bogging biasa kayak di wordpress, jadi ada fitur tambah kategori, buat post baru dan edit post yang sudah ada. Ada fitur untuk menambahkan feature image. Kemudian untuk editor post nya menggunakan richtext editor, dan bisa menyisipkan foto.

Untuk fitur foto ini, ada menu media library di dashboard admin kayak wordpress. Media library ini menampilkan semua gambar yang sudah diupload. Jadi kalau mau sisipkan gambar dari menu manapun, ketika kita klik tombol tambah gambar, langsung muncul popup media library (ada foto yang sudah diupload) tapi kalo kita mau upload foto baru, bisa, karena ada tombol upload gambar,

This file is loaded automatically by Gemini CLI at the start of every session. Treat it as the source of truth for how to work in this repo.

## Build & Test

- **Install**: `pnpm dev`
- **Build**: `pnpm build`
- **Test**: `pnpm run test`

## Tech Stack

### TypeScript

- `strict: true` is enabled — do not weaken type safety
- Avoid `any`. Use `unknown` and narrow with type guards
- Prefer `interface` for object shapes, `type` for unions and primitives
- Use discriminated unions for state machines

### Node.js

- Use native ESM (`"type": "module"`) — no CommonJS in new code
- Use Node 20+ built-ins (`node:fs/promises`, `fetch`, `node:test`)
- Never block the event loop with synchronous I/O in request handlers
- Load secrets from environment variables only

### Tailwind CSS

- Tailwind utility classes — no custom CSS unless absolutely necessary
- Use design tokens from the Tailwind config — not hard-coded values
- Extract repeated class combinations into components, not `@apply`

### Jest

- Write tests in `__tests__/` folders or alongside source as `*.test.ts`
- Follow Arrange-Act-Assert structure
- Use `jest.fn()` for mocks; reset between tests with `beforeEach`

### Svelte

- Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- Prefer `$derived` over manual reactive statements
- Use SvelteKit for routing and server logic

## Naming Conventions

- Variables and functions use camelCase
- Classes, types, interfaces, and components use PascalCase
- Prefer descriptive names over short or cryptic ones

## Imports & Modules

- Use absolute imports (e.g. `@/components/Button`) over deep relative paths
- Group and sort imports: stdlib, external, internal, relative

## Error Handling

- Never silently catch errors — log, rethrow, or surface to the user
- Throw subclasses of `Error` with descriptive names, not strings
- Validate inputs at the boundary and throw early on bad data

## Testing

- Add tests alongside any new feature or bug fix
- Test behavior through the public API, not implementation details
- Always run the full test suite before declaring a task complete

## Comments & Docs

- Prefer clear names over comments — only comment when the code cannot speak for itself
- Do not add comments that just narrate what the code does
- Comments should explain intent, trade-offs, and non-obvious constraints

## Workflow Rules

- For non-trivial tasks, propose a short plan before editing files
- Keep changes focused — split large refactors into separate PRs
- Do not modify unrelated files or reformat code that was not requested
- Run the build and tests before reporting a task complete

## Architecture

Deployment akan menggunakan platform cloudflare. Backend akan dijalankan di cloudflare worker dan frontend menggunakan cloudflare page. Sehingga digunakan Hono dan Sveltekit. Database menggunakan neon, dan storage menggunakan cloudinary.
