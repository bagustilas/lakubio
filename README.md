# Lakubio — Scaffold MVP

Scaffold Next.js 14 (App Router) + Supabase untuk produk "storefront builder" —
sesuai dokumen analisa `analisa-bisnis-toko-online-wa-builder.md` (Tahap 8–10).

Yang sudah jadi di scaffold ini (fitur **MUST HAVE** dari dokumen):

- Registrasi & login (Supabase Auth — email/password)
- Onboarding wizard: nama toko → nomor WA → produk pertama
- Dashboard: kelola produk (tambah/lihat/sembunyikan/hapus), toggle toko buka/tutup
- Halaman toko publik `/[slug]` dengan katalog produk + keranjang sederhana
- Tombol **"Pesan via WhatsApp"** yang otomatis mengisi rincian pesanan ke `wa.me`
- Row Level Security di Supabase supaya user hanya bisa mengubah tokonya sendiri

Yang **sengaja belum dibuat** (sesuai "DO NOT BUILD" di dokumen — ditunda sampai
ada traksi nyata): custom domain, QRIS otomatis, multi-admin, AI auto-reply.

---

## 1. Setup Supabase (5–10 menit)

1. Buat project baru di [supabase.com](https://supabase.com) (free tier cukup).
2. Buka **SQL Editor** → tempel seluruh isi file `supabase/schema.sql` → jalankan (Run).
   Ini akan membuat tabel `stores`, `products`, semua RLS policy, dan storage bucket
   `store-assets` untuk foto produk/logo.
3. Buka **Project Settings → API**, salin:
   - `Project URL`
   - `anon public` key

## 2. Setup Project Lokal

```bash
# 1. Install dependencies
npm install

# 2. Salin file env dan isi dengan kredensial Supabase kamu
cp .env.local.example .env.local
# lalu edit .env.local

# 3. Jalankan development server
npm run dev
```

Buka `http://localhost:3000` — landing page akan tampil.

## 3. Alur Uji Coba Manual

1. Klik **"Buat Toko Gratis Sekarang"** → daftar akun baru.
2. Kamu akan diarahkan ke `/onboarding` — isi nama toko, nomor WA, dan produk pertama.
3. Setelah submit, kamu masuk ke `/dashboard` — tambah produk lain lewat **"+ Tambah Produk"**.
4. Buka link toko publik (`/nama-toko-kamu`, terlihat di header dashboard) di tab baru.
5. Pilih produk, tekan **"Pesan via WhatsApp"** → pastikan draf pesan WA terisi otomatis
   dengan rincian pesanan dan mengarah ke nomor WA yang kamu daftarkan.

## 4. Struktur Folder Penting

```
app/
  page.tsx                  -> Landing page
  register/, login/         -> Auth
  onboarding/                -> Wizard setup toko (must have)
  dashboard/                 -> Area yang butuh login
    page.tsx                 -> Daftar produk
    produk/baru/              -> Tambah produk
    pengaturan/               -> Edit profil toko
  [slug]/                    -> Halaman toko publik (dinamis per toko)
lib/supabase/                -> Helper client Supabase (browser & server)
components/                  -> Komponen client (katalog, toggle, dll)
supabase/schema.sql          -> Skema database + RLS, jalankan sekali di Supabase
middleware.ts                -> Proteksi /dashboard & /onboarding, refresh sesi
```

## 5. Deploy (setelah siap go-live)

- **Vercel**: cukup hubungkan repo, isi environment variables yang sama seperti
  `.env.local`. **Catatan:** paket Hobby Vercel tidak diizinkan untuk proyek
  komersial — begitu mulai menerima pembayaran dari user, upgrade ke Pro
  ($20/bulan), atau pertimbangkan **Cloudflare Pages** (gratis, izin komersial
  lebih longgar) sesuai rekomendasi di analisis budget sebelumnya.
- Jangan lupa set custom domain di Supabase Auth → **Redirect URLs** kalau nanti
  pakai domain sendiri, supaya login tidak error.

## 6. Yang Perlu Dikerjakan Berikutnya (bukan bagian scaffold ini)

Sesuai roadmap 30 hari di dokumen analisa:
- Validasi ke calon pengguna (klien template lama) sebelum polish lebih jauh.
- Statistik kunjungan halaman toko (Should Have).
- Custom tema warna yang lebih kaya, ganti tema per toko (Should Have).
- Custom domain per toko (Nice to Have).
