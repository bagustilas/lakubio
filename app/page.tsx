import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lakubio — Buat Website Toko Online & Bio Link Katalog WhatsApp UMKM",
  description:
    "Buat bio link katalog toko online dalam 3 menit. Katalog mobile-friendly, checkout otomatis ke WhatsApp, 0% potongan transaksi. Solusi jualan online mudah untuk UMKM & Olshop Indonesia.",
  keywords: [
    "bio link toko online",
    "katalog whatsapp",
    "website toko online gratis",
    "link bio instagram jualan",
    "katalog online umkm",
    "buat website toko wa",
    "aplikasi jualan online tanpa potongan",
    "order whatsapp otomatis",
    "bio link olshop",
    "alternatif linktree toko online",
    "link katalog whatsapp gratis",
  ],
  authors: [{ name: "Lakubio" }],
  creator: "Lakubio",
  publisher: "Lakubio",
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: "https://lakubio.id",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Lakubio — Buat Website Toko Online & Bio Link Katalog WhatsApp UMKM",
    description:
      "Tingkatkan penjualan tokomu! Buat katalog produk interaktif untuk link bio Instagram & TikTok. Pesanan langsung masuk WhatsApp dengan format rapi tanpa potongan komisi.",
    url: "https://lakubio.id",
    siteName: "Lakubio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Lakubio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakubio — Bio Link Katalog WhatsApp untuk UMKM Indonesia",
    description:
      "Satu link katalog untuk semua produk tokomu. Pesanan otomatis masuk WhatsApp rapi, tanpa coding dan 0% biaya potongan.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Data Tanya Jawab (FAQ) yang dioptimasi untuk Long-Tail Search Intent
const FAQ_ITEMS = [
  {
    q: "Apa itu Lakubio?",
    a: "Lakubio adalah platform pembuat website toko online dan bio link katalog khusus UMKM & online shop. Dengan Lakubio, Anda dapat memajang seluruh produk dalam satu tautan interaktif yang ramah ponsel (mobile-friendly), di mana setiap pesanan pembeli otomatis terformat rapi dan langsung dikirim ke WhatsApp penjual.",
  },
  {
    q: "Apakah penjual atau pembeli harus menginstal aplikasi?",
    a: "Sama sekali tidak. Lakubio berbasis web instan. Baik pemilik toko maupun pelanggan dapat mengakses, melihat katalog, mengelola produk, dan memesan langsung melalui browser smartphone (Chrome, Safari, dsb.) atau laptop tanpa perlu download aplikasi apa pun.",
  },
  {
    q: "Bagaimana alur transaksi dan sistem pembayarannya?",
    a: "Pelanggan memilih produk di halaman katalog Anda, lalu menekan tombol 'Pesan via WhatsApp'. Detail produk yang dipilih, jumlah, catatan, dan total harga otomatis terangkum dalam format pesan chat WhatsApp. Pembayaran ditransfer langsung oleh pembeli ke rekening atau e-wallet Anda tanpa pihak ketiga.",
  },
  {
    q: "Apakah ada biaya komisi atau potongan per transaksi?",
    a: "Tidak ada potongan per transaksi (0% komisi). Penghasilan dari setiap penjualan 100% menjadi milik Anda seutuhnya. Berbeda dengan marketplace besar yang memotong komisi tinggi, Lakubio hadir untuk mendukung keuntungan maksimal pengusaha lokal.",
  },
  {
    q: "Di mana saja saya bisa memasang tautan toko Lakubio?",
    a: "Tautan toko Anda (contoh: lakubio.id/namatoko) dapat dipasang di bio profil Instagram, TikTok, status WhatsApp, Facebook Page, kartu nama digital, poster promosi, maupun dibagikan langsung ke chat grup calon pembeli.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk membuat toko online di Lakubio?",
    a: "Hanya sekitar 3 menit! Anda cukup mendaftar dengan email, mengisi nama toko dan nomor WhatsApp, lalu mengunggah foto produk beserta harganya. Toko Anda langsung siap menerima pesanan hari ini juga.",
  },
  {
    q: "Apakah saya bisa mengatur status toko sedang buka atau libur?",
    a: "Bisa! Lakubio menyediakan fitur saklar (toggle) status toko 'Buka / Tutup'. Jika Anda sedang libur atau stok habis, pembeli akan melihat pemberitahuan ramah bahwa toko sedang beristirahat.",
  },
];

