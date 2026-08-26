import Link from "next/link";

export default function StoreNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl text-ink">Toko tidak ditemukan</h1>
      <p className="mt-2 text-sm text-ink/60">
        Link ini mungkin salah ketik atau tokonya sudah tidak aktif.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Buat Toko Kamu Sendiri
      </Link>
    </main>
  );
}
