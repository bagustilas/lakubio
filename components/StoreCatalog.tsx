"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Store = {
  id: string;
  name: string;
  slug?: string;
  whatsapp_number: string;
  description: string | null;
  logo_url: string | null;
  theme_color: string | null;
  is_open: boolean;
  is_pro: boolean;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  photo_url: string | null;
};

const PAYMENT_METHODS = ["Transfer Bank", "QRIS", "COD (Bayar di Tempat)"];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildWhatsAppMessage(
  storeName: string,
  cart: Record<string, number>,
  products: Product[],
  customer: {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
  }
) {
  const lines = [`Halo *${storeName}*, saya ingin memesan:`, ""];

  let total = 0;
  for (const product of products) {
    const qty = cart[product.id] ?? 0;
    if (qty <= 0) continue;
    const subtotal = qty * product.price;
    total += subtotal;
    lines.push(`• *${product.name}* x${qty} — ${formatRupiah(subtotal)}`);
  }

  lines.push(
    "",
    `*Total Belanja:* ${formatRupiah(total)}`,
    "",
    "*Data Pemesan:*",
    `Nama: ${customer.name}`,
    `No. HP: ${customer.phone}`,
    `Alamat: ${customer.address}`,
    `Metode Pembayaran: ${customer.paymentMethod}`,
    "",
    "Mohon konfirmasi ketersediaan & ongkir ya. Terima kasih!"
  );

  return lines.join("\n");
}

