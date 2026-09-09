"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "reset-code-invalid") {
      setError("Tautan reset kata sandi tidak valid atau telah kedaluwarsa. Silakan ajukan reset kembali.");
      setMode("forgot");
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setLoading(false);
      setError("Email atau kata sandi salah. Coba lagi.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Masukkan alamat email yang terdaftar.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const siteUrl = window.location.origin;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${siteUrl}/auth/callback?next=/auth/update-password`,
      }
    );

    setLoading(false);

    if (resetError) {
      if (resetError.message?.toLowerCase().includes("rate limit")) {
        setError(
          "Terlalu banyak permintaan reset kata sandi. Tunggu beberapa menit sebelum mencoba lagi."
        );
      } else {
        setError(`Gagal mengirim email reset: ${resetError.message}`);
      }
      return;
    }

    setSuccessMessage(
      `Tautan untuk mengatur ulang kata sandi telah dikirim ke ${email.trim()}. Silakan periksa kotak masuk (inbox) atau folder spam emailmu.`
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center mb-8">
        <Link href="/" className="font-display text-2xl font-bold text-moss">
          Lakubio
        </Link>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-ink">
          {mode === "login" ? "Masuk ke Akun Toko" : "Lupa Kata Sandi"}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink/60">
          {mode === "login" ? (
            <>
              Belum punya toko?{" "}
              <Link href="/register" className="font-semibold text-moss underline">
                Daftar gratis di sini
              </Link>
            </>
          ) : (
            "Masukkan email tokomu untuk menerima tautan reset kata sandi."
          )}
        </p>
      </div>

      {mode === "login" ? (
        /* FORM LOGIN */
        <form onSubmit={handleLogin} className="card space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
              Email
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
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-ink">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-xs font-semibold text-moss hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-11"
                placeholder="••••••••"
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

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base font-bold">
            {loading ? "Memproses…" : "Masuk"}
          </button>
        </form>
      ) : (
        /* FORM LUPA KATA SANDI */
        <div className="card space-y-4">
          {successMessage ? (
            <div className="space-y-4 text-center py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                ✉️
              </div>
              <h2 className="font-display text-lg font-bold text-ink">
                Tautan Reset Terkirim
              </h2>
              <p className="text-xs text-ink/75 leading-relaxed">
                {successMessage}
              </p>
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="btn-secondary w-full py-2.5 text-xs font-semibold"
                >
                  {loading ? "Mengirim ulang…" : "Kirim Ulang Email"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="w-full text-xs font-semibold text-ink/70 hover:text-moss py-2 transition"
                >
                  ← Kembali ke Halaman Masuk
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="resetEmail" className="mb-1 block text-sm font-medium text-ink">
                  Email Akun Toko <span className="text-clay">*</span>
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="nama@email.com"
                  autoFocus
                />
                <p className="mt-1 text-[11px] text-ink/50">
                  Kami akan mengirimkan tautan verifikasi ke email ini.
                </p>
              </div>

              {error && (
                <p className="rounded-xl bg-clay/10 p-3 text-xs font-semibold text-clay">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm font-bold"
              >
                {loading ? "Mengirim Tautan…" : "Kirim Tautan Reset Kata Sandi"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="w-full text-center text-xs font-semibold text-ink/70 hover:text-moss py-2 transition"
              >
                ← Kembali ke Halaman Masuk
              </button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 text-center">
          <p className="text-sm font-medium text-ink/50 animate-pulse">Memuat…</p>
        </main>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
