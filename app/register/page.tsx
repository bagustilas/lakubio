"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfoMessage(null);

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setLoading(false);
      if (signUpError.message === "User already registered") {
        setError("Email ini sudah terdaftar. Silakan masuk lewat halaman login.");
      } else if (signUpError.message?.toLowerCase().includes("rate limit")) {
        setError("Batas pengiriman email Supabase terlampaui. Matikan 'Confirm email' di Supabase Authentication Settings atau coba lagi beberapa saat lagi.");
      } else {
        setError(`Pendaftaran gagal: ${signUpError.message}`);
      }
      return;
    }

    // Jika Supabase mengembalikan session langsung (Confirm email OFF)
    if (data?.session) {
      setLoading(false);
      router.push("/onboarding");
      router.refresh();
      return;
    }

    // Coba login otomatis jika user dibuat
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInData?.session) {
      router.push("/onboarding");
      router.refresh();
      return;
    }

    // Jika email konfirmasi aktif di Supabase
    if (signInError?.message?.toLowerCase().includes("email not confirmed")) {
      setInfoMessage(
        "Pendaftaran berhasil! Tautan konfirmasi telah dikirim ke email kamu. Silakan periksa inbox (atau nonaktifkan 'Confirm email' di dashboard Supabase -> Auth -> Providers -> Email untuk registrasi instan tanpa verifikasi email)."
      );
    } else {
      router.push("/onboarding");
      router.refresh();
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center mb-8">
        <Link href="/" className="font-display text-2xl font-bold text-moss">
          Lakubio
        </Link>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-ink">
          Mulai Buat Toko Gratis
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink/60">
          Sudah punya akun toko?{" "}
          <Link href="/login" className="font-semibold text-moss underline">
            Masuk di sini
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
            Email Bisnis / Pribadi
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="nama@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
            Kata Sandi
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-11"
              placeholder="Minimal 6 karakter"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-ink/40 hover:text-ink transition"
              title={showPassword ? "Sembunyikan" : "Tampilkan"}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-clay/10 p-3 text-xs font-semibold text-clay">
            {error}
          </p>
        )}

        {infoMessage && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-900 leading-relaxed">
            {infoMessage}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
          {loading ? "Mendaftarkan…" : "Daftar & Lanjut Bikin Toko"}
        </button>

        <p className="text-center text-[11px] text-ink/40">
          Dengan mendaftar, Anda menyetujui ketentuan layanan & kebijakan privasi Lakubio.
        </p>
      </form>
    </main>
  );
}
