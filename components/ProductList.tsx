"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  price: number;
  photo_url: string | null;
  description: string | null;
  is_active: boolean;
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductList({ products }: { products: Product[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function toggleActive(product: Product) {
    setPendingId(product.id);
    await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);
    setPendingId(null);
    router.refresh();
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(`Hapus produk "${product.name}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!confirmed) return;

    setPendingId(product.id);
    await supabase.from("products").delete().eq("id", product.id);
    setPendingId(null);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className={`card flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all ${
            !product.is_active ? "opacity-75 bg-cream/40" : "bg-white"
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            {/* THUMBNAIL */}
            <div className="relative h-16 w-16 sm:h-14 sm:w-14 flex-shrink-0 overflow-hidden rounded-xl bg-line/60">
              {product.photo_url ? (
                <Image
                  src={product.photo_url}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-medium text-ink/40 bg-cream">
                  Foto
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-ink text-sm sm:text-base truncate">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-xs text-ink/50 line-clamp-1 mt-0.5">
                  {product.description}
                </p>
              )}
              <p className="mt-1 text-sm font-bold text-moss">
                {formatRupiah(product.price)}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t border-line/60 sm:border-t-0 text-xs sm:text-sm">
            {/* TOGGLE VISIBILITY */}
            <button
              type="button"
              disabled={pendingId === product.id}
              onClick={() => toggleActive(product)}
              className={`rounded-full px-3 py-1.5 font-medium transition active:scale-95 flex items-center gap-1.5 ${
                product.is_active
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-ink/5 text-ink/60 border border-line"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  product.is_active ? "bg-emerald-500" : "bg-ink/30"
                }`}
              />
              {product.is_active ? "Tampil" : "Disembunyikan"}
            </button>

            {/* EDIT LINK */}
            <Link
              href={`/dashboard/produk/${product.id}`}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3.5 py-1.5 font-semibold text-ink hover:bg-cream active:scale-95 transition"
            >
              <svg className="w-3.5 h-3.5 text-ink/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </Link>

            {/* DELETE BUTTON */}
            <button
              type="button"
              disabled={pendingId === product.id}
              onClick={() => handleDelete(product)}
              className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50/50 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-100 active:scale-95 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
