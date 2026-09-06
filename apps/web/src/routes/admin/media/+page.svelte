<script lang="ts">
  import { api } from "$lib/api";
  import { onMount } from "svelte";
  import { Trash2, UploadCloud, X, Copy } from "lucide-svelte";

  let mediaList = $state<any[]>([]);
  let isLoading = $state(true);
  let isUploading = $state(false);
  let fileInput = $state<HTMLInputElement | null>(null);

  async function loadMedia() {
    isLoading = true;
    try {
      const res = await api.api.admin.media.$get();
      if (res.ok) {
        mediaList = await res.json();
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function handleUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;
    
    const file = target.files[0];
    isUploading = true;
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await api.api.admin.media.$post({
        form: { file }
      });
      
      if (res.ok) {
        await loadMedia(); // refresh list
      }
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      isUploading = false;
      if (fileInput) fileInput.value = "";
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;
    
    try {
      const res = await api.api.admin.media[":id"].$delete({
        param: { id: id.toString() }
      });
      if (res.ok) {
        await loadMedia();
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  }

  onMount(() => {
    loadMedia();
  });
</script>

<div class="flex justify-between items-center mb-8">
  <h1 class="text-3xl font-heading text-primary font-bold">Media Library</h1>
  <div>
    <input 
      type="file" 
      accept="image/*" 
      class="hidden" 
      bind:this={fileInput}
      onchange={handleUpload}
    />
    <button 
      class="bg-primary text-surface px-4 py-2 flex items-center space-x-2 opacity-90 hover:opacity-100"
      onclick={() => fileInput?.click()}
      disabled={isUploading}
    >
      <UploadCloud size={20} />
      <span>{isUploading ? 'Mengunggah...' : 'Unggah Gambar'}</span>
    </button>
  </div>
</div>

{#if isLoading}
  <div class="text-center py-12 text-primary opacity-50">
    Memuat galeri...
  </div>
{:else if mediaList.length === 0}
  <div class="text-center py-24 border-2 border-dashed border-border text-primary opacity-50">
    <p class="mb-4">Belum ada gambar yang diunggah.</p>
    <button class="text-tertiary underline" onclick={() => fileInput?.click()}>Mulai unggah</button>
  </div>
{:else}
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {#each mediaList as item}
      <div class="group relative border border-border bg-surface overflow-hidden aspect-square flex items-center justify-center">
        <img 
          src={item.url} 
          alt={item.filename} 
          class="object-cover w-full h-full"
        />
        <div class="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
          <button 
            class="text-surface flex items-center gap-1 hover:text-tertiary"
            onclick={() => handleDelete(item.id)}
            title="Hapus gambar"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    {/each}
  </div>
{/if}
