"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function MobileBottomNav({ storeSlug }: { storeSlug: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isProducts = pathname === "/dashboard" || pathname.startsWith("/dashboard/produk");
  const isAnalytics = pathname === "/dashboard/statistik";
  const isSettings = pathname === "/dashboard/pengaturan";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-white/95 backdrop-blur-md px-2 pt-2 pb-safe sm:hidden shadow-floating">
      <nav className="flex items-center justify-around">
        {/* Produk Tab */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            isProducts ? "text-moss font-semibold" : "text-ink/60 hover:text-ink"
          }`}
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isProducts ? 2.2 : 1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span className="text-[11px]">Produk</span>
        </Link>

        {/* Statistik Tab */}
        <Link
          href="/dashboard/statistik"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            isAnalytics ? "text-moss font-semibold" : "text-ink/60 hover:text-ink"
          }`}
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isAnalytics ? 2.2 : 1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-[11px]">Statistik</span>
        </Link>

        {/* Pengaturan Tab */}
        <Link
          href="/dashboard/pengaturan"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
            isSettings ? "text-moss font-semibold" : "text-ink/60 hover:text-ink"
          }`}
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isSettings ? 2.2 : 1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-[11px]">Pengaturan</span>
        </Link>

        {/* Lihat Toko Publik Tab */}
        <Link
          href={`/${storeSlug}`}
          target="_blank"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-ink/60 hover:text-moss transition"
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span className="text-[11px]">Buka Toko</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          type="button"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-clay hover:opacity-80 transition"
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-[11px]">Keluar</span>
        </button>
      </nav>
    </div>
  );
}