// Kategori & Contoh Industri Pengguna
const CATEGORIES = [
  {
    icon: "🍰",
    title: "Kuliner & Bakery",
    desc: "Kue kering, roti, frozen food, katering, minuman boba, sambal botolan, dan aneka snack.",
  },
  {
    icon: "👗",
    title: "Fashion & Hijab",
    desc: "Baju gamis, jilbab, kaos distro, tas handmade, sepatu, pakaian anak, dan daster.",
  },
  {
    icon: "✨",
    title: "Beauty & Skincare",
    desc: "Kosmetik herbal, parfum, sabun organik, serum perawatan kulit, dan body lotion.",
  },
  {
    icon: "💐",
    title: "Craft & Gift",
    desc: "Buket bunga wisuda, hampers lebaran, kado custom, aksesoris manik, dan souvenir.",
  },
  {
    icon: "🌿",
    title: "Tanaman & Hobi",
    desc: "Tanaman hias, bibit bunga, pot keramik, pakan hewan peliharaan, dan perlengkapan hobi.",
  },
  {
    icon: "📦",
    title: "Reseller & Dropship",
    desc: "Katalog praktis tanpa harus bolak-balik kirim puluhan foto katalog berulang di chat WA.",
  },
];

export default function LandingPage() {
  // Schema.org Structured Data untuk Rich Snippets di Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://lakubio.id/#website",
        url: "https://lakubio.id",
        name: "Lakubio",
        description:
          "Platform Pembuat Website Toko Online & Bio Link Katalog WhatsApp UMKM Indonesia",
        inLanguage: "id-ID",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://lakubio.id/#software",
        name: "Lakubio",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All (Web-based)",
        description:
          "Solusi katalog toko online bio link dengan pesanan langsung terintegrasi ke WhatsApp untuk UMKM & pebisnis online.",
        offers: [
          {
            "@type": "Offer",
            name: "Paket Gratis",
            price: "0",
            priceCurrency: "IDR",
            description: "Hingga 10 produk, link katalog toko online gratis selamanya",
          },
          {
            "@type": "Offer",
            name: "Paket Pro",
            price: "45000",
            priceCurrency: "IDR",
            description: "Produk tanpa batas, analitik pengunjung, bebas ubah tautan toko",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "385",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://lakubio.id/#organization",
        name: "Lakubio",
        url: "https://lakubio.id",
        logo: "https://lakubio.id/logo.png",
        sameAs: ["https://instagram.com/lakubio.id"],
      },
      {
        "@type": "FAQPage",
        "@id": "https://lakubio.id/#faq",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-cream text-ink antialiased selection:bg-moss/20 selection:text-ink">
        {/* TOP ANNOUNCEMENT BAR */}
        <aside
          aria-label="Pemberitahuan Promo"
          className="bg-moss px-4 py-2 text-center text-xs font-medium text-cream sm:text-sm"
        >
          <span>🎉 Bikin toko online pertamamu <strong>100% Gratis</strong> tanpa kartu kredit. </span>
          <Link
            href="/register"
            className="inline-flex items-center underline underline-offset-2 hover:text-white transition ml-1 font-bold"
          >
            Daftar Sekarang &rarr;
          </Link>
        </aside>

        {/* HEADER & NAVIGATION */}
        <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md transition-all">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-moss"
              aria-label="Halaman Utama Lakubio"
            >
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-xl shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Lakubio Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority
                />
              </div>
              <span>Lakubio</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden md:flex items-center gap-6 text-sm font-medium text-ink/75"
            >
              <a href="#fitur" className="hover:text-moss transition">
                Fitur Unggulan
              </a>
              <a href="#cara-kerja" className="hover:text-moss transition">
                Cara Kerja
              </a>
              <a href="#solusi" className="hover:text-moss transition">
                Untuk Siapa?
              </a>
              <a href="#perbandingan" className="hover:text-moss transition">
                Perbandingan
              </a>
              <a href="#harga" className="hover:text-moss transition">
                Harga
              </a>
              <a href="#faq" className="hover:text-moss transition">
                FAQ
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/login"
                className="text-xs sm:text-sm font-semibold text-ink/80 hover:text-moss px-3 py-2 rounded-full transition"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="btn-primary py-2 px-4 sm:px-5 text-xs sm:text-sm shadow-sm"
              >
                Buat Toko Gratis
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* HERO SECTION */}
          <section
            aria-labelledby="hero-title"
            className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-line"
          >
            {/* Background Decorative Blob */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-moss/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-clay/10 border border-clay/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-clay mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-clay"></span>
                </span>
                Bio Link Katalog No. 1 untuk UMKM & Olshop
              </div>

              {/* Main Heading H1 (Target Keyword Primary) */}
              <h1
                id="hero-title"
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.18] text-ink max-w-4xl mx-auto"
              >
                Satu Link Katalog Toko Online.{" "}
                <br className="hidden sm:inline" />
                <span className="text-moss underline decoration-clay/40 decoration-wavy decoration-2">
                  Order Otomatis Masuk ke WhatsApp.
                </span>
              </h1>

              {/* Sub-heading with Semantic Context */}
              <p className="mx-auto mt-5 sm:mt-6 max-w-2xl text-sm sm:text-lg text-ink/75 leading-relaxed">
                Tingkatkan omzet jualanmu tanpa repot kirim foto satu-persatu di chat. Buat website katalog mobile instan dalam 3 menit — tanpa coding, tanpa install aplikasi, dan <strong>0% biaya potongan transaksi</strong>.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
                <Link
                  href="/register"
                  className="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition transform active:scale-95"
                >
                  🚀 Buat Toko Gratis Sekarang
                </Link>
                <a
                  href="#demo-preview"
                  className="btn-secondary w-full sm:w-auto py-3.5 px-6 text-xs sm:text-sm font-semibold"
                >
                  🔍 Lihat Simulasi Toko
                </a>
              </div>

              {/* Trust Indicators / Social Proof Counter */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-ink/70">
                <div className="flex items-center gap-1.5">
                  <span className="text-moss font-bold text-base">✓</span>
                  <span><strong>1.200+</strong> UMKM Terdaftar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-moss font-bold text-base">✓</span>
                  <span><strong>0%</strong> Potongan Komisi Penjualan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-moss font-bold text-base">✓</span>
                  <span>Siap Pakai Dalam <strong>3 Menit</strong></span>
                </div>
              </div>

              {/* LIVE INTERACTIVE DEMO CARD / MOBILE MOCKUP */}
              <div
                id="demo-preview"
                className="mt-12 sm:mt-16 mx-auto max-w-sm rounded-3xl border-4 border-line bg-white p-4 sm:p-5 shadow-2xl text-left transform transition-all duration-300 hover:-translate-y-1"
              >
                {/* Simulated Phone Top Speaker & Camera */}
                <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-line/80" aria-hidden="true" />

                {/* Simulated Store Header */}
                <div className="flex items-center gap-3 border-b border-line pb-3.5">
                  <div className="h-12 w-12 rounded-full bg-moss flex items-center justify-center font-bold text-cream text-lg shadow-inner">
                    🍰
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-display font-bold text-ink text-sm sm:text-base truncate">
                        Dapur Bu Sri Pastry
                      </p>
                      <span className="text-xs text-moss" title="Toko Terverifikasi">
                        ☑️
                      </span>
                    </div>
                    <p className="text-[11px] text-moss font-semibold flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-moss animate-pulse" />
                      Toko Buka &amp; Siap Kirim Hari Ini
                    </p>
                  </div>
                </div>

                {/* Simulated Category Pill Filter */}
                <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-medium text-ink/70">
                  <span className="rounded-full bg-moss text-cream px-2.5 py-0.5 font-bold whitespace-nowrap">
                    Semua (8)
                  </span>
                  <span className="rounded-full bg-cream px-2.5 py-0.5 border border-line whitespace-nowrap">
                    Brownies
                  </span>
                  <span className="rounded-full bg-cream px-2.5 py-0.5 border border-line whitespace-nowrap">
                    Bolu Gulung
                  </span>
                </div>

                {/* Simulated Products List */}
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl bg-cream/50 p-2.5 border border-line/70 hover:border-moss/50 transition">
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] bg-clay/10 text-clay font-bold px-1.5 py-0.2 rounded">
                          Terlaris
                        </span>
                        <p className="text-xs font-semibold text-ink truncate">
                          Brownies Fudgy Shiny Crust
                        </p>
                      </div>
                      <p className="text-xs font-bold text-moss mt-0.5">Rp35.000</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-moss text-cream text-[11px] font-bold px-3 py-1 shadow-sm hover:opacity-90 active:scale-95 transition"
                    >
                      + Tambah
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-cream/50 p-2.5 border border-line/70 hover:border-moss/50 transition">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-semibold text-ink truncate">
                        Bolu Gulung Pandan Keju Super
                      </p>
                      <p className="text-xs font-bold text-moss mt-0.5">Rp48.000</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-moss text-cream text-[11px] font-bold px-3 py-1 shadow-sm hover:opacity-90 active:scale-95 transition"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                {/* Simulated Cart & WA Checkout Action */}
                <div className="mt-3.5 pt-3 border-t border-line">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
                    <span>Keranjang Belanja:</span>
                    <span className="text-moss font-bold">2 Produk (Rp83.000)</span>
                  </div>
                  <div className="btn-whatsapp w-full py-2.5 text-xs font-bold shadow-md cursor-pointer text-center">
                    💬 Pesan Langsung via WhatsApp
                  </div>
                  <p className="mt-2 text-center text-[10px] text-ink/50">
                    Format pesan rincian otomatis terisi di chat WhatsApp penjual
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PROBLEM & PAIN POINTS VS SOLUTION */}
          <section
            aria-labelledby="masalah-solusi-title"
            className="bg-white py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Masalah Penjualan Olshop
                </span>
                <h2
                  id="masalah-solusi-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Apakah Anda Masih Mengalami Hal Melelahkan Ini Saat Jualan?
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/75 leading-relaxed">
                  Banyak calon pelanggan batal beli hanya karena alur pemesanan yang rumit dan tidak transparan.
                </p>
              </div>

              {/* Comparison Grid: Cara Lama vs Lakubio */}
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {/* Cara Konvensional */}
                <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
                  <div className="flex items-center gap-2.5 text-red-700 font-bold text-base sm:text-lg mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-sm">
                      ✕
                    </span>
                    Cara Jualan Lama (Bikin Lelah)
                  </div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-ink/80">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>Harus kirim puluhan foto katalog berulang kali ke setiap calon pembeli di chat WA.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>Calon pembeli sering tanya: <em>&ldquo;Ini harganya berapa min? Masih ada stok?&rdquo;</em></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>Penjual harus menghitung total belanjaan dan ongkir secara manual satu per satu.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>Potongan komisi marketplace besar memakan margin keuntungan produk Anda hingga 10%.</span>
                    </li>
                  </ul>
                </div>

                {/* Solusi Lakubio */}
                <div className="rounded-2xl border-2 border-moss bg-moss/5 p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 text-moss font-bold text-base sm:text-lg mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-moss text-cream text-sm">
                      ✓
                    </span>
                    Solusi Cerdas Pakai Lakubio
                  </div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-ink/85">
                    <li className="flex items-start gap-2.5">
                      <span className="text-moss font-bold">✓</span>
                      <span>Cukup pasang 1 link di bio media sosial, semua foto produk &amp; harga tersusun rapi.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-moss font-bold">✓</span>
                      <span>Pembeli langsung melihat katalog lengkap, deskripsi, harga resmi, dan status ketersediaan.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-moss font-bold">✓</span>
                      <span>Pesanan, pilihan varian, jumlah, dan total harga otomatis terangkum rapi saat masuk ke WhatsApp.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-moss font-bold">✓</span>
                      <span><strong>0% potongan biaya transaksi</strong> — seluruh pembayaran masuk langsung ke rekening Anda.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* KEY FEATURES SECTION */}
          <section
            id="fitur"
            aria-labelledby="fitur-title"
            className="py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Fitur Unggulan
                </span>
                <h2
                  id="fitur-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Dirancang Khusus untuk Memaksimalkan Penjualan Olshop
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/70">
                  Semua fitur yang Anda butuhkan untuk berjualan online dengan lebih teratur, cepat, dan profesional.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <article className="card hover:border-moss/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss/10 text-2xl mb-4 text-moss">
                    📱
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg">
                    Katalog Mobile-First
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    Dirancang seringan kilat untuk pengguna smartphone. Sangat mudah dibuka dari bio Instagram, TikTok, Facebook, maupun tautan status WhatsApp.
                  </p>
                </article>

                {/* Feature 2 */}
                <article className="card hover:border-moss/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-whatsapp/15 text-2xl mb-4 text-whatsapp">
                    💬
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg">
                    Order Otomatis Masuk WA
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    Pembeli memilih produk, klik checkout, dan sistem otomatis membuat draf pesan WhatsApp lengkap dengan nama produk, jumlah, dan total harga.
                  </p>
                </article>

                {/* Feature 3 */}
                <article className="card hover:border-moss/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/10 text-2xl mb-4 text-clay">
                    🏷️
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg">
                    0% Biaya Potongan Komisi
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    Tidak ada biaya per transaksi. Uang hasil jerih payah jualan Anda ditransfer 100% langsung ke rekening atau e-wallet tanpa dipotong pihak manapun.
                  </p>
                </article>

                {/* Feature 4 */}
                <article className="card hover:border-moss/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss/10 text-2xl mb-4 text-moss">
                    🛑
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg">
                    Saklar Toko Buka / Tutup
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    Sedang libur atau kehabisan bahan? Cukup geser satu tombol di dashboard, dan pengunjung akan tahu tokomu sedang tutup sementara.
                  </p>
                </article>

                {/* Feature 5 */}
                <article className="card hover:border-moss/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/10 text-2xl mb-4 text-clay">
                    📊
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg">
                    Statistik &amp; Analitik Toko
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    Ketahui jumlah orang yang berkunjung ke link tokomu dan produk apa yang paling sering dilihat pembeli untuk strategi promosi yang lebih tepat.
                  </p>
                </article>

                {/* Feature 6 */}
                <article className="card hover:border-moss/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss/10 text-2xl mb-4 text-moss">
                    🔗
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg">
                    Tautan Toko Unik &amp; Keren
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    Dapatkan link eksklusif <code>lakubio.id/namatoko</code> yang mudah diingat, tampak kredibel, dan siap dipasang di semua media sosial bisnismu.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section
            id="cara-kerja"
            aria-labelledby="cara-kerja-title"
            className="bg-white py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Alur Mudah
                </span>
                <h2
                  id="cara-kerja-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Bikin Website Toko Online Cuma 3 Langkah
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/70">
                  Tanpa keahlian coding atau desain web. Siapa pun bisa membuat katalog online siap jualan dalam hitungan menit.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3 relative">
                {/* Step 1 */}
                <div className="card relative flex flex-col justify-between border-2 border-line/80 hover:border-moss transition">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-cream font-bold text-base mb-4">
                      1
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      Daftar &amp; Beri Nama Toko
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                      Daftar akun gratis, tuliskan nama tokomu, dan masukkan nomor WhatsApp yang digunakan untuk menerima orderan pelanggan.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-line/50 text-[11px] font-semibold text-moss">
                    ⏱️ Waktu: 1 Menit
                  </div>
                </div>

                {/* Step 2 */}
                <div className="card relative flex flex-col justify-between border-2 border-line/80 hover:border-moss transition">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-cream font-bold text-base mb-4">
                      2
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      Unggah Foto &amp; Harga Produk
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                      Upload foto produk langsung dari galeri HP, beri deskripsi singkat, dan tentukan harga jualnya.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-line/50 text-[11px] font-semibold text-moss">
                    ⏱️ Waktu: 2 Menit
                  </div>
                </div>

                {/* Step 3 */}
                <div className="card relative flex flex-col justify-between border-2 border-line/80 hover:border-moss transition">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-cream font-bold text-base mb-4">
                      3
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      Tempel Link &amp; Siap Jualan
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                      Salin tautan tokomu, pasang di bio Instagram, profil TikTok, atau status WA. Siap-siap terima orderan via WhatsApp!
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-line/50 text-[11px] font-semibold text-moss">
                    ⏱️ Langsung Online!
                  </div>
                </div>
              </div>

              {/* Mid-Page Call to Action */}
              <div className="mt-12 text-center">
                <Link
                  href="/register"
                  className="btn-primary py-3.5 px-8 text-sm sm:text-base font-bold shadow-md"
                >
                  Coba Buat Toko Sekarang — Gratis
                </Link>
              </div>
            </div>
          </section>

          {/* TARGET AUDIENCE / USE CASES SECTION */}
          <section
            id="solusi"
            aria-labelledby="solusi-title"
            className="py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Untuk Berbagai Industri
                </span>
                <h2
                  id="solusi-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Cocok untuk Semua Jenis Bisnis &amp; UMKM
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/70">
                  Apapun produk yang Anda tawarkan, Lakubio membantu merapikan katalog dan mempercepat proses transaksi.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.title}
                    className="card flex items-start gap-3.5 hover:border-moss/50 transition-all"
                  >
                    <span className="text-3xl flex-shrink-0" role="img" aria-label={cat.title}>
                      {cat.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-ink text-sm sm:text-base">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COMPARISON TABLE: Lakubio vs Linktree vs Marketplace */}
          <section
            id="perbandingan"
            aria-labelledby="perbandingan-title"
            className="bg-white py-14 sm:py-20 border-b border-line overflow-hidden"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Kenapa Lakubio Lebih Unggul?
                </span>
                <h2
                  id="perbandingan-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Perbandingan Lakubio vs Solusi Lain
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/70">
                  Lihat mengapa ratusan penjual beralih dari bio link standar dan marketplace konvensional ke Lakubio.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-cream/80 border-b border-line text-ink font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Fitur / Kriteria</th>
                      <th className="p-3.5 sm:p-4 bg-moss/10 text-moss font-bold">
                        ⭐ Lakubio
                      </th>
                      <th className="p-3.5 sm:p-4">Bio Link Standar</th>
                      <th className="p-3.5 sm:p-4">Marketplace Besar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60 bg-white text-ink/80">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-medium text-ink">
                        Katalog Produk dengan Foto &amp; Harga
                      </td>
                      <td className="p-3.5 sm:p-4 bg-moss/5 text-moss font-bold">
                        ✓ Ada &amp; Sangat Rapi
                      </td>
                      <td className="p-3.5 sm:p-4 text-red-500 font-medium">✕ Hanya daftar tombol</td>
                      <td className="p-3.5 sm:p-4 text-moss">✓ Ada</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-medium text-ink">
                        Keranjang Belanja &amp; Order Otomatis WA
                      </td>
                      <td className="p-3.5 sm:p-4 bg-moss/5 text-moss font-bold">
                        ✓ Otomatis Terformat
                      </td>
                      <td className="p-3.5 sm:p-4 text-red-500 font-medium">✕ Tidak ada</td>
                      <td className="p-3.5 sm:p-4 text-red-500 font-medium">✕ Chat terpisah di aplikasi</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-medium text-ink">
                        Potongan Biaya Komisi Penjualan
                      </td>
                      <td className="p-3.5 sm:p-4 bg-moss/5 text-moss font-bold">
                        0% (Gratis Sepenuhnya)
                      </td>
                      <td className="p-3.5 sm:p-4">0% (Tanpa transaksi)</td>
                      <td className="p-3.5 sm:p-4 text-red-500 font-medium">5% &ndash; 12% per transaksi</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-medium text-ink">
                        Perang Harga dengan Toko Sebelah
                      </td>
                      <td className="p-3.5 sm:p-4 bg-moss/5 text-moss font-bold">
                        Bebas (Fokus Toko Anda)
                      </td>
                      <td className="p-3.5 sm:p-4">Bebas</td>
                      <td className="p-3.5 sm:p-4 text-red-500 font-medium">Rentan perang harga rekomendasi</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-medium text-ink">
                        Kemudahan Penggunaan &amp; Setup
                      </td>
                      <td className="p-3.5 sm:p-4 bg-moss/5 text-moss font-bold">
                        3 Menit Lewat HP
                      </td>
                      <td className="p-3.5 sm:p-4">Mudah</td>
                      <td className="p-3.5 sm:p-4 text-red-500 font-medium">Rumit (Verifikasi KTP, dsb.)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* PRICING SECTION */}
          <section
            id="harga"
            aria-labelledby="harga-title"
            className="py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Biaya Transparan
                </span>
                <h2
                  id="harga-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Pilihan Paket Harga yang Terjangkau
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/70">
                  Mulai gratis sekarang. Upgrade kapan saja jika bisnis Anda membutuhkan fitur lebih.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Paket Gratis */}
                <div className="card flex flex-col justify-between border-2 border-line bg-white hover:border-line/90 transition shadow-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-ink/60">
                        Paket Gratis
                      </p>
                      <span className="rounded-full bg-cream border border-line px-2.5 py-0.5 text-[11px] font-semibold text-ink/70">
                        Selamanya
                      </span>
                    </div>
                    <p className="mt-3 font-display text-4xl font-bold text-ink">
                      Rp0
                    </p>
                    <p className="text-xs text-ink/60 mt-1">
                      Cocok untuk pemilik usaha yang baru memulai jualan online
                    </p>

                    <ul className="mt-6 space-y-3 text-xs sm:text-sm text-ink/75 border-t border-line/70 pt-5">
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Sampai dengan <strong>10 Produk</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Link toko resmi: <code>lakubio.id/namatoko</code></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Checkout otomatis langsung ke WhatsApp</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Fitur saklar buka / tutup toko</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span><strong>0% potongan komisi transaksi</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/register"
                      className="btn-secondary w-full py-3 text-xs sm:text-sm font-bold text-center"
                    >
                      Daftar Gratis Sekarang
                    </Link>
                  </div>
                </div>

                {/* Paket Pro */}
                <div className="card relative flex flex-col justify-between border-2 border-moss ring-4 ring-moss/10 bg-gradient-to-b from-moss/5 via-white to-white shadow-lg">
                  <div>
                    <span className="absolute -top-3 right-5 rounded-full bg-moss px-3 py-0.5 text-[11px] font-bold text-cream shadow-sm">
                      Paling Populer 🔥
                    </span>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-moss">
                        Paket Pro UMKM
                      </p>
                    </div>
                    <p className="mt-3 font-display text-4xl font-bold text-ink">
                      Rp45.000
                      <span className="text-sm font-normal text-ink/60"> / bulan</span>
                    </p>
                    <p className="text-xs text-ink/60 mt-1">
                      Untuk bisnis online yang ingin berkembang pesat tanpa batasan
                    </p>

                    <ul className="mt-6 space-y-3 text-xs sm:text-sm text-ink/80 border-t border-line/70 pt-5">
                      <li className="flex items-center gap-2 font-medium text-ink">
                        <span className="text-moss font-bold">✓</span>
                        <span><strong>Produk Tanpa Batas (Unlimited)</strong></span>
                      </li>
                      <li className="flex items-center gap-2 font-medium text-ink">
                        <span className="text-moss font-bold">✓</span>
                        <span>Bebas ubah nama tautan toko kapan saja</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Statistik pengunjung &amp; produk paling diminati</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Tampilan bersih tanpa watermark Lakubio</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-moss font-bold">✓</span>
                        <span>Prioritas bantuan customer support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/register"
                      className="btn-primary w-full py-3 text-xs sm:text-sm font-bold text-center shadow-md"
                    >
                      Mulai Upgrade ke Pro
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS / SOCIAL PROOF */}
          <section
            aria-labelledby="testimoni-title"
            className="bg-white py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Kisah Nyata
                </span>
                <h2
                  id="testimoni-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Dipercaya Ribuan Penjual Online di Seluruh Indonesia
                </h2>
                <p className="mt-3 text-xs sm:text-base text-ink/70">
                  Simak pengalaman mereka yang berhasil menaikkan penjualan dan menghemat waktu berharga.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {/* Testimonial 1 */}
                <div className="card bg-cream/40 flex flex-col justify-between">
                  <div>
                    <div className="text-amber-500 text-sm mb-2" aria-label="Rating 5 Bintang">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <blockquote className="text-xs sm:text-sm text-ink/80 italic leading-relaxed">
                      &ldquo;Dulu tiap ada yang tanya menu brownies di WA, saya repot kirim foto satu-satu sambil ngetik harga. Sejak pasang link Lakubio di bio Instagram, pembeli langsung klik dan pesanan masuk sudah terhitung rapi!&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-moss/20 flex items-center justify-center font-bold text-moss text-xs">
                      RS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">Rina Sulistia</p>
                      <p className="text-[11px] text-ink/60">Owner Dapur Bu Sri — Bandung</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="card bg-cream/40 flex flex-col justify-between">
                  <div>
                    <div className="text-amber-500 text-sm mb-2" aria-label="Rating 5 Bintang">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <blockquote className="text-xs sm:text-sm text-ink/80 italic leading-relaxed">
                      &ldquo;Sangat cocok buat yang jualan di TikTok. Pembeli gak usah bingung cara belinya, tinggal pencet link di bio saya, pilih size baju, langsung terhubung ke WA admin kami tanpa potongan komisi.&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-clay/20 flex items-center justify-center font-bold text-clay text-xs">
                      DF
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">Dimas Fahreza</p>
                      <p className="text-[11px] text-ink/60">Owner Arka Distro — Jakarta</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="card bg-cream/40 flex flex-col justify-between">
                  <div>
                    <div className="text-amber-500 text-sm mb-2" aria-label="Rating 5 Bintang">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <blockquote className="text-xs sm:text-sm text-ink/80 italic leading-relaxed">
                      &ldquo;Awalnya ragu karena saya gaptek banget. Ternyata beneran cuma 3 menit tokonya langsung jadi! Tampilannya bersih, elegan, dan pelanggan saya bilang mudah banget pakainya.&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-moss/20 flex items-center justify-center font-bold text-moss text-xs">
                      SN
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">Siti Nurhaliza</p>
                      <p className="text-[11px] text-ink/60">Owner Hijab Cantik — Surabaya</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION (SEO Rich Snippets Ready) */}
          <section
            id="faq"
            aria-labelledby="faq-title"
            className="py-14 sm:py-20 border-b border-line"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-clay">
                  Pusat Bantuan
                </span>
                <h2
                  id="faq-title"
                  className="font-display text-2xl sm:text-4xl font-bold text-ink mt-1.5"
                >
                  Pertanyaan yang Sering Diajukan (FAQ)
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-ink/70">
                  Punya pertanyaan seputar cara kerja Lakubio? Temukan jawabannya di bawah ini.
                </p>
              </div>

              {/* FAQ Accordion / Details */}
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <details
                    key={index}
                    className="group card transition-all duration-200 open:border-moss/40 open:bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink text-sm sm:text-base list-none select-none">
                      <span>{item.q}</span>
                      <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-cream border border-line text-ink/60 text-xs transition group-open:rotate-180 group-open:bg-moss group-open:text-cream">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-3.5 pt-3 border-t border-line/60 text-xs sm:text-sm text-ink/75 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CALL TO ACTION */}
          <section
            aria-labelledby="cta-title"
            className="bg-ink py-16 sm:py-24 text-center text-cream px-4 sm:px-6 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 h-96 w-96 rounded-full bg-moss/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-cream/90 uppercase tracking-wider mb-4">
                Mulai Hari Ini
              </span>
              <h2
                id="cta-title"
                className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream"
              >
                Siap Bikin Toko Online &amp; Tingkatkan Penjualan Olshopmu?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-cream/80 leading-relaxed">
                Bergabunglah bersama ribuan pebisnis cerdas yang telah beralih ke katalog bio link Lakubio. Bikin toko sekarang, gratis selamanya!
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="btn-primary w-full sm:w-auto bg-moss text-cream px-8 py-3.5 text-base font-bold hover:bg-moss/90 shadow-xl transition active:scale-95"
                >
                  🚀 Buat Toko Gratis Sekarang
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto rounded-full border border-cream/20 bg-cream/10 px-6 py-3.5 text-sm font-semibold text-cream hover:bg-cream/20 transition"
                >
                  Sudah Punya Toko? Masuk
                </Link>
              </div>

              <p className="mt-4 text-xs text-cream/60">
                ✓ Pendaftaran tanpa kartu kredit &bull; Siap dalam 3 menit &bull; 0% biaya potongan komisi
              </p>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-cream border-t border-line text-ink/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {/* Brand Col */}
              <div className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 font-display text-xl font-bold text-moss"
                >
                  <div className="relative h-7 w-7 overflow-hidden rounded-lg shadow-sm flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Lakubio Logo"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <span>Lakubio</span>
                </Link>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Platform bio link katalog toko online no. 1 untuk UMKM &amp; online shop Indonesia. Memudahkan pembeli memesan produk langsung ke WhatsApp.
                </p>
                <p className="text-xs text-ink/50">
                  Dibuat dengan ❤️ untuk kemajuan UMKM Indonesia.
                </p>
              </div>

              {/* Navigation Links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                  Navigasi
                </p>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a href="#fitur" className="hover:text-moss transition">
                      Fitur Unggulan
                    </a>
                  </li>
                  <li>
                    <a href="#cara-kerja" className="hover:text-moss transition">
                      Cara Membuat Toko
                    </a>
                  </li>
                  <li>
                    <a href="#solusi" className="hover:text-moss transition">
                      Solusi Industri
                    </a>
                  </li>
                  <li>
                    <a href="#harga" className="hover:text-moss transition">
                      Paket Harga
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-moss transition">
                      Tanya Jawab (FAQ)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Account Links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                  Akun &amp; Toko
                </p>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/register" className="hover:text-moss transition">
                      Buat Toko Baru
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-moss transition">
                      Masuk ke Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Category / SEO Keywords links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                  Kategori Usaha
                </p>
                <ul className="space-y-2 text-xs text-ink/65">
                  <li>Bio Link Kuliner &amp; Bakery</li>
                  <li>Bio Link Fashion &amp; Hijab</li>
                  <li>Bio Link Skincare &amp; Kosmetik</li>
                  <li>Katalog Reseller &amp; Olshop</li>
                  <li>Katalog Buket &amp; Souvenir</li>
                </ul>
              </div>
            </div>

            {/* Bottom copyright */}
            <div className="mt-10 pt-6 border-t border-line/70 flex flex-col sm:flex-row items-center justify-between text-xs text-ink/50 gap-3">
              <p>
                &copy; {new Date().getFullYear()} Lakubio. Hak Cipta Dilindungi Undang-Undang.
              </p>
              <div className="flex gap-4">
                <span>0% Transaction Fee</span>
                <span>&bull;</span>
                <span>Mobile-First Platform</span>
                <span>&bull;</span>
                <span>WhatsApp Checkout</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
