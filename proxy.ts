/* ============================================================
   PROXY (dulunya Middleware di Next.js 16)
   Pelindung akses:
   - /admin/*  : bila belum login, arahkan ke halaman /masuk
   - /api/admin/* : bila belum login, tolak dengan 401
   Pemeriksaan cookie di sini sifatnya "optimistic"
   (cukup melihat keberadaan cookie). Verifikasi token yang
   sebenarnya dilakukan di server component & route handler.
   ============================================================ */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_SESI } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const punyaCookie = Boolean(request.cookies.get(COOKIE_SESI)?.value);

  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    // API admin: tolak dengan JSON 401 bila belum login
    if (!punyaCookie) {
      return NextResponse.json(
        { ok: false, pesan: "Belum login" },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  // Halaman admin: arahkan ke halaman login bila belum login
  if (!punyaCookie) {
    return NextResponse.redirect(new URL("/masuk", request.url));
  }

  return NextResponse.next();
}

// Terapkan hanya pada rute admin
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
