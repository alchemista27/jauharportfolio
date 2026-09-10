<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";

  let { content = $bindable(""), onChange } = $props<{
    content?: string;
    onChange?: (html: string) => void;
  }>();

  let element: HTMLElement;
  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [StarterKit],
      content: content,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        content = html;
        if (onChange) onChange(html);
      },
    });
  });

  onDestroy(() => {
    if (editor) editor.destroy();
  });

  // Watch for external content changes
  $effect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  });
</script>

<div class="border border-border bg-white prose max-w-none">
  {#if editor}
    <div class="border-b border-border p-2 bg-neutral flex flex-wrap gap-2">
      <button 
        type="button" 
        class="px-2 py-1 bg-surface border border-border text-xs font-semibold rounded hover:bg-primary hover:text-surface {editor.isActive('bold') ? 'bg-primary text-surface' : ''}" 
        onclick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>
      <button 
        type="button" 
        class="px-2 py-1 bg-surface border border-border text-xs font-semibold rounded hover:bg-primary hover:text-surface {editor.isActive('italic') ? 'bg-primary text-surface' : ''}" 
        onclick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </button>
      <button 
        type="button" 
        class="px-2 py-1 bg-surface border border-border text-xs font-semibold rounded hover:bg-primary hover:text-surface {editor.isActive('heading', { level: 2 }) ? 'bg-primary text-surface' : ''}" 
        onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button 
        type="button" 
        class="px-2 py-1 bg-surface border border-border text-xs font-semibold rounded hover:bg-primary hover:text-surface {editor.isActive('heading', { level: 3 }) ? 'bg-primary text-surface' : ''}" 
        onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>
      <button 
        type="button" 
        class="px-2 py-1 bg-surface border border-border text-xs font-semibold rounded hover:bg-primary hover:text-surface {editor.isActive('bulletList') ? 'bg-primary text-surface' : ''}" 
        onclick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullet List
      </button>
    </div>
  {/if}
  
  <div bind:this={element} class="p-4 min-h-[300px] outline-none prose-p:my-2 prose-headings:my-4"></div>
</div>

<style>
  :global(.ProseMirror) {
    min-height: 300px;
    outline: none;
  }
  :global(.ProseMirror p.is-editor-empty:first-child::before) {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
</style>
