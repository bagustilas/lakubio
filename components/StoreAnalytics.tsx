"use client";

import { useMemo, useState } from "react";

type Store = {
  id: string;
  name: string;
  is_pro: boolean;
  whatsapp_number?: string;
};

type ViewRecord = {
  id: string;
  created_at: string;
  referrer?: string | null;
};

const SAMPLE_VIEWS: ViewRecord[] = [
  { id: "1", created_at: new Date(Date.now() - 6 * 86400000).toISOString(), referrer: "instagram.com" },
  { id: "2", created_at: new Date(Date.now() - 5 * 86400000).toISOString(), referrer: "tiktok.com" },
  { id: "3", created_at: new Date(Date.now() - 4 * 86400000).toISOString(), referrer: "whatsapp" },
  { id: "4", created_at: new Date(Date.now() - 3 * 86400000).toISOString(), referrer: "instagram.com" },
  { id: "5", created_at: new Date(Date.now() - 2 * 86400000).toISOString(), referrer: "instagram.com" },
  { id: "6", created_at: new Date(Date.now() - 1 * 86400000).toISOString(), referrer: "direct" },
  { id: "7", created_at: new Date().toISOString(), referrer: "instagram.com" },
  { id: "8", created_at: new Date().toISOString(), referrer: "whatsapp" },
];

