/* ============================================================
   API: /api/keluar  (POST)
   Hapus cookie sesi (logout).
   ============================================================ */

import { NextResponse } from "next/server";
import { COOKIE_SESI } from "@/lib/auth";

export async function POST() {
  const respons = NextResponse.json({ ok: true });
  respons.cookies.set(COOKIE_SESI, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // langsung kedaluwarsa
  });
  return respons;
}
