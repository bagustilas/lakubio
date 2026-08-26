import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StoreCatalog from "@/components/StoreCatalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: store } = await supabase
    .from("stores")
    .select("name, description, logo_url")
    .eq("slug", slug)
    .single();

  if (!store) {
    return {
      title: "Toko Tidak Ditemukan — Lakubio",
    };
  }

  const title = `${store.name} — Toko Online Resmi`;
  const description =
    store.description ||
    `Lihat katalog produk lengkap dan pesan langsung via WhatsApp di ${store.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: store.logo_url ? [{ url: store.logo_url }] : [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: store.logo_url ? [store.logo_url] : [],
    },
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!store) {
    notFound();
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return <StoreCatalog store={store} products={products ?? []} />;
}
