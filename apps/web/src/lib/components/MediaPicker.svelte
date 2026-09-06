<script lang="ts">
  import { api } from "$lib/api";
  import { onMount } from "svelte";
  import { X, UploadCloud } from "lucide-svelte";

  let { onSelect, onClose } = $props<{
    onSelect: (url: string) => void;
    onClose: () => void;
  }>();

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

  onMount(() => {
    loadMedia();
  });
</script>

<div class="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-4">
  <div class="bg-surface w-full max-w-4xl h-[80vh] flex flex-col border border-border">
    <!-- Header -->
    <div class="p-6 border-b border-border flex justify-between items-center">
      <h2 class="text-xl font-heading font-bold text-primary">Pilih Media</h2>
      <button onclick={onClose} class="text-primary opacity-50 hover:opacity-100 hover:text-tertiary">
        <X size={24} />
      </button>
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto p-6 bg-neutral">
      {#if isLoading}
        <div class="flex items-center justify-center h-full text-primary opacity-50">
          Memuat galeri...
        </div>
      {:else}
        <!-- Upload Button -->
        <div class="mb-6">
          <input 
            type="file" 
            accept="image/*" 
            class="hidden" 
            bind:this={fileInput}
            onchange={handleUpload}
          />
          <button 
            class="bg-surface border border-border px-4 py-2 flex items-center space-x-2 text-primary hover:bg-primary hover:text-surface transition-colors"
            onclick={() => fileInput?.click()}
            disabled={isUploading}
          >
            <UploadCloud size={20} />
            <span>{isUploading ? 'Mengunggah...' : 'Unggah Gambar Baru'}</span>
          </button>
        </div>

        <!-- Grid -->
        {#if mediaList.length === 0}
          <div class="text-center py-12 text-primary opacity-50">
            Belum ada gambar. Silakan unggah terlebih dahulu.
          </div>
        {:else}
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {#each mediaList as item}
              <button 
                class="group relative border border-border bg-surface aspect-square overflow-hidden hover:border-tertiary transition-colors"
                onclick={() => onSelect(item.url)}
              >
                <img 
                  src={item.url} 
                  alt={item.filename} 
                  class="object-cover w-full h-full"
                />
                <div class="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span class="text-surface font-semibold text-sm">Pilih</span>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>