export default function StoreCatalog({
  store,
  products,
}: {
  store: Store;
  products: Product[];
}) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sessionKey = `visited_store_${store.id}`;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, "1");

        // 1. Cek query param ?ref=tiktok dulu (paling reliable)
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get("ref") || urlParams.get("utm_source");

        // 2. Fallback ke document.referrer kalau tidak ada ref param
        const documentReferrer =
          typeof document !== "undefined" ? document.referrer : null;

        // 3. Tentukan sumber final
        const source = refParam || documentReferrer || null;

        fetch(`/api/views/${store.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referrer: documentReferrer,
            source: source, // sumber yang lebih reliable
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log("response dari /api/views:", data))
          .catch(() => {});
      }
    } catch {
      // Ignore sessionStorage exceptions
    }
  }, [store.id]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  const itemCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const total = useMemo(
    () =>
      products.reduce((sum, product) => sum + (cart[product.id] ?? 0) * product.price, 0),
    [cart, products]
  );

  function updateQty(productId: string, delta: number) {
    setCart((prev) => {
      const current = prev[productId] ?? 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: next };
    });
  }

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: store.name,
          text: store.description || `Katalog belanja di ${store.name}`,
          url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Tautan toko berhasil disalin!");
      } catch {
        showToast("Gagal menyalin tautan");
      }
    }
  }

  function handleOpenCheckoutForm() {
    setFormError(null);
    setShowCheckoutForm(true);
  }

  function handleConfirmCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setFormError("Nama, No. HP, dan Alamat wajib diisi.");
      return;
    }

    const message = buildWhatsAppMessage(store.name, cart, products, {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: customerAddress.trim(),
      paymentMethod,
    });

    const waLink = `https://wa.me/${store.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank", "noopener,noreferrer");
    setShowCheckoutForm(false);
  }

  const waDirectChatLink = `https://wa.me/${store.whatsapp_number}?text=${encodeURIComponent(
    `Halo ${store.name}, saya ingin bertanya seputar produk Anda.`
  )}`;

  const accentColor = store.theme_color || "#2F6B4F";

  return (
    <main
      className="min-h-screen bg-[#FBF7F0] pb-32 text-ink antialiased"
      style={{ ["--store-accent" as string]: accentColor }}
    >
      {toastMessage && (
        <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 transition-all">
          <div className="rounded-full bg-ink/90 text-cream px-5 py-2.5 text-xs font-medium shadow-lg backdrop-blur-sm animate-bounce">
            {toastMessage}
          </div>
        </div>
      )}

      <header className="relative border-b border-line bg-white px-5 pt-8 pb-6 text-center shadow-sm">
        <div className="mx-auto max-w-md">
          <div className="relative mx-auto mb-3 h-20 w-20">
            {store.logo_url ? (
              <Image
                src={store.logo_url}
                alt={store.name}
                width={80}
                height={80}
                priority
                className="h-full w-full rounded-full object-cover ring-4 ring-line/50" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center rounded-full text-2xl font-bold text-white shadow-inner"
                style={{ backgroundColor: accentColor }}
              >
                {store.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            {store.is_open && (
              <span
                className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white bg-green-500"
                title="Toko Buka" />
            )}
          </div>

          <h1 className="font-display text-2xl font-bold text-ink">{store.name}</h1>

          {store.description && (
            <p className="mt-1.5 text-sm text-ink/70 line-clamp-3 leading-relaxed">
              {store.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {store.is_open ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Buka & Siap Kirim
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Toko Sedang Tutup
              </span>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream/60 px-3 py-1 text-xs font-medium text-ink hover:bg-cream active:scale-95 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>


            <a href={waDirectChatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100 active:scale-95 transition"
            >
            <svg className="w-3.5 h-3.5 text-whatsapp" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Chat WA
          </a>
        </div>
      </div>
    </header>
    <section className="mx-auto max-w-md px-4 py-5">
        {products.length > 3 && (
          <div className="relative mb-4">
            <svg
              className="absolute left-3.5 top-3.5 h-4 w-4 text-ink/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk di toko ini…"
              className="w-full rounded-2xl border border-line bg-white pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink/40 shadow-sm focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20" />
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="card text-center py-10 mt-2">
            <p className="text-sm font-medium text-ink/70">
              {searchQuery ? "Tidak ada produk yang cocok dengan pencarian." : "Belum ada produk yang ditampilkan di toko ini."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-semibold text-moss underline"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => {
              const qty = cart[product.id] ?? 0;
              return (
                <div
                  key={product.id}
                  className={`card transition-all flex items-center gap-3.5 p-3.5 ${qty > 0 ? "ring-2 ring-moss/30 bg-white" : "bg-white"}`}
                >
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-line/50"
                  >
                    {product.photo_url ? (
                      <Image
                        src={product.photo_url}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover transition-transform hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-medium text-ink/40 bg-cream">
                        Foto
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-semibold text-ink text-sm sm:text-base leading-snug cursor-pointer truncate hover:text-moss"
                    >
                      {product.name}
                    </h3>
                    {product.description && (
                      <p
                        onClick={() => setSelectedProduct(product)}
                        className="mt-0.5 text-xs text-ink/60 line-clamp-1 cursor-pointer"
                      >
                        {product.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-bold text-moss">
                      {formatRupiah(product.price)}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {qty === 0 ? (
                      <button
                        type="button"
                        disabled={!store.is_open}
                        onClick={() => updateQty(product.id, 1)}
                        className="h-9 px-3.5 rounded-full border border-moss/30 bg-moss/5 text-xs font-bold text-moss hover:bg-moss hover:text-cream active:scale-95 transition"
                      >
                        + Tambah
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-cream/70 border border-line rounded-full p-1">
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, -1)}
                          className="h-7 w-7 rounded-full bg-white text-ink text-sm font-bold flex items-center justify-center shadow-sm active:scale-90 transition"
                          aria-label={`Kurangi ${product.name}`}
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-ink">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, 1)}
                          className="h-7 w-7 rounded-full bg-moss text-cream text-sm font-bold flex items-center justify-center shadow-sm active:scale-90 transition"
                          aria-label={`Tambah ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-5 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase tracking-widest text-ink/40 font-semibold">
                Detail Produk
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="h-8 w-8 rounded-full bg-cream text-ink/70 flex items-center justify-center hover:text-ink"
              >
                ✕
              </button>
            </div>

            {selectedProduct.photo_url && (
              <div className="relative mb-4 h-56 w-full overflow-hidden rounded-2xl bg-line">
                <Image
                  src={selectedProduct.photo_url}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="font-display text-xl font-bold text-ink">
              {selectedProduct.name}
            </h2>
            <p className="mt-1 text-lg font-bold text-moss">
              {formatRupiah(selectedProduct.price)}
            </p>

            {selectedProduct.description ? (
              <div className="mt-4 border-t border-line/60 pt-3">
                <p className="text-xs font-semibold text-ink/50 mb-1">Deskripsi:</p>
                <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">
                  {selectedProduct.description}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-xs text-ink/40 italic">Tidak ada deskripsi tambahan.</p>
            )}

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
              <div>
                <p className="text-xs text-ink/50">Di keranjang:</p>
                <p className="font-bold text-ink text-sm">
                  {cart[selectedProduct.id] ?? 0} item
                </p>
              </div>
              <div className="flex items-center gap-2">
                {(cart[selectedProduct.id] ?? 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => updateQty(selectedProduct.id, -1)}
                    className="h-10 w-10 rounded-full border border-line bg-cream font-bold text-ink flex items-center justify-center active:scale-95"
                  >
                    −
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => updateQty(selectedProduct.id, 1)}
                  className="btn-primary py-2.5 px-6"
                >
                  + Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCheckoutForm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm"
          onClick={() => setShowCheckoutForm(false)}
        >
          <form
            onSubmit={handleConfirmCheckout}
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-ink/40 font-semibold">
                Data Pemesan
              </span>
              <button
                type="button"
                onClick={() => setShowCheckoutForm(false)}
                className="h-8 w-8 rounded-full bg-cream text-ink/70 flex items-center justify-center hover:text-ink"
              >
                ✕
              </button>
            </div>

            <h2 className="font-display text-lg font-bold text-ink mb-4">
              Lengkapi data sebelum pesan
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Nama Lengkap <span className="text-clay">*</span>
                </label>
                <input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input-field"
                  placeholder="Nama kamu"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  No. HP / WhatsApp <span className="text-clay">*</span>
                </label>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="input-field"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Alamat Pengiriman <span className="text-clay">*</span>
                </label>
                <textarea
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Jalan, nomor rumah, kelurahan, kecamatan, kota"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Metode Pembayaran
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm cursor-pointer transition ${
                        paymentMethod === method
                          ? "border-moss bg-moss/5 font-semibold text-moss"
                          : "border-line text-ink/70"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-moss"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {formError && (
                <p className="rounded-xl bg-clay/10 p-3 text-xs font-medium text-clay">
                  {formError}
                </p>
              )}

              <div className="border-t border-line pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink/50">Total Belanja</p>
                  <p className="font-display text-lg font-bold text-ink">
                    {formatRupiah(total)}
                  </p>
                </div>
                <button type="submit" className="btn-whatsapp py-3 px-6 font-bold">
                  Lanjut ke WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {itemCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md px-4 pt-3 pb-safe shadow-floating">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-moss text-[10px] font-bold text-cream">
                  {itemCount}
                </span>
                <span className="text-xs font-medium text-ink/60">Total</span>
              </div>
              <p className="font-display text-base font-bold text-ink leading-tight">
                {formatRupiah(total)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCheckoutForm}
              className="btn-whatsapp flex-1 max-w-[230px]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Pesan via WA</span>
            </button>
          </div>
        </div>
      )}
   </section>
      {!store.is_pro && (
        <footer className="mt-12 py-6 text-center text-xs text-ink/40">
          Ditenagai oleh{" "}
          <a href="/" className="font-semibold text-moss hover:underline">
            Lakubio
          </a>{" "}
          — Bikin Toko Online Mudah
        </footer>
      )}
    </main>
  );
}