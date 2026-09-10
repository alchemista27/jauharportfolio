<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Jauhariandev - Kontak</title>
</svelte:head>

<main class="w-full">
  <!-- PAGE TITLE -->
  <section class="py-24 px-6 max-w-[1400px] mx-auto text-center border-b border-border">
    <h1 class="font-heading text-5xl md:text-7xl text-primary font-bold mb-6 tracking-tight">Kontak.</h1>
    <div class="text-sm font-semibold uppercase tracking-widest text-primary opacity-70">
      <a href="/" class="hover:text-tertiary">Beranda</a> <span class="mx-2">•</span> <span>Kontak</span>
    </div>
  </section>

  <!-- CONTENT (Dynamic from DB) -->
  <section class="py-24 px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
    <div>
      <h2 class="text-4xl font-heading font-bold text-primary mb-6">{data.page?.title}</h2>
      <div class="prose prose-lg prose-p:text-primary prose-p:opacity-80 prose-p:leading-relaxed mb-12">
        {@html data.page?.content}
      </div>
      
      <div class="space-y-6">
        <div>
          <span class="text-tertiary uppercase tracking-widest text-sm font-semibold block mb-1">Email</span>
          <a href="mailto:hello@jauhariandev.com" class="text-2xl font-heading font-bold text-primary hover:text-tertiary transition-colors">hello@jauhariandev.com</a>
        </div>
        <div>
          <span class="text-tertiary uppercase tracking-widest text-sm font-semibold block mb-1">Telepon</span>
          <a href="tel:+6281234567890" class="text-2xl font-heading font-bold text-primary hover:text-tertiary transition-colors">+62 812 3456 7890</a>
        </div>
      </div>
    </div>
    
    <!-- CONTACT FORM -->
    <div class="bg-white border border-border p-8 shadow-sm">
      <h3 class="font-heading text-2xl font-bold text-primary mb-6">Kirim Pesan</h3>
      <form class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-primary mb-2">Nama Lengkap</label>
          <input type="text" class="w-full border border-border bg-neutral px-4 py-3 focus:outline-none focus:border-tertiary transition-colors" placeholder="John Doe">
        </div>
        <div>
          <label class="block text-sm font-semibold text-primary mb-2">Email</label>
          <input type="email" class="w-full border border-border bg-neutral px-4 py-3 focus:outline-none focus:border-tertiary transition-colors" placeholder="john@example.com">
        </div>
        <div>
          <label class="block text-sm font-semibold text-primary mb-2">Pesan</label>
          <textarea class="w-full border border-border bg-neutral px-4 py-3 h-32 focus:outline-none focus:border-tertiary transition-colors" placeholder="Ceritakan tentang proyek Anda..."></textarea>
        </div>
        <button type="button" class="w-full bg-primary text-surface font-semibold py-4 hover:bg-tertiary transition-colors">Kirim Pesan</button>
      </form>
    </div>
  </section>
</main>
