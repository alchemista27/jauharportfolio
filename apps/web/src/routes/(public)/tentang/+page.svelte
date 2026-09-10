<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Jauhariandev - Tentang Saya</title>
</svelte:head>

<main class="w-full">
        <!-- 2. PAGE TITLE / HERO -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto text-center border-b border-border">
            <h1 class="font-heading text-5xl md:text-7xl text-primary font-bold mb-6 tracking-tight">Tentang Saya.</h1>
            <div class="text-sm font-semibold uppercase tracking-widest text-primary opacity-70">
                <a href="#" class="hover:text-tertiary">Beranda</a> <span class="mx-2">•</span> <span>Tentang Kami</span>
            </div>
        </section>

        <!-- 3. INTRO / ABOUT AGENCY -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Perkenalan Diri</span>
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">{data.page?.title || "Membantu bisnis tampil menonjol di era digital."}</h2>
            </div>
            <div class="prose prose-lg prose-p:text-primary prose-p:opacity-80 prose-p:leading-relaxed">
                {#if data.page?.content}
                    {@html data.page.content}
                {:else}
                    <h3 class="font-heading text-2xl font-bold text-primary mb-6">Penelitian & Strategi Desain</h3>
                    <p class="text-primary opacity-80 text-lg leading-relaxed mb-6">
                        Sebagai seorang desainer dan pengembang independen, saya memadukan estetika minimalis dengan teknologi web terkini untuk menghasilkan produk digital yang tidak hanya terlihat indah, tetapi juga berkinerja luar biasa.
                    </p>
                    <p class="text-primary opacity-80 text-lg leading-relaxed">
                        Setiap baris kode dan setiap piksel desain disusun dengan tujuan yang jelas, memastikan pengalaman pengguna yang mulus dari awal hingga akhir.
                    </p>
                {/if}
            </div>
        </section>

        <!-- 4. FULL WIDTH IMAGE -->
        <section class="relative w-full h-[60vh] bg-cover bg-center bg-neutral" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80');">
            <div class="absolute inset-0 bg-primary opacity-20 pointer-events-none"></div>
            <div class="absolute top-4 left-4 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">[PLACEHOLDER UNSPLASH: GAMBAR KANTOR/KERJA]</div>
        </section>

        <!-- 5. HIGHLIGHTS / ACCORDION STYLE -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto border-b border-border">
            <div class="text-center mb-16">
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Nilai Utama</span>
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">Sorotan Kinerja.</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12">
                <div>
                    <h4 class="font-heading text-xl font-bold text-primary mb-4 border-b border-border pb-2">Manajemen Proyek</h4>
                    <p class="text-primary opacity-70 text-sm leading-relaxed">Komunikasi yang transparan dan tenggat waktu yang jelas untuk memastikan setiap pengerjaan berjalan mulus.</p>
                </div>
                <div>
                    <h4 class="font-heading text-xl font-bold text-primary mb-4 border-b border-border pb-2">Kualitas Kode</h4>
                    <p class="text-primary opacity-70 text-sm leading-relaxed">Implementasi struktur kode yang bersih, teruji, dan dioptimasi penuh untuk skalabilitas dan SEO.</p>
                </div>
                <div>
                    <h4 class="font-heading text-xl font-bold text-primary mb-4 border-b border-border pb-2">Dukungan Berkelanjutan</h4>
                    <p class="text-primary opacity-70 text-sm leading-relaxed">Memberikan layanan pemeliharaan purna jual untuk memastikan website tetap aman dan mutakhir.</p>
                </div>
            </div>
        </section>

        <!-- 6. MARQUEE TEXT -->
        <section class="py-24 bg-primary text-surface overflow-hidden border-b border-white/10">
            <div class="marquee font-heading text-[8rem] md:text-[12rem] font-bold uppercase tracking-tighter opacity-10 leading-none">
                <span>CREATIVE DESIGNER & DEVELOPER</span>
            </div>
        </section>

        <!-- 7. SERVICES (DIGITAL MARKETING/DESIGN) -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto border-b border-border">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Layanan Pilihan</span>
                    <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight mb-8">Solusi pemasaran & digital lengkap!</h2>
                    <a href="#" class="inline-block border-b-2 border-tertiary text-primary font-bold hover:text-tertiary transition-colors uppercase tracking-widest pb-1">Lihat Portofolio</a>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <svg class="w-10 h-10 text-tertiary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                        <h4 class="font-heading text-xl font-bold text-primary mb-3">Website Design</h4>
                        <p class="text-primary opacity-70 text-sm leading-relaxed">Perancangan visual website yang estetik, modern, dan sangat responsif di berbagai perangkat genggam.</p>
                    </div>
                    <div>
                        <svg class="w-10 h-10 text-tertiary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                        <h4 class="font-heading text-xl font-bold text-primary mb-3">Sistem Kompleks</h4>
                        <p class="text-primary opacity-70 text-sm leading-relaxed">Pengembangan sistem manajemen (dashboard), integrasi basis data, dan arsitektur backend berkinerja tinggi.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 8. SKILLS (PROGRESS BARS) -->
        <section class="py-24 px-6 bg-neutral">
            <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Keahlian Saya</span>
                    <h2 class="text-4xl font-heading font-bold text-primary leading-tight mb-6">Pengalaman spesifik.</h2>
                    <p class="text-primary opacity-80 text-lg leading-relaxed">Membangun fondasi kuat menggunakan alat dan bahasa pemrograman standar industri modern untuk menciptakan ekosistem yang terawat dengan baik.</p>
                </div>
                <div class="space-y-8">
                    <!-- Progress 1 -->
                    <div>
                        <div class="flex justify-between text-primary font-bold font-heading mb-2">
                            <span>SvelteKit & Frontend</span>
                            <span>95%</span>
                        </div>
                        <div class="w-full bg-border h-2 rounded-full overflow-hidden">
                            <div class="progress-bar-fill" style="width: 95%;"></div>
                        </div>
                    </div>
                    <!-- Progress 2 -->
                    <div>
                        <div class="flex justify-between text-primary font-bold font-heading mb-2">
                            <span>Hono & Backend (Cloudflare)</span>
                            <span>90%</span>
                        </div>
                        <div class="w-full bg-border h-2 rounded-full overflow-hidden">
                            <div class="progress-bar-fill" style="width: 90%;"></div>
                        </div>
                    </div>
                    <!-- Progress 3 -->
                    <div>
                        <div class="flex justify-between text-primary font-bold font-heading mb-2">
                            <span>UI/UX & Figma</span>
                            <span>85%</span>
                        </div>
                        <div class="w-full bg-border h-2 rounded-full overflow-hidden">
                            <div class="progress-bar-fill" style="width: 85%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 9. CREATIVE CONCEPT DESIGNS -->
        <section class="py-24 px-6 max-w-[1400px] mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="relative">
                    <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH]</div>
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" alt="Konsep Kreatif" class="w-full h-auto object-cover rounded-sm">
                </div>
                <div>
                    <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Desain Konsep Kreatif</span>
                    <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight mb-8">Mewujudkan ide Anda menjadi nyata.</h2>
                    <p class="text-primary opacity-80 text-lg leading-relaxed mb-6">
                        Setiap proyek dimulai dari analisis kebutuhan yang mendalam. Saya bekerja sama dengan Anda untuk merumuskan konsep desain yang tidak sekadar cantik, tetapi fungsional.
                    </p>
                    <ul class="space-y-4 text-primary font-semibold">
                        <li class="flex items-center"><span class="text-tertiary mr-3">✔</span> Strategi merek yang tajam</li>
                        <li class="flex items-center"><span class="text-tertiary mr-3">✔</span> Riset pengguna dan antarmuka</li>
                        <li class="flex items-center"><span class="text-tertiary mr-3">✔</span> Implementasi yang presisi</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- 10. IMAGE VIDEO POPUP -->
        <section class="relative w-full h-[70vh] bg-cover bg-center bg-neutral flex items-center justify-center" style="background-image: url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=80');">
            <div class="absolute inset-0 bg-primary opacity-40 pointer-events-none"></div>
            <div class="absolute top-4 left-4 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">[PLACEHOLDER UNSPLASH: VIDEO COVER]</div>
            
            <a href="#" class="relative z-10 w-24 h-24 bg-surface rounded-full flex items-center justify-center text-primary hover:bg-tertiary hover:text-surface transition-colors shadow-lg cursor-pointer">
                <svg class="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </a>
        </section>

        <!-- 11. TAGS / KATEGORI KEAHLIAN -->
        <section class="py-16 bg-surface px-6 border-b border-border text-center">
            <div class="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-4">
                <span class="px-6 py-3 border border-border rounded-full text-primary font-heading font-bold text-sm uppercase tracking-widest hover:border-primary cursor-pointer transition-colors">Desain Web</span>
                <span class="px-6 py-3 border border-border rounded-full text-primary font-heading font-bold text-sm uppercase tracking-widest hover:border-primary cursor-pointer transition-colors">Branding</span>
                <span class="px-6 py-3 border border-border rounded-full text-primary font-heading font-bold text-sm uppercase tracking-widest hover:border-primary cursor-pointer transition-colors">Optimasi Performa</span>
                <span class="px-6 py-3 border border-border rounded-full text-primary font-heading font-bold text-sm uppercase tracking-widest hover:border-primary cursor-pointer transition-colors">Sistem Admin</span>
                <span class="px-6 py-3 border border-border rounded-full text-primary font-heading font-bold text-sm uppercase tracking-widest hover:border-primary cursor-pointer transition-colors">Strategi Digital</span>
            </div>
        </section>

        <!-- 12. TEAM (Diadaptasi menjadi Tunggal untuk Personal Portfolio) -->
        <section class="py-24 bg-neutral px-6">
            <div class="max-w-[1400px] mx-auto text-center">
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-4 block">Profil Profesional</span>
                <h2 class="text-4xl font-heading font-bold text-primary mb-16">Orang Di Balik Kode.</h2>
                
                <div class="inline-block group text-center max-w-md mx-auto">
                    <div class="relative overflow-hidden mb-6">
                        <div class="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1">[PLACEHOLDER UNSPLASH: FOTO PROFIL]</div>
                        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" alt="Jauhariandev" class="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <h3 class="font-heading text-2xl font-bold text-primary mb-2">Jauhari</h3>
                    <span class="text-primary opacity-60 text-sm uppercase tracking-widest">Founder & Lead Developer</span>
                </div>
            </div>
        </section>

        <!-- 13. CTA BAWAH -->
        <section class="py-32 bg-primary px-6 text-center text-surface border-b border-white/10">
            <div class="max-w-3xl mx-auto">
                <span class="text-tertiary uppercase tracking-widest text-sm font-semibold mb-6 block">Kustomisasi Tanpa Batas</span>
                <h2 class="text-5xl md:text-6xl font-heading font-bold mb-12 leading-tight">Siap mewujudkan proyek digital impian Anda?</h2>
                <a href="#" class="inline-block bg-surface text-primary font-semibold text-sm py-4 px-10 rounded-sm hover:bg-tertiary hover:text-surface transition-colors uppercase tracking-wider">Hubungi Sekarang</a>
            </div>
        </section>

    </main>
