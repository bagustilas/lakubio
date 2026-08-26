import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import MobileBottomNav from "@/components/MobileBottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("owner_id", user!.id)
    .single();

  // Belum pernah selesai onboarding -> arahkan ke wizard
  if (!store) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white shadow-sm"
              style={{ backgroundColor: store.theme_color || "#2F6B4F" }}
            >
              {store.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="font-display font-bold text-ink text-sm sm:text-base leading-tight">
                {store.name}
              </p>
              <Link
                href={`/${store.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs font-semibold text-moss hover:underline"
              >
                <span>lakubio.id/{store.slug}</span>
                <span className="text-[10px]">↗</span>
              </Link>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/dashboard"
              className="text-ink/80 hover:text-ink transition"
            >
              Produk
            </Link>
            <Link
              href="/dashboard/statistik"
              className="text-ink/80 hover:text-ink transition flex items-center gap-1.5"
            >
              <span>Statistik</span>
              {!store.is_pro && (
                <span className="rounded-full bg-amber-100 px-1.5 py-0.2 text-[10px] font-bold text-amber-800 border border-amber-300">
                  PRO
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/pengaturan"
              className="text-ink/80 hover:text-ink transition"
            >
              Pengaturan
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA (with extra padding for bottom navigation on mobile) */}
      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-6 sm:py-8 pb-28 sm:pb-12 flex-1">
        {children}
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <MobileBottomNav storeSlug={store.slug} />
    </div>
  );
}
