"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storeId, setStoreId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.productId)
        .single();

      if (!product) {
        setNotFound(true);
        setLoaded(true);
        return;
      }

      setStoreId(product.store_id);
      setName(product.name);
      setPrice(String(product.price));
      setDescription(product.description ?? "");
      setExistingPhotoUrl(product.photo_url);
      setLoaded(true);
    }
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.productId]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  }

  function handleRemoveNewPhoto() {
    setPhotoFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Ambil path relatif dari public URL Supabase Storage,
  // supaya bisa dipakai untuk menghapus file lama.
  function extractStoragePath(publicUrl: string): string | null {
    const marker = "/store-assets/";
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return publicUrl.slice(idx + marker.length);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let photo_url = existingPhotoUrl;

    if (photoFile && storeId) {
      const filePath = `${storeId}/${Date.now()}-${photoFile.name}`;
      const { data: uploaded, error: uploadError } = await supabase.storage
        .from("store-assets")
        .upload(filePath, photoFile);

      if (!uploadError && uploaded) {
        const { data: publicUrl } = supabase.storage
          .from("store-assets")
          .getPublicUrl(uploaded.path);
        photo_url = publicUrl.publicUrl;

        // Hapus foto lama dari storage supaya tidak menumpuk
        if (existingPhotoUrl) {
          const oldPath = extractStoragePath(existingPhotoUrl);
          if (oldPath) {
            await supabase.storage.from("store-assets").remove([oldPath]);
          }
        }
      }
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({
        name: name.trim(),
        price: Number(price) || 0,
        description: description.trim() || null,
        photo_url,
      })
      .eq("id", params.productId);

    setLoading(false);

    if (updateError) {
      setError("Gagal menyimpan perubahan. Coba lagi.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (!loaded) {
    return (
      <div className="mx-auto max-w-lg text-center py-12">
        <p className="text-sm font-medium text-ink/50 animate-pulse">Memuat produk…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg text-center py-12">
        <div className="card">
          <p className="text-ink font-semibold">Produk tidak ditemukan</p>
          <p className="mt-1 text-xs text-ink/60">Produk mungkin sudah dihapus atau tidak tersedia.</p>
          <Link href="/dashboard" className="btn-primary mt-4 inline-flex">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/dashboard"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/70 hover:text-ink active:scale-95 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="font-display text-2xl font-bold text-ink">Edit Produk</h1>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4">
        {/* FOTO PRODUK */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Foto Produk
          </label>

          {previewUrl ? (
            <div className="relative mb-3 h-48 w-full overflow-hidden rounded-2xl border border-line bg-line/30">
              <Image
                src={previewUrl}
                alt="Foto Baru"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveNewPhoto}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : existingPhotoUrl ? (
            <div className="relative mb-3 h-48 w-full overflow-hidden rounded-2xl border border-line bg-line/30">
              <Image
                src={existingPhotoUrl}
                alt={name}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm hover:bg-ink transition"
              >
                Ganti Foto
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-cream/30 p-6 text-center hover:bg-cream/60 transition"
            >
              <svg className="h-8 w-8 text-ink/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs font-semibold text-ink">Ketuk untuk unggah foto</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* NAMA PRODUK */}
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Nama Produk <span className="text-clay">*</span>
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        {/* HARGA PRODUK */}
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Harga Produk (Rp) <span className="text-clay">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              inputMode="numeric"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field pl-11 font-medium"
            />
          </div>
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Deskripsi Singkat <span className="font-normal text-ink/40">(opsional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={3}
          />
        </div>

        {error && (
          <p className="rounded-xl bg-clay/10 p-3 text-xs font-medium text-clay">
            {error}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? "Menyimpan…" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="btn-secondary px-5"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