export default function StoreAnalytics({
  store,
  views,
}: {
  store: Store;
  views: ViewRecord[];
}) {
  const [demoPro, setDemoPro] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const isPro = store.is_pro || demoPro;

  const { totalViews, todayViews, weekViews, chartDays, referrers } = useMemo(() => {
    // Selama toko belum Pro, selalu pakai data dummy (baik masih di-blur
    // maupun saat user klik "Pratinjau Pro"). Data asli baru dipakai
    // begitu toko benar-benar sudah Pro.
    const effectiveViews = store.is_pro ? views : SAMPLE_VIEWS;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let todayCount = 0;
    let weekCount = 0;
    const dayMap: Record<string, number> = {};
    const refMap: Record<string, number> = {
      Instagram: 0,
      TikTok: 0,
      WhatsApp: 0,
      "Tautan Langsung / Lainnya": 0,
    };

    const daysList: { label: string; date: string; count: number }[] = [];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = d.toISOString().slice(0, 10);
      const label = `${dayNames[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
      dayMap[dateKey] = 0;
      daysList.push({ label, date: dateKey, count: 0 });
    }

    effectiveViews.forEach((v) => {
      const vDate = new Date(v.created_at);
      const vDateStr = vDate.toISOString().slice(0, 10);

      if (vDateStr === todayStr) todayCount++;
      if (vDate >= sevenDaysAgo) weekCount++;

      if (dayMap[vDateStr] !== undefined) {
        dayMap[vDateStr]++;
      }

      const ref = (v.referrer || "").toLowerCase();
      if (ref.includes("instagram")) refMap["Instagram"]++;
      else if (ref.includes("tiktok")) refMap["TikTok"]++;
      else if (ref.includes("whatsapp") || ref.includes("wa.me")) refMap["WhatsApp"]++;
      else refMap["Tautan Langsung / Lainnya"]++;
    });

    daysList.forEach((item) => {
      item.count = dayMap[item.date] || 0;
    });

    const maxDayCount = Math.max(...daysList.map((d) => d.count), 1);

    return {
      totalViews: effectiveViews.length,
      todayViews: todayCount,
      weekViews: weekCount,
      chartDays: daysList.map((d) => ({
        ...d,
        percentage: Math.round((d.count / maxDayCount) * 100),
      })),
      referrers: Object.entries(refMap),
    };
  }, [views, store.is_pro]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Statistik Pengunjung
            </h1>
            {isPro ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                👑 PRO
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-semibold text-ink/60">
                🔒 Free
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-ink/60">
            Pantau trafik dan sumber pengunjung toko online {store.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!store.is_pro && (
            <button
              type="button"
              onClick={() => setDemoPro(!demoPro)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink shadow-sm hover:bg-cream active:scale-95 transition"
            >
              <span>{demoPro ? "🔒 Kembali ke Mode Free" : "👁️ Coba Pratinjau Pro"}</span>
            </button>
          )}
          {!isPro && (
            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="btn-primary py-2 px-4 text-xs font-bold shadow-sm"
            >
              ✨ Upgrade Pro
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {!isPro && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 rounded-3xl backdrop-blur-md bg-cream/40 border border-line shadow-floating text-center animate-fadeIn">
            <div className="max-w-md bg-white/95 rounded-2xl p-6 shadow-2xl border border-line">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="font-display text-xl font-bold text-ink">
                Buka Statistik Lengkap dengan Pro
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
                Tingkatkan ke paket <strong>Lakubio Pro</strong> seharga <strong>Rp45.000/bulan</strong> untuk melihat data analitik pengunjung secara real-time, grafik tren harian, dan sumber trafik pembeli.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(true)}
                  className="btn-primary w-full sm:w-auto py-2.5 px-6 text-xs font-bold"
                >
                  🚀 Upgrade ke Pro Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => setDemoPro(true)}
                  className="btn-secondary w-full sm:w-auto py-2.5 px-4 text-xs font-semibold"
                >
                  👁️ Pratinjau Tampilan Pro
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3.5 transition-all ${
            !isPro ? "filter blur-[6px] select-none pointer-events-none opacity-60" : ""
          }`}
        >
          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Total Kunjungan</p>
            <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
              {totalViews}
            </p>
            <p className="mt-1 text-[10px] text-moss font-semibold">● Sepanjang Waktu</p>
          </div>

          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Hari Ini</p>
            <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-moss">
              {todayViews}
            </p>
            <p className="mt-1 text-[10px] text-ink/40">Pengunjung baru</p>
          </div>

          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50">7 Hari Terakhir</p>
            <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
              {weekViews}
            </p>
            <p className="mt-1 text-[10px] text-emerald-600 font-semibold">Trafik mingguan</p>
          </div>

          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Rata-rata Harian</p>
            <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-clay">
              {Math.max(1, Math.round(weekViews / 7))}
            </p>
            <p className="mt-1 text-[10px] text-ink/40">Kunjungan per hari</p>
          </div>
        </div>

        <div
          className={`card mt-5 p-5 transition-all ${
            !isPro ? "filter blur-[6px] select-none pointer-events-none opacity-60" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-ink text-base">
                Grafik Tren Pengunjung
              </h3>
              <p className="text-xs text-ink/50 mt-0.5">Aktivitas harian calon pembeli yang membuka toko</p>
            </div>
            <span className="text-xs font-semibold text-moss bg-moss/10 px-2.5 py-1 rounded-full">
              7 Hari
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-line/60">
            {chartDays.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-bold text-ink/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.count}
                </div>
                <div className="w-full max-w-[36px] bg-line/40 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-moss rounded-t-lg transition-all duration-500 hover:bg-moss/80"
                    style={{ height: `${Math.max(8, day.percentage)}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-ink/60 truncate">
                  {day.label.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`card mt-5 p-5 transition-all ${
            !isPro ? "filter blur-[6px] select-none pointer-events-none opacity-60" : ""
          }`}
        >
          <h3 className="font-display font-bold text-ink text-base mb-1">
            Sumber Pengunjung (Trafik Medsos)
          </h3>
          <p className="text-xs text-ink/50 mb-4">Dari mana calon pembeli menemukan tautan tokomu</p>

          <div className="space-y-3">
            {referrers.map(([source, count]) => {
              const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
              return (
                <div key={source} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span>{source}</span>
                    <span>{count} pengunjung ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-line/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-moss transition-all duration-500"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showUpgradeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-bold text-moss">
                Paket Lakubio Pro
              </span>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="h-8 w-8 rounded-full bg-cream text-ink/70 flex items-center justify-center hover:text-ink"
              >
                ✕
              </button>
            </div>

            <h2 className="font-display text-2xl font-bold text-ink">
              Upgrade ke Lakubio Pro
            </h2>
            <p className="mt-1 font-display text-3xl font-bold text-moss">
              Rp45.000<span className="text-sm font-normal text-ink/50"> / bulan</span>
            </p>

            <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-ink/80 border-t border-line/60 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-moss font-bold">✓</span> Statistik & analitik pengunjung lengkap
              </li>
              <li className="flex items-center gap-2">
                <span className="text-moss font-bold">✓</span> Jumlah produk tanpa batas (unlimited)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-moss font-bold">✓</span> Dukungan Custom Domain sendiri
              </li>
              <li className="flex items-center gap-2">
                <span className="text-moss font-bold">✓</span> Hapus watermark merek Lakubio
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2.5"><a href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Halo Admin Lakubio, saya ingin upgrade toko "${store.name}" ke paket Pro seharga Rp45.000/bulan.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp py-3 text-center font-bold">
                💬 Hubungi Admin via WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setDemoPro(true);
                  setShowUpgradeModal(false);
                }}
                className="btn-secondary py-2.5 text-xs"
              >
                Aktifkan Simulasi Demo Pro Saja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}