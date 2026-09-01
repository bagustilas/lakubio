"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 40);
}

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [storeName, setStoreName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuthAndStore() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Coba periksa session
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          setError("Sesi login belum aktif. Silakan login atau periksa email konfirmasi.");
          setAuthChecked(true);
          return;
        }
      }

      // Jika user sudah memiliki toko, langsung arahkan ke dashboard
      if (user) {
        const { data: existingStore } = await supabase
          .from("stores")
          .select("id, name")
          .eq("owner_id", user.id)
          .maybeSingle();

        if (existingStore) {
          router.push("/dashboard");
          return;
        }
      }

      setAuthChecked(true);
    }

    checkAuthAndStore();
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Sesi login kamu berakhir atau belum diverifikasi. Silakan masuk terlebih dahulu.");
      setLoading(false);
      router.push("/login");
      return;
    }

    // Normalisasi nomor WA cerdas (08xxx atau 8xxx -> 628xxx)
    let normalizedWa = whatsapp.replace(/[^0-9]/g, "");
    if (normalizedWa.startsWith("0")) {
      normalizedWa = "62" + normalizedWa.slice(1);
    } else if (normalizedWa.startsWith("8")) {
      normalizedWa = "62" + normalizedWa;
    }

    if (normalizedWa.length < 9) {
      setError("Nomor WhatsApp tidak valid. Masukkan nomor yang benar.");
      setLoading(false);
      return;
    }

    // Cek apakah user sudah memiliki toko sebelumnya (mencegah error unique owner_id)
    const { data: existingStore } = await supabase
      .from("stores")
      .select("id, slug")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (existingStore) {
      const { error: updateError } = await supabase
        .from("stores")
        .update({
          name: storeName.trim(),
          whatsapp_number: normalizedWa,
        })
        .eq("id", existingStore.id);

      if (updateError) {
        setError(`Gagal memperbarui toko: ${updateError.message}`);
        setLoading(false);
        return;
      }

      if (productName.trim()) {
        await supabase.from("products").insert({
          store_id: existingStore.id,
          name: productName.trim(),
          price: Number(productPrice) || 0,
        });
      }

      //setLoading(false);
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // Generate slug tanpa spasi dan tanpa nomor acak di belakangnya (contoh: 'jus buah asli' -> 'jusbuahasli')
    const slug = slugify(storeName) || "tokosaya";

    if (slug.length < 3) {
      setError("Nama toko terlalu pendek. Minimal 3 karakter huruf/angka untuk tautan toko.");
      setLoading(false);
      return;
    }

    const { data: store, error: storeError } = await supabase
      .from("stores")
      .insert({
        owner_id: user.id,
        slug,
        name: storeName.trim(),
        whatsapp_number: normalizedWa,
      })
      .select()
      .single();

    if (storeError || !store) {
      console.error("Gagal membuat toko di Supabase:", storeError);
      setLoading(false);

      if (storeError?.message?.includes("row-level security")) {
        setError(
          "Gagal otorisasi (RLS): Sesi login belum terverifikasi di Supabase. Silakan nonaktifkan 'Confirm email' di Supabase Authentication Settings atau login kembali."
        );
      } else if (storeError?.code === "23505" || storeError?.message?.includes("unique") || storeError?.message?.includes("slug")) {
        setError(`Tautan lakubio.id/${slug} sudah dipakai oleh toko lain. Silakan ubah nama toko agar tautannya unik.`);
      } else {
        setError(`Gagal membuat toko: ${storeError?.message || "Terjadi kesalahan database."}`);
      }
      return;
    }

    // Tambah produk pertama jika diisi
    if (productName.trim()) {
      await supabase.from("products").insert({
        store_id: store.id,
        name: productName.trim(),
        price: Number(productPrice) || 0,
      });
    }

    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

  const previewSlug = storeName ? slugify(storeName) : "nama-toko";

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center mb-6">
        <span className="inline-block rounded-full bg-clay/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-clay">
          Langkah Terakhir
        </span>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink">
          Siapkan Toko Online Kamu
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-ink/60">
          Hanya butuh 2 menit untuk mulai menerima pesanan lewat WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* STEP 1: INFO TOKO */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 border-b border-line/60 pb-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-moss text-xs font-bold text-cream">
              1
            </span>
            <h2 className="font-semibold text-ink text-sm sm:text-base">Informasi Toko</h2>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Nama Toko / Brand <span className="text-clay">*</span>
            </label>
            <input
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="input-field"
              placeholder="Contoh: Kue Bu Sri"
            />
            {storeName && (
              <p className="mt-1.5 text-[11px] text-ink/50">
                Link toko kamu nanti: <span className="font-mono text-moss font-semibold">lakubio.id/{previewSlug}</span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Nomor WhatsApp Pesanan <span className="text-clay">*</span>
            </label>
            <input
              required
              type="tel"
              inputMode="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="input-field"
              placeholder="08123456789 atau 628123456789"
            />
            <p className="mt-1 text-[11px] text-ink/40">
              Pesanan pelanggan akan otomatis masuk ke nomor ini.
            </p>
          </div>
        </div>

        {/* STEP 2: PRODUK PERTAMA */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-moss text-xs font-bold text-cream">
                2
              </span>
              <h2 className="font-semibold text-ink text-sm sm:text-base">Produk Pertama</h2>
            </div>
            <span className="text-xs text-ink/40">(opsional)</span>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Nama Produk
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input-field"
              placeholder="Contoh: Brownies Fudgy Cokelat"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Harga Produk (Rp)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="input-field pl-11"
                placeholder="35000"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-clay/10 border border-clay/30 p-3.5 text-xs font-medium text-clay leading-relaxed">
            <p className="font-bold mb-1">⚠️ Terjadi Kendala:</p>
            <p>{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base shadow-md">
          {loading ? "Menyiapkan tokomu…" : "🚀 Aktifkan Toko Saya"}
        </button>
      </form>
    </main>
  );
}
