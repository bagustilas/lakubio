import Link from "next/link";

const FAQ = [
  {
    q: "Apakah perlu install aplikasi?",
    a: "Tidak. Semua diatur lewat browser ponsel atau laptop. Pelanggan maupun penjual tidak perlu mengunduh aplikasi apa pun.",
  },
  {
    q: "Bisa pakai domain sendiri?",
    a: "Bisa, di paket Pro. Untuk versi gratis, tokomu menggunakan tautan lakubio.id/nama-toko-kamu.",
  },
  {
    q: "Bagaimana cara pelanggan memesan?",
    a: "Pelanggan memilih produk di halaman tokomu, lalu klik tombol 'Pesan via WhatsApp'. Rincian produk dan total harga otomatis terisi ke chat WhatsApp kamu.",
  },
  {
    q: "Apakah ada potongan transaksi?",
    a: "Tidak ada potongan per transaksi sama sekali (0% fee). Pembayaran dilakukan langsung antara pembeli dan penjual via WhatsApp.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-cream text-ink antialiased">
      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3.5">
          <Link href="/" className="font-display text-xl sm:text-2xl font-bold text-moss">
            Lakubio
          </Link>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-ink/70 hover:text-ink px-3 py-2 rounded-full transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="btn-primary py-2 px-4 text-xs sm:text-sm"
            >
              Buat Toko
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-clay mb-4">
          <span className="h-2 w-2 rounded-full bg-clay animate-pulse" />
          Bio Link Katalog untuk UMKM & Olshop
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-ink max-w-3xl mx-auto">
          Satu link katalog. Semua produkmu. <br className="hidden sm:inline" />
          <span className="text-moss">Order langsung masuk WhatsApp.</span>
        </h1>

        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-ink/70 leading-relaxed">
          Jangan biarkan calon pembeli bingung lihat postingan tanpa harga. Buat katalog toko online mobile dalam 3 menit — tanpa coding, langsung jualan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Link
            href="/register"
            className="btn-primary w-full sm:w-auto py-3.5 px-7 text-base shadow-md"
          >
            🚀 Buat Toko Gratis Sekarang
          </Link>
          <a
            href="#cara-kerja"
            className="btn-secondary w-full sm:w-auto py-3.5 px-6 text-sm"
          >
            Lihat Cara Kerjanya
          </a>
        </div>

        {/* MOBILE PREVIEW CARD DEMO */}
        <div className="mt-12 mx-auto max-w-sm rounded-3xl border-4 border-line bg-white p-4 shadow-2xl text-left">
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <div className="h-10 w-10 rounded-full bg-moss flex items-center justify-center font-bold text-cream text-base">
              K
            </div>
            <div>
              <p className="font-display font-bold text-ink text-sm">Kue & Bakery Bu Sri</p>
              <p className="text-[11px] text-moss font-medium">● Buka & Siap Kirim</p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-cream/50 p-2.5 border border-line/60">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink truncate">Brownies Fudgy Cokelat</p>
                <p className="text-xs font-bold text-moss">Rp35.000</p>
              </div>
              <span className="rounded-full bg-moss text-cream text-[11px] font-bold px-2.5 py-1">
                + Tambah
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-cream/50 p-2.5 border border-line/60">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink truncate">Bolu Gulung Pandan Keju</p>
                <p className="text-xs font-bold text-moss">Rp48.000</p>
              </div>
              <span className="rounded-full bg-moss text-cream text-[11px] font-bold px-2.5 py-1">
                + Tambah
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-2 border-t border-line">
            <div className="btn-whatsapp w-full py-2.5 text-xs">
              💬 Pesan via WhatsApp (Otomatis)
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM & VALUE PROP */}
      <section className="border-y border-line bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Jualan lewat DM & WhatsApp sering bikin pusing?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-base text-ink/70 leading-relaxed">
            Harus bolak-balik kirim foto katalog, ketik ulang daftar harga satu per satu, dan hitung total manual? Dengan Lakubio, calon pembeli memilih pesanan sendiri dan pesan WA terformat rapi.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
            <div className="card bg-cream/30">
              <span className="text-2xl mb-2 block">⚡</span>
              <h3 className="font-bold text-ink text-sm sm:text-base">Siap dalam 3 Menit</h3>
              <p className="mt-1 text-xs text-ink/60">Cukup daftar, beri nama toko, dan upload foto produk dari galeri HP.</p>
            </div>
            <div className="card bg-cream/30">
              <span className="text-2xl mb-2 block">📱</span>
              <h3 className="font-bold text-ink text-sm sm:text-base">Ramah Ponsel (Mobile-First)</h3>
              <p className="mt-1 text-xs text-ink/60">Tampilan ringan, super cepat dibuka dari bio Instagram, TikTok, atau status WA.</p>
            </div>
            <div className="card bg-cream/30">
              <span className="text-2xl mb-2 block">💬</span>
              <h3 className="font-bold text-ink text-sm sm:text-base">Langsung ke Chat WA</h3>
              <p className="mt-1 text-xs text-ink/60">Daftar item belanja & total harga otomatis tertata rapi saat pembeli klik pesan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-clay">Langkah Mudah</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
            Tiga langkah, toko langsung online
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1. Daftar & Buat Toko",
              desc: "Isi nama tokomu dan masukkan nomor WhatsApp untuk menerima order.",
            },
            {
              step: "2. Masukkan Produk",
              desc: "Upload foto, beri nama, dan tuliskan harga produk yang kamu jual.",
            },
            {
              step: "3. Tempel Link di Bio",
              desc: "Salin link lakubio.id/tokomu dan pasang di bio Instagram & TikTok.",
            },
          ].map((item) => (
            <div key={item.step} className="card">
              <h3 className="font-display text-base font-bold text-moss">{item.step}</h3>
              <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="border-y border-line bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Pilihan Paket Harga
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink/60">Tanpa potongan per penjualan (0% transaction fee)</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Paket Gratis</p>
                <p className="mt-1 font-display text-3xl font-bold text-ink">Rp0</p>
                <p className="text-xs text-ink/50 mt-0.5">Gratis selamanya</p>
                <ul className="mt-5 space-y-2 text-xs sm:text-sm text-ink/70 border-t border-line/60 pt-4">
                  <li className="flex items-center gap-2">✓ Sampai 10 produk</li>
                  <li className="flex items-center gap-2">✓ Link lakubio.id/toko-kamu</li>
                  <li className="flex items-center gap-2">✓ Checkout otomatis ke WhatsApp</li>
                  <li className="flex items-center gap-2">✓ Toggle toko buka / tutup</li>
                </ul>
              </div>
              <div className="mt-6">
                <Link href="/register" className="btn-secondary w-full">
                  Mulai Gratis
                </Link>
              </div>
            </div>

            <div className="card border-moss ring-2 ring-moss/30 flex flex-col justify-between relative bg-gradient-to-b from-moss/5 to-white">
              <div>
                <span className="absolute top-3.5 right-3.5 rounded-full bg-moss px-2.5 py-0.5 text-[10px] font-bold text-cream">
                  Populer
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-moss">Paket Pro</p>
                <p className="mt-1 font-display text-3xl font-bold text-ink">
                  Rp45.000<span className="text-sm font-normal text-ink/50"> / bulan</span>
                </p>
                <p className="text-xs text-ink/50 mt-0.5">Untuk bisnis yang sedang berkembang</p>
                <ul className="mt-5 space-y-2 text-xs sm:text-sm text-ink/70 border-t border-line/60 pt-4">
                  <li className="flex items-center gap-2 font-medium text-ink">✓ Produk tanpa batas</li>
                  <li className="flex items-center gap-2 font-medium text-ink">✓ Bebas ganti link toko kapan saja</li>
                  <li className="flex items-center gap-2">✓ Tanpa watermark Lakubio</li>
                  <li className="flex items-center gap-2">✓ Statistik pengunjung toko</li>
                </ul>
              </div>
              <div className="mt-6">
                <Link href="/register" className="btn-primary w-full">
                  Upgrade Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-bold text-ink">
          Tanya Jawab (FAQ)
        </h2>
        <div className="mt-8 space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="card">
              <h3 className="font-semibold text-ink text-sm sm:text-base">{item.q}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-ink/70 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-ink py-12 sm:py-16 text-center text-cream px-4">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          Siap tampil lebih profesional di hadapan pelanggan?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-cream/70">
          Buat katalog toko bio link kamu hari ini juga dalam hitungan menit.
        </p>
        <div className="mt-6">
          <Link href="/register" className="btn-primary bg-moss text-cream px-8 py-3.5 text-base hover:bg-moss/90">
            Buat Toko Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-ink/50 border-t border-line/60 bg-cream">
        © {new Date().getFullYear()} Lakubio. Platform Bio Link Katalog UMKM Indonesia.
      </footer>
    </main>
  );
}
