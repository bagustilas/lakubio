import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return NextResponse.json({ error: "Missing storeId" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    let referrer = body?.source || body?.referrer || null;

    // Fallback: periksa server headers jika dari client kosong / direct
    if (!referrer || referrer === "direct") {
      const headerReferer = (request.headers.get("referer") || "").toLowerCase();
      const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

      if (headerReferer.includes("instagram") || userAgent.includes("instagram")) {
        referrer = "instagram.com";
      } else if (
        headerReferer.includes("tiktok") ||
        userAgent.includes("tiktok") ||
        userAgent.includes("musical_ly") ||
        userAgent.includes("bytedance") ||
        userAgent.includes("trill")
      ) {
        referrer = "tiktok.com";
      } else if (headerReferer.includes("whatsapp") || userAgent.includes("whatsapp")) {
        referrer = "whatsapp";
      } else if (
        headerReferer.includes("facebook") ||
        userAgent.includes("fban") ||
        userAgent.includes("fbav") ||
        userAgent.includes("fb_iab")
      ) {
        referrer = "facebook.com";
      } else if (headerReferer.includes("t.co") || headerReferer.includes("twitter") || headerReferer.includes("x.com")) {
        referrer = "x.com";
      } else if (headerReferer && !headerReferer.includes(request.nextUrl.host)) {
        try {
          referrer = new URL(headerReferer).hostname;
        } catch {
          referrer = headerReferer.slice(0, 100);
        }
      } else {
        referrer = "direct";
      }
    }

    const sanitizedReferrer = typeof referrer === "string" ? referrer.slice(0, 255) : "direct";

    const supabase = await createClient();
    const { error: insertError } = await supabase.from("store_views").insert({
      store_id: storeId,
      referrer: sanitizedReferrer,
    });

    if (insertError) {
      console.error("Gagal insert store_views di Supabase:", insertError);
      return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, referrer: sanitizedReferrer });
  } catch (error) {
    console.error("Error di /api/views:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
