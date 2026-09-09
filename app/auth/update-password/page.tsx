"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function verifyRecoverySession() {
      // 1. Cek user session saat ini
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setHasValidSession(true);
        setCheckingSession(false);
        return;
      }

      // 2. Dengarkan event onAuthStateChange (khususnya PASSWORD_RECOVERY dari hash token)
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY" || session) {
          setHasValidSession(true);
        }
        setCheckingSession(false);
      });

      // Timeout pengaman jika tidak ada token recovery
      const timer = setTimeout(() => {
        setCheckingSession(false);
      }, 2500);

      return () => {
        subscription.unsubscribe();
        clearTimeout(timer);
      };
    }

    verifyRecoverySession();
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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
      setError(`Gagal memperbarui kata sandi: ${updateError.message}`);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }

  if (checkingSession) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 text-center">
        <p className="text-sm font-medium text-ink/60 animate-pulse">
          Memverifikasi tautan reset kata sandi…
        </p>
      </main>
    );
  }

  if (!hasValidSession && !success) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 text-center">
        <div className="card space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-2xl text-clay">
            ⚠️
          </div>
          <h1 className="font-display text-xl font-bold text-ink">
            Tautan Reset Tidak Valid atau Kedaluwarsa
          </h1>
          <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
            Tautan reset kata sandi mungkin telah digunakan atau waktu berlakunya telah habis. Silakan minta tautan baru melalui halaman login.
          </p>
          <div className="pt-2">
            <Link href="/login" className="btn-primary w-full text-sm">
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center mb-8">
        <Link href="/" className="font-display text-2xl font-bold text-moss">
          Lakubio
        </Link>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-ink">
          Buat Kata Sandi Baru
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink/60">
          Masukkan kata sandi baru untuk akun tokomu.
        </p>
      </div>

      <div className="card space-y-4">
        {success ? (
          <div className="text-center py-4 space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              ✓
            </div>
            <h2 className="font-display text-lg font-bold text-ink">
              Kata Sandi Berhasil Diperbarui!
            </h2>
            <p className="text-xs text-ink/70">
              Kamu akan dialihkan ke dashboard toko dalam beberapa detik…
            </p>
            <div className="pt-2">
              <Link href="/dashboard" className="btn-primary w-full text-sm">
                Menuju Dashboard Sekarang
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-ink">
                Kata Sandi Baru <span className="text-clay">*</span>
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field pr-11"
                  placeholder="Minimal 6 karakter"
                  autoFocus
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

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-ink">
                Ulangi Kata Sandi Baru <span className="text-clay">*</span>
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Ketik ulang kata sandi baru"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-clay/10 p-3 text-xs font-semibold text-clay">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm font-bold">
              {loading ? "Menyimpan…" : "Simpan Kata Sandi Baru"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
