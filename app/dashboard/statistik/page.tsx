import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StoreAnalytics from "@/components/StoreAnalytics";

export default async function AnalyticsPage() {
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
    .eq("owner_id", user.id)
    .single();

  if (!store) {
    redirect("/onboarding");
  }

  const { data: views } = await supabase
    .from("store_views")
    .select("id, created_at, referrer")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return <StoreAnalytics store={store} views={views ?? []} />;
}
