"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }

  function handleRemovePhoto() {
    setPhotoFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: store } = await supabase
      .from("stores")
      .select("id")
      .eq("owner_id", user!.id)
      .single();

    if (!store) {
      setError("Toko tidak ditemukan.");
      setLoading(false);
      return;
    }

    let photo_url: string | null = null;

    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop() || "jpg";
      const sanitizedName = photoFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${store.id}/${Date.now()}-${sanitizedName}`;
      
      const { data: uploaded, error: uploadError } = await supabase.storage
        .from("store-assets")
        .upload(filePath, photoFile);

      if (!uploadError && uploaded) {
        const { data: publicUrl } = supabase.storage
          .from("store-assets")
          .getPublicUrl(uploaded.path);
        photo_url = publicUrl.publicUrl;
      }
    }

    const { error: insertError } = await supabase.from("products").insert({
      store_id: store.id,
      name: name.trim(),
      price: Number(price) || 0,
      description: description.trim() || null,
      photo_url,
    });

    setLoading(false);

    if (insertError) {
      setError("Gagal menyimpan produk. Coba lagi.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
        <h1 className="font-display text-2xl font-bold text-ink">Tambah Produk</h1>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4">
        {/* FOTO PRODUK */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Foto Produk <span className="font-normal text-ink/40">(opsional)</span>
          </label>

          {previewUrl ? (
            <div className="relative mb-3 h-48 w-full overflow-hidden rounded-2xl border border-line bg-line/30">
              <Image
                src={previewUrl}
                alt="Pratinjau Foto"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 active:scale-90 transition"
                title="Hapus foto"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-cream/30 p-6 text-center hover:bg-cream/60 transition active:scale-[0.99]"
            >
              <svg className="h-8 w-8 text-ink/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs font-semibold text-ink">Ketuk untuk pilih foto</p>
              <p className="text-[11px] text-ink/40 mt-0.5">JPG, PNG, atau WebP</p>
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
            placeholder="Contoh: Brownies Fudgy Cokelat"
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
              placeholder="35000"
            />
          </div>
        </div>

        {/* DESKRIPSI PRODUK */}
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Deskripsi Singkat <span className="font-normal text-ink/40">(opsional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={3}
            placeholder="Contoh: Dibuat dari dark chocolate premium, tahan 7 hari suhu ruang."
          />
        </div>

        {error && (
          <p className="rounded-xl bg-clay/10 p-3 text-xs font-medium text-clay">
            {error}
          </p>
        )}

        {/* SUBMIT BUTTONS */}
        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? "Menyimpan…" : "Simpan Produk"}
          </button>
          <Link
            href="/dashboard"
            className="btn-secondary px-5"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
