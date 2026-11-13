/* ============================================================
   API: /api/admin/hapus  (POST)
   Hapus artikel berdasarkan slug.
   ============================================================ */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_SESI, tokenValid } from "@/lib/auth";
import { hapusSatu } from "@/lib/store";

export async function POST(request: Request) {
  const cookie = await cookies();
  if (!tokenValid(cookie.get(COOKIE_SESI)?.value)) {
    return NextResponse.json(
      { ok: false, pesan: "Belum login" },
      { status: 401 },
    );
  }

  let slug = "";
  try {
    const body = await request.json();
    slug = String(body?.slug ?? "");
  } catch {
    return NextResponse.json(
      { ok: false, pesan: "Permintaan tidak valid" },
      { status: 400 },
    );
  }

  if (!slug) {
    return NextResponse.json(
      { ok: false, pesan: "Slug tidak boleh kosong" },
      { status: 400 },
    );
  }

  const hasil = hapusSatu(slug);
  if (!hasil.ok) {
    return NextResponse.json(hasil, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
