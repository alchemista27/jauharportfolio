<script lang="ts">
  import { api } from "$lib/api";
  import Editor from "$components/Editor.svelte";
  import { onMount } from "svelte";

  let pages = ["beranda", "tentang", "kontak"];
  let selectedSlug = $state("beranda");
  
  let title = $state("");
  let content = $state("");
  
  let isLoading = $state(false);
  let isSaving = $state(false);
  let message = $state("");

  async function loadPage() {
    isLoading = true;
    message = "";
    try {
      const res = await api.api.public.pages[":slug"].$get({
        param: { slug: selectedSlug }
      });
      if (res.ok) {
        const data = await res.json();
        title = data.title;
        content = data.content || "";
      } else {
        title = "";
        content = "";
        message = "Gagal memuat halaman.";
      }
    } catch (e) {
      console.error(e);
      message = "Terjadi kesalahan.";
    } finally {
      isLoading = false;
    }
  }

  async function savePage() {
    isSaving = true;
    message = "";
    try {
      const res = await api.api.admin.pages[":slug"].$put({
        param: { slug: selectedSlug },
        json: { title, content }
      });
      if (res.ok) {
        message = "Halaman berhasil disimpan!";
      } else {
        message = "Gagal menyimpan halaman.";
      }
    } catch (e) {
      console.error(e);
      message = "Terjadi kesalahan saat menyimpan.";
    } finally {
      isSaving = false;
      setTimeout(() => message = "", 3000);
    }
  }

  // Load whenever slug changes
  $effect(() => {
    if (selectedSlug) {
      loadPage();
    }
  });
</script>

<svelte:head>
  <title>Admin - Halaman Publik</title>
</svelte:head>

<div class="mb-8">
  <h1 class="text-3xl font-heading text-primary font-bold">Halaman Publik</h1>
  <p class="text-primary opacity-70 mt-2">Edit konten paragraf utama untuk halaman publik.</p>
</div>

<div class="bg-surface border border-border p-6 mb-6">
  <div class="mb-6">
    <label class="block text-sm font-semibold text-primary mb-2">Pilih Halaman</label>
    <select 
      bind:value={selectedSlug}
      class="w-full md:w-1/3 border border-border bg-neutral px-4 py-3 focus:outline-none focus:border-tertiary transition-colors"
    >
      {#each pages as page}
        <option value={page}>{page.charAt(0).toUpperCase() + page.slice(1)}</option>
      {/each}
    </select>
  </div>

  {#if isLoading}
    <div class="text-primary opacity-50 py-10">Memuat data...</div>
  {:else}
    <form class="space-y-6" onsubmit={(e) => { e.preventDefault(); savePage(); }}>
      <div>
        <label class="block text-sm font-semibold text-primary mb-2">Judul Halaman (Headline)</label>
        <input 
          type="text" 
          bind:value={title}
          class="w-full border border-border bg-neutral px-4 py-3 focus:outline-none focus:border-tertiary transition-colors"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-semibold text-primary mb-2">Konten Deskripsi</label>
        <p class="text-xs text-primary opacity-70 mb-2">Catatan: Hanya paragraf/list yang akan dirender. Tiptap tidak mendukung layout Grid Svelte.</p>
        <Editor bind:content={content} />
      </div>

      <div class="flex items-center space-x-4">
        <button 
          type="submit" 
          class="bg-primary text-surface px-8 py-3 font-semibold hover:bg-tertiary transition-colors disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        
        {#if message}
          <span class="text-tertiary font-semibold text-sm">{message}</span>
        {/if}
      </div>
    </form>
  {/if}
</div>
