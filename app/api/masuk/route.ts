/* ============================================================
   API: /api/masuk  (POST)
   Terima password, cocokkan, lalu terbitkan cookie sesi
   HTTP-only yang bertanda tangan.
   ============================================================ */

import { NextResponse } from "next/server";
import { COOKIE_SESI, DURASI_SESI, bikinToken, sandiBenar } from "@/lib/auth";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json(
      { ok: false, pesan: "Permintaan tidak valid" },
      { status: 400 },
    );
  }

  if (!sandiBenar(password)) {
    return NextResponse.json(
      { ok: false, pesan: "Password salah" },
      { status: 401 },
    );
  }

  // Buat respons sukses + pasang cookie sesi
  const respons = NextResponse.json({ ok: true });
  respons.cookies.set(COOKIE_SESI, bikinToken(), {
    httpOnly: true, // tidak bisa dibaca JavaScript browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DURASI_SESI,
  });
  return respons;
}
