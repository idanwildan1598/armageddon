/* ============================================================
   API: /api/admin/simpan  (POST)
   Simpan satu artikel (tambah atau perbarui).
   Dilindungi proxy + verifikasi token di sini.
   ============================================================ */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_SESI, tokenValid } from "@/lib/auth";
import { simpanSatu, slugDipakai } from "@/lib/store";
import type { Artikel } from "@/data/artikel";

export async function POST(request: Request) {
  // Verifikasi sesi (pertahanan kedua selain proxy)
  const cookie = await cookies();
  if (!tokenValid(cookie.get(COOKIE_SESI)?.value)) {
    return NextResponse.json(
      { ok: false, pesan: "Belum login" },
      { status: 401 },
    );
  }

  let artikel: Artikel;
  let slugAsli: string | undefined;
  try {
    const body = await request.json();
    artikel = body?.artikel as Artikel;
    // slugAsli: slug lama saat mengedit (agar tidak dianggap duplikat)
    slugAsli = body?.slugAsli ? String(body.slugAsli) : undefined;
  } catch {
    return NextResponse.json(
      { ok: false, pesan: "Permintaan tidak valid" },
      { status: 400 },
    );
  }

  // Validasi dasar
  if (!artikel?.slug || !artikel.judul || !artikel.kategori) {
    return NextResponse.json(
      { ok: false, pesan: "Data artikel tidak lengkap" },
      { status: 400 },
    );
  }

  // Cegah slug duplikat (slug lama milik sendiri dikecualikan)
  if (slugDipakai(artikel.slug, slugAsli)) {
    return NextResponse.json(
      { ok: false, pesan: "Slug sudah dipakai artikel lain" },
      { status: 400 },
    );
  }

  const hasil = simpanSatu(artikel);
  if (!hasil.ok) {
    return NextResponse.json(hasil, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
