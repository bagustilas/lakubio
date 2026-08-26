"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function StoreStatusToggle({
  storeId,
  initialIsOpen,
}: {
  storeId: string;
  initialIsOpen: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const next = !isOpen;
    const { error } = await supabase
      .from("stores")
      .update({ is_open: next })
      .eq("id", storeId);

    if (!error) setIsOpen(next);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition active:scale-95 shadow-sm border ${
        isOpen
          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
          : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
        }`}
      />
      <span>{loading ? "Menyimpan…" : isOpen ? "Toko Buka" : "Toko Tutup"}</span>
    </button>
  );
}
