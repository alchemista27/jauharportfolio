<script lang="ts">
  import { page } from "$app/stores";
  let { children } = $props();
  
  let isHome = $derived($page.url.pathname === "/");
</script>

<!-- NAVBAR -->
<header class="{isHome ? 'absolute top-0 w-full z-50 py-6 border-b border-white/10' : 'w-full z-50 py-6 border-b border-border bg-surface'}">
  <div class="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
    <!-- Logo -->
    <div class="w-1/4">
      <a href="/" class="font-heading font-bold text-2xl tracking-tight {isHome ? 'text-surface' : 'text-primary'}">Jauhariandev<span class="text-tertiary">.</span></a>
    </div>
    <!-- Menu -->
    <nav class="hidden lg:flex w-2/4 justify-center space-x-10">
      <a href="/" class="{isHome ? 'text-surface' : 'text-primary opacity-70'} font-semibold text-sm hover:text-tertiary transition-colors {$page.url.pathname === '/' && !isHome ? 'text-tertiary opacity-100' : ''}">Beranda</a>
      <a href="/tentang" class="{isHome ? 'text-surface' : 'text-primary opacity-70'} font-semibold text-sm hover:text-tertiary transition-colors {$page.url.pathname === '/tentang' ? 'text-tertiary opacity-100' : ''}">Tentang Saya</a>
      <a href="/portofolio" class="{isHome ? 'text-surface' : 'text-primary opacity-70'} font-semibold text-sm hover:text-tertiary transition-colors {$page.url.pathname === '/portofolio' ? 'text-tertiary opacity-100' : ''}">Portofolio</a>
      <a href="/layanan" class="{isHome ? 'text-surface' : 'text-primary opacity-70'} font-semibold text-sm hover:text-tertiary transition-colors {$page.url.pathname === '/layanan' ? 'text-tertiary opacity-100' : ''}">Layanan</a>
      <a href="/blog" class="{isHome ? 'text-surface' : 'text-primary opacity-70'} font-semibold text-sm hover:text-tertiary transition-colors {$page.url.pathname === '/blog' ? 'text-tertiary opacity-100' : ''}">Blog</a>
      <a href="/kontak" class="{isHome ? 'text-surface' : 'text-primary opacity-70'} font-semibold text-sm hover:text-tertiary transition-colors {$page.url.pathname === '/kontak' ? 'text-tertiary opacity-100' : ''}">Kontak</a>
    </nav>
    <!-- Sosmed -->
    <div class="hidden lg:flex w-1/4 justify-end items-center space-x-6 {isHome ? 'text-surface' : 'text-primary'}">
      <a href="#" class="hover:text-tertiary transition-colors" aria-label="Instagram">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/></svg>
      </a>
    </div>
  </div>
</header>

<div class="flex flex-col min-h-screen">
  {@render children()}
</div>

<!-- FOOTER -->
<footer class="bg-primary pt-24 pb-12 px-6">
  <div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-white/10 pb-16">
    <div>
      <h3 class="font-heading font-bold text-2xl tracking-tight text-surface mb-6">Jauhariandev<span class="text-tertiary">.</span></h3>
      <p class="text-surface opacity-70 leading-relaxed max-w-sm">
        Layanan kreatif spesialis di bidang web development dan desain UX.
      </p>
    </div>
    <div>
      <h4 class="font-heading text-lg font-bold text-surface mb-6">Kontak</h4>
      <ul class="text-surface opacity-70 space-y-3">
        <li>Jl. Digital Raya No.10, Jakarta</li>
        <li>hello@jauhariandev.com</li>
        <li>+62 812 3456 7890</li>
      </ul>
    </div>
    <div>
      <h4 class="font-heading text-lg font-bold text-surface mb-6">Tautan</h4>
      <ul class="text-surface opacity-70 space-y-3">
        <li><a href="/" class="hover:text-tertiary transition-colors">Beranda</a></li>
        <li><a href="/portofolio" class="hover:text-tertiary transition-colors">Portofolio</a></li>
        <li><a href="/layanan" class="hover:text-tertiary transition-colors">Layanan</a></li>
        <li><a href="/blog" class="hover:text-tertiary transition-colors">Blog</a></li>
      </ul>
    </div>
  </div>
  <div class="text-center text-surface opacity-50 text-sm">
    &copy; 2026 Jauhariandev. All rights reserved.
  </div>
</footer>
