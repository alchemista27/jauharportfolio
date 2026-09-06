<script lang="ts">
  let { children } = $props();
</script>

<div class="flex min-h-screen">
  <aside class="w-64 bg-primary text-surface p-6">
    <h2 class="text-xl font-heading font-bold mb-8">Admin Panel</h2>
    <nav class="space-y-4">
      <a href="/admin" class="block opacity-70 hover:opacity-100">Dashboard</a>
      <a href="/admin/media" class="block opacity-70 hover:opacity-100">Media Library</a>
      <a href="/admin/logout" class="block opacity-70 hover:opacity-100 mt-8 text-tertiary">Logout</a>
    </nav>
  </aside>
  <main class="flex-1 p-8 bg-neutral">
    {@render children()}
  </main>
</div>
