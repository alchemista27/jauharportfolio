<script lang="ts">
  let { children } = $props();
</script>

<header class="w-full py-6 border-b border-border bg-surface">
  <div class="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
    <div class="w-1/4">
      <a href="/" class="font-heading font-bold text-2xl text-primary">Jauhariandev<span class="text-tertiary">.</span></a>
    </div>
    <nav class="hidden lg:flex space-x-10">
      <a href="/" class="text-primary opacity-70 font-semibold text-sm">Beranda</a>
      <a href="/tentang" class="text-primary opacity-70 font-semibold text-sm">Tentang</a>
    </nav>
  </div>
</header>

<main class="w-full flex-grow">
  {@render children()}
</main>

<footer class="bg-primary py-12 px-6 mt-auto">
  <div class="text-center text-surface opacity-50 text-sm">
    &copy; 2026 Jauhariandev. All rights reserved.
  </div>
</footer>
