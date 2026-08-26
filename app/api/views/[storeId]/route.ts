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
    const referrer = typeof body?.referrer === "string" ? body.referrer.slice(0, 255) : null;

    const supabase = await createClient();
    await supabase.from("store_views").insert({
      store_id: storeId,
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
