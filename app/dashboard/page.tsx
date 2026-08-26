import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductList from "@/components/ProductList";
import StoreStatusToggle from "@/components/StoreStatusToggle";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("owner_id", user!.id)
    .single();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store!.id)
    .order("created_at", { ascending: false });

  const { count: totalViewsCount } = await supabase
    .from("store_views")
    .select("*", { count: "exact", head: true })
    .eq("store_id", store!.id);

  const activeCount = products?.filter((p) => p.is_active).length ?? 0;
  const totalCount = products?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Katalog Produk
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ink/60">
            {totalCount} total produk ({activeCount} aktif tampil di toko)
          </p>
        </div>

        {/* STATUS & ADD BUTTON */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <StoreStatusToggle storeId={store!.id} initialIsOpen={store!.is_open} />
          <Link
            href="/dashboard/produk/baru"
            className="btn-primary py-2 px-4 text-xs sm:text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Tambah Produk</span>
          </Link>
        </div>
      </div>

      {/* QUICK ANALYTICS TEASER CARD */}
      <Link
        href="/dashboard/statistik"
        className="card relative overflow-hidden block border-line hover:border-moss/40 transition group active:scale-[0.99]"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss/10 text-moss group-hover:bg-moss group-hover:text-cream transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink text-sm">Statistik Pengunjung Toko</p>
                {!store!.is_pro && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-300">
                    🔒 Fitur Pro
                  </span>
                )}
              </div>
              <p className="text-xs text-ink/60 mt-0.5">
                {store!.is_pro
                  ? `${totalViewsCount ?? 0} total pengunjung tercatat · Klik untuk lihat grafik tren harian ↗`
                  : "Pantau jumlah pengunjung & sumber trafik pembeli tokomu ↗"}
              </p>
            </div>
          </div>
          <span className="text-moss text-xs font-bold hidden sm:inline group-hover:underline">
            Lihat Analitik →
          </span>
        </div>
      </Link>

      {/* PRODUCT LIST */}
      <div>
        {products && products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="card text-center py-12 px-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-moss/10 text-moss">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="font-display text-lg font-bold text-ink">Belum ada produk</h2>
            <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm text-ink/60">
              Tambahkan produk pertamamu supaya pelanggan bisa langsung melihat katalog dan melakukan pemesanan via WhatsApp.
            </p>
            <div className="mt-6">
              <Link href="/dashboard/produk/baru" className="btn-primary">
                + Tambah Produk Pertama
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
