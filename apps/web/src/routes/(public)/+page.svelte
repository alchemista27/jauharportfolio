<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Jauhariandev - Beranda</title>
</svelte:head>

<div class="relative w-full h-screen flex flex-col bg-cover bg-center -mt-[89px]" style="background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-primary opacity-80 pointer-events-none"></div>
    <!-- 2. HERO CONTENT -->
        <div class="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-4">
            <span class="text-surface font-semibold text-sm tracking-[0.2em] uppercase mb-6 opacity-90">Digital Agency & Portfolio</span>
            <h1 class="font-heading text-5xl md:text-7xl lg:text-[5rem] text-surface font-bold mb-10 tracking-tight">Jauhariandev</h1>
            <a href="#" class="inline-block bg-tertiary text-white font-semibold text-sm py-4 px-10 hover:bg-opacity-90 transition-opacity uppercase tracking-wider">Discover</a>
        </div>
    </div>

<main class="w-full bg-neutral">
        
        <!-- 3. ABOUT AGENCY -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-border">
            <div>
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Tentang Jauhariandev</span>
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">{data.page?.title || "Agensi kreatif spesialis dalam strategi digital."}</h2>
            </div>
            <div class="text-primary opacity-80 text-lg leading-relaxed md:pt-10 prose prose-p:mb-4">
                {#if data.page?.content}
                    {@html data.page.content}
                {:else}
                    <p>Dengan pengalaman bertahun-tahun di industri desain dan pengembangan website, saya bangga dapat menciptakan desain yang unik, kreatif, dan berkualitas, dibangun dengan standar kode modern.</p>
                {/if}
            </div>
        </section>

        <!-- 4. SERVICES ICONS -->
        <section class="py-16 px-6 max-w-[1400px] mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <!-- Icon 1 -->
                <div class="flex items-center space-x-4 group cursor-pointer">
                    <div class="text-tertiary group-hover:text-primary transition-colors duration-300">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </div>
                    <span class="font-heading text-lg font-bold text-primary tracking-wide">[JASA: Web Dev]</span>
                </div>
                <!-- Icon 2 -->
                <div class="flex items-center space-x-4 group cursor-pointer">
                    <div class="text-tertiary group-hover:text-primary transition-colors duration-300">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                    </div>
                    <span class="font-heading text-lg font-bold text-primary tracking-wide">[JASA: UI/UX]</span>
                </div>
                <!-- Icon 3 -->
                <div class="flex items-center space-x-4 group cursor-pointer">
                    <div class="text-tertiary group-hover:text-primary transition-colors duration-300">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <span class="font-heading text-lg font-bold text-primary tracking-wide">[JASA: Maintain]</span>
                </div>
                <!-- Icon 4 -->
                <div class="flex items-center space-x-4 group cursor-pointer">
                    <div class="text-tertiary group-hover:text-primary transition-colors duration-300">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <span class="font-heading text-lg font-bold text-primary tracking-wide">[JASA: SEO]</span>
                </div>
            </div>
        </section>

        <!-- 5. PORTFOLIO / FEATURED WORKS -->
        <section class="py-24 bg-surface px-6">
            <div class="max-w-[1400px] mx-auto">
                <div class="text-center mb-16">
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-2 block">Karya Unggulan</span>
                    <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary">Portofolio Pilihan.</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Portofolio 1 -->
                    <div class="group relative overflow-hidden bg-neutral">
                        <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH: PORTOFOLIO]</div>
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Portfolio 1" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                            <h3 class="text-surface font-heading text-2xl font-bold mb-2">Proyek Alpha</h3>
                            <span class="text-tertiary text-sm tracking-widest uppercase">Web Development</span>
                        </div>
                    </div>
                    <!-- Portofolio 2 -->
                    <div class="group relative overflow-hidden bg-neutral">
                        <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH: PORTOFOLIO]</div>
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Portfolio 2" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                            <h3 class="text-surface font-heading text-2xl font-bold mb-2">Aplikasi Beta</h3>
                            <span class="text-tertiary text-sm tracking-widest uppercase">UI/UX Design</span>
                        </div>
                    </div>
                    <!-- Portofolio 3 -->
                    <div class="group relative overflow-hidden bg-neutral">
                        <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH: PORTOFOLIO]</div>
                        <img src="https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80" alt="Portfolio 3" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                            <h3 class="text-surface font-heading text-2xl font-bold mb-2">Sistem Gamma</h3>
                            <span class="text-tertiary text-sm tracking-widest uppercase">Maintenance</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. AWARDS -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto border-b border-border">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center md:text-left">
                <div>
                    <h2 class="text-3xl font-heading font-bold text-primary">Penghargaan</h2>
                </div>
                <div class="flex flex-col">
                    <span class="text-tertiary font-bold font-heading text-xl">2021</span>
                    <span class="text-primary font-semibold">Situs Web Terbaik</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-tertiary font-bold font-heading text-xl">2022</span>
                    <span class="text-primary font-semibold">Komunikasi Digital</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-tertiary font-bold font-heading text-xl">2023</span>
                    <span class="text-primary font-semibold">Desain UI Paling Inovatif</span>
                </div>
            </div>
        </section>

        <!-- 7. HIGHLIGHTS OF SERVICES -->
        <section class="py-24 bg-neutral px-6">
            <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="relative">
                    <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH: HIGHLIGHT]</div>
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" alt="Highlight" class="w-full h-[500px] object-cover">
                </div>
                <div>
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Fokus Layanan</span>
                    <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight mb-6">Membangun ekosistem digital yang kuat.</h2>
                    <p class="text-primary opacity-80 text-lg leading-relaxed mb-10">
                        Saya berdedikasi membantu bisnis mentransformasi identitas mereka ke dunia maya dengan pondasi strategi yang terukur.
                    </p>
                    <a href="#" class="inline-block border-b-2 border-tertiary text-primary font-bold hover:text-tertiary transition-colors uppercase tracking-widest pb-1">Jelajahi Layanan</a>
                </div>
            </div>
        </section>

        <!-- 8. FEATURES -->
        <section class="py-24 bg-surface px-6">
            <div class="max-w-[1400px] mx-auto text-center">
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Fitur Unggulan</span>
                <h2 class="text-4xl font-heading font-bold text-primary mb-16">Kenapa Memilih Saya?</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 class="font-heading text-xl font-bold text-primary mb-4">Desain Estetis</h3>
                        <p class="text-primary opacity-80 leading-relaxed">Fokus pada pendekatan minimalis yang elegan tanpa mengorbankan fungsionalitas dan keramahan pengguna.</p>
                    </div>
                    <div>
                        <h3 class="font-heading text-xl font-bold text-primary mb-4">Performa Cepat</h3>
                        <p class="text-primary opacity-80 leading-relaxed">Kode bersih dan ringan (HTML5, Tailwind, SvelteKit) memastikan situs dimuat dengan sangat cepat.</p>
                    </div>
                    <div>
                        <h3 class="font-heading text-xl font-bold text-primary mb-4">Skalabilitas Tinggi</h3>
                        <p class="text-primary opacity-80 leading-relaxed">Arsitektur aplikasi web siap untuk menampung pertumbuhan pengunjung seiring suksesnya bisnis Anda.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 9. IMAGE BREAK (PARALLAX) -->
        <section class="relative w-full h-[50vh] bg-cover bg-fixed bg-center" style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80');">
            <div class="absolute inset-0 bg-primary opacity-70"></div>
            <div class="absolute top-4 left-4 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">[PLACEHOLDER UNSPLASH: PEMISAH GAMBAR]</div>
            <div class="relative z-10 flex h-full items-center justify-center">
                <h2 class="text-3xl md:text-5xl font-heading font-bold text-surface text-center px-4">Tingkatkan Bisnis Anda Hari Ini.</h2>
            </div>
        </section>

        <!-- 10. TEAM -->
        <section class="py-24 bg-neutral px-6">
            <div class="max-w-[1400px] mx-auto">
                <div class="text-center mb-16">
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-2 block">Tim Kreatif</span>
                    <h2 class="text-4xl font-heading font-bold text-primary">Profesional Berbakat.</h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <!-- Anggota 1 -->
                    <div class="group text-center">
                        <div class="relative overflow-hidden mb-6 inline-block">
                            <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER]</div>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" alt="Team 1" class="w-full max-w-sm h-80 object-cover mx-auto group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <h3 class="font-heading text-xl font-bold text-primary">John Doe</h3>
                        <span class="text-primary opacity-60 text-sm">Lead Developer</span>
                    </div>
                    <!-- Anggota 2 -->
                    <div class="group text-center">
                        <div class="relative overflow-hidden mb-6 inline-block">
                            <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER]</div>
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" alt="Team 2" class="w-full max-w-sm h-80 object-cover mx-auto group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <h3 class="font-heading text-xl font-bold text-primary">Jane Smith</h3>
                        <span class="text-primary opacity-60 text-sm">Project Manager</span>
                    </div>
                    <!-- Anggota 3 -->
                    <div class="group text-center">
                        <div class="relative overflow-hidden mb-6 inline-block">
                            <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER]</div>
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" alt="Team 3" class="w-full max-w-sm h-80 object-cover mx-auto group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <h3 class="font-heading text-xl font-bold text-primary">Alice Johnson</h3>
                        <span class="text-primary opacity-60 text-sm">UI/UX Designer</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 11. TESTIMONIALS -->
        <section class="py-24 bg-surface px-6 border-t border-border">
            <div class="max-w-4xl mx-auto text-center">
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Kata Klien</span>
                <p class="text-2xl md:text-3xl font-heading text-primary font-semibold leading-relaxed mb-8 italic">
                    "Kerjasama yang sangat memuaskan. Website kami kini berjalan jauh lebih cepat dan mendatangkan lebih banyak konversi karena desain yang intuitif."
                </p>
                <span class="text-primary font-bold uppercase tracking-widest">— Bapak Budi, CEO Tech Corp</span>
            </div>
        </section>

        <!-- 12. COUNTERS -->
        <section class="py-20 bg-primary text-surface px-6">
            <div class="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <h3 class="font-heading text-5xl font-bold text-tertiary mb-2">240</h3>
                    <span class="uppercase tracking-widest text-sm opacity-80">Proyek Selesai</span>
                </div>
                <div>
                    <h3 class="font-heading text-5xl font-bold text-tertiary mb-2">95</h3>
                    <span class="uppercase tracking-widest text-sm opacity-80">Klien Bahagia</span>
                </div>
                <div>
                    <h3 class="font-heading text-5xl font-bold text-tertiary mb-2">5+</h3>
                    <span class="uppercase tracking-widest text-sm opacity-80">Tahun Pengalaman</span>
                </div>
                <div>
                    <h3 class="font-heading text-5xl font-bold text-tertiary mb-2">120</h3>
                    <span class="uppercase tracking-widest text-sm opacity-80">Cangkir Kopi</span>
                </div>
            </div>
        </section>

        <!-- 13. BLOG -->
        <section class="py-24 bg-neutral px-6">
            <div class="max-w-[1400px] mx-auto">
                <div class="text-center mb-16">
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-2 block">Artikel Terbaru</span>
                    <h2 class="text-4xl font-heading font-bold text-primary">Berita & Insight.</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Blog 1 -->
                    <div class="group cursor-pointer">
                        <div class="relative overflow-hidden mb-6">
                            <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH]</div>
                            <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80" alt="Blog 1" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <span class="text-tertiary text-sm font-semibold uppercase tracking-widest mb-2 block">Web Design • 12 Sep 2026</span>
                        <h3 class="font-heading text-2xl font-bold text-primary mb-3 group-hover:text-tertiary transition-colors">Tren Desain Minimalis di Tahun Ini</h3>
                        <p class="text-primary opacity-80">Membahas mengapa pendekatan ruang negatif (whitespace) masih mendominasi portofolio kreatif...</p>
                    </div>
                    <!-- Blog 2 -->
                    <div class="group cursor-pointer">
                        <div class="relative overflow-hidden mb-6">
                            <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH]</div>
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Blog 2" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <span class="text-tertiary text-sm font-semibold uppercase tracking-widest mb-2 block">Development • 05 Sep 2026</span>
                        <h3 class="font-heading text-2xl font-bold text-primary mb-3 group-hover:text-tertiary transition-colors">Mengapa Beralih ke SvelteKit?</h3>
                        <p class="text-primary opacity-80">Framework SvelteKit menawarkan performa luar biasa dan pengalaman pengembangan yang lebih bersih dibandingkan...</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
