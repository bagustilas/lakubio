"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const THEME_PRESETS = [
  { name: "Moss Green", color: "#2F6B4F" },
  { name: "Terracotta", color: "#C9622E" },
  { name: "Midnight Navy", color: "#1E293B" },
  { name: "Royal Purple", color: "#6D28D9" },
  { name: "Rose Berry", color: "#BE185D" },
  { name: "Warm Coffee", color: "#78350F" },
  { name: "Ocean Blue", color: "#0284C7" },
  { name: "Forest", color: "#166534" },
];

export default function StoreSettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [storeId, setStoreId] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
  const [themeColor, setThemeColor] = useState("#2F6B4F");
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadStore() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: store } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", user!.id)
        .single();

      if (store) {
        setStoreId(store.id);
        setSlug(store.slug);
        setIsPro(store.is_pro ?? false);
        setName(store.name);
        setWhatsapp(store.whatsapp_number);
        setDescription(store.description ?? "");
        setThemeColor(store.theme_color ?? "#2F6B4F");
        setExistingLogoUrl(store.logo_url);
      }
      setLoaded(true);
    }
    loadStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    if (file) {
      setLogoPreviewUrl(URL.createObjectURL(file));
    } else {
      setLogoPreviewUrl(null);
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
    if (!storeId) return;

    setLoading(true);
    setMessage(null);

    let normalizedWa = whatsapp.replace(/[^0-9]/g, "");
    if (normalizedWa.startsWith("0")) {
      normalizedWa = "62" + normalizedWa.slice(1);
    } else if (normalizedWa.startsWith("8")) {
      normalizedWa = "62" + normalizedWa;
    }

    let logo_url = existingLogoUrl;

    if (logoFile) {
      const sanitizedName = logoFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${storeId}/logo-${Date.now()}-${sanitizedName}`;
      const { data: uploaded, error: uploadError } = await supabase.storage
        .from("store-assets")
        .upload(filePath, logoFile);

      if (!uploadError && uploaded) {
        const { data: publicUrl } = supabase.storage
          .from("store-assets")
          .getPublicUrl(uploaded.path);
        logo_url = publicUrl.publicUrl;

        // Hapus logo lama dari storage supaya tidak menumpuk
        if (existingLogoUrl) {
          const oldPath = extractStoragePath(existingLogoUrl);
          if (oldPath) {
            await supabase.storage.from("store-assets").remove([oldPath]);
          }
        }
      }
    }

    // Payload dasar yang boleh diubah semua user
    const updatePayload: Record<string, unknown> = {
      name: name.trim(),
      whatsapp_number: normalizedWa,
      description: description.trim() || null,
      theme_color: themeColor,
      logo_url,
    };

    // Slug HANYA disertakan kalau toko sudah Pro — proteksi ganda di luar
    // sekadar `disabled` pada input, supaya request manual ke API pun
    // tidak bisa mengubah slug tanpa status Pro.
    if (isPro) {
      updatePayload.slug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    const { error } = await supabase
      .from("stores")
      .update(updatePayload)
      .eq("id", storeId);

    setLoading(false);
    if (error) {
      setMessage({
        type: "error",
        text:
          error.code === "23505"
            ? "Link ini sudah dipakai toko lain. Coba yang lain."
            : "Gagal menyimpan perubahan. Coba lagi.",
      });
    } else {
      if (isPro) {
        setSlug((updatePayload.slug as string) ?? slug);
      }
      setMessage({ type: "success", text: "Pengaturan toko berhasil disimpan!" });
    }
    router.refresh();
  }

  if (!loaded) {
    return (
      <div className="mx-auto max-w-lg text-center py-12">
        <p className="text-sm font-medium text-ink/50 animate-pulse">Memuat pengaturan…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
          Pengaturan Toko
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-ink/60">
          Ubah informasi profil, logo, nomor WhatsApp, dan tampilan toko kamu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        {/* LOGO TOKO */}
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Logo / Foto Profil Toko
          </label>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-line bg-cream">
              {logoPreviewUrl ? (
                <Image
                  src={logoPreviewUrl}
                  alt="Logo Baru"
                  fill
                  className="object-cover"
                />
              ) : existingLogoUrl ? (
                <Image
                  src={existingLogoUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center font-bold text-white text-xl"
                  style={{ backgroundColor: themeColor }}
                >
                  {name.slice(0, 1).toUpperCase() || "T"}
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="btn-secondary py-2 px-4 text-xs"
              >
                Pilih Logo
              </button>
              <p className="mt-1 text-[11px] text-ink/40">Maksimal 2MB (JPG/PNG)</p>
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </div>
        </div>

        {/* LINK TOKO (SLUG) - FITUR PRO */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-medium text-ink">
              Link toko
            </label>
            {!isPro && (
              <span className="rounded-full bg-clay/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-clay">
                Fitur Pro
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-ink/40">lakubio.id/</span>
            <input
              required
              disabled={!isPro}
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))
              }
              className={`input-field ${!isPro ? "cursor-not-allowed bg-line/40 opacity-70" : ""}`}
            />
          </div>
          {isPro ? (
            <p className="mt-1 text-[11px] text-ink/40">
              Hanya huruf kecil dan angka, tanpa spasi.
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-clay">
              Upgrade ke Pro untuk mengubah link toko kamu.{" "}
              
              <a href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  "Halo, saya mau upgrade ke Lakubio Pro untuk ubah link toko."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                Chat kami untuk upgrade
              </a>
            </p>
          )}
        </div>

        {/* NAMA TOKO */}
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Nama Toko <span className="text-clay">*</span>
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        {/* NOMOR WA */}
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
            placeholder="Contoh: 08123456789 atau 628123456789"
          />
          <p className="mt-1 text-[11px] text-ink/40">
            Format otomatis disesuaikan ke format internasional (+62).
          </p>
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Deskripsi / Bio Toko
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={3}
            placeholder="Jelaskan jenis produk, lokasi pengiriman, atau info operasional tokomu."
          />
        </div>

        {/* WARNA TEMA */}
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Warna Tema Toko
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.color}
                type="button"
                onClick={() => setThemeColor(preset.color)}
                className={`h-9 w-full rounded-xl transition active:scale-95 flex items-center justify-center ${
                  themeColor.toLowerCase() === preset.color.toLowerCase()
                    ? "ring-2 ring-ink ring-offset-2 scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: preset.color }}
                title={preset.name}
              >
                {themeColor.toLowerCase() === preset.color.toLowerCase() && (
                  <span className="text-white text-xs font-bold">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded-lg border border-line bg-transparent"
            />
            <span className="text-xs font-mono text-ink/60">{themeColor}</span>
          </div>
        </div>

        {message && (
          <div
            className={`rounded-xl p-3 text-xs font-semibold ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-clay/10 text-clay"
            }`}
          >
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Menyimpan…" : "Simpan Pengaturan"}
        </button>
      </form>

      {/* PASSWORD UPDATE SECTION */}
      <PasswordSection />
    </div>
  );
}

function PasswordSection() {
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword.length < 6) {
      setError("Kata sandi baru minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setLoading(false);

    if (updateError) {
      setError("Gagal mengubah kata sandi. Coba lagi.");
      return;
    }

    setMessage("Kata sandi berhasil diubah.");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="card space-y-4">
      <h2 className="font-display text-lg font-bold text-ink">Ubah Kata Sandi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Kata Sandi Baru
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Konfirmasi Kata Sandi Baru
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            placeholder="Ulangi kata sandi baru"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-clay/10 p-3 text-xs font-medium text-clay">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200">
            {message}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-secondary w-full">
          {loading ? "Menyimpan…" : "Perbarui Kata Sandi"}
        </button>
      </form>
    </div>
  );
}