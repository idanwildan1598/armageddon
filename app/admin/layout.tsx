/* ============================================================
   LAYOUT ADMIN
   Semua halaman di bawah /admin dibungkus penjaga sesi:
   bila cookie tidak valid, langsung dialihkan ke /masuk.
   cookies() dibaca di dalam <Suspense> agar kompatibel
   dengan cacheComponents (bagian ini dirender saat request).
   ============================================================ */

import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { COOKIE_SESI, tokenValid } from "@/lib/auth";
import TombolKeluar from "@/components/admin/TombolKeluar";

// Penjaga sesi (server, dirender saat request)
async function Sesi({ children }: { children: React.ReactNode }) {
  const cookie = await cookies();
  if (!tokenValid(cookie.get(COOKIE_SESI)?.value)) {
    redirect("/masuk");
  }
  return <>{children}</>;
}

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<p className="p-12 text-center text-sm text-muted">Memuat...</p>}>
      <Sesi>
        <div className="mx-auto min-h-[70vh] max-w-5xl px-4 py-12 sm:px-6">
          {/* Header panel admin */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-medium text-primary-dark">
                <BookOpen className="size-3.5" aria-hidden="true" />
                Panel Admin
              </span>
              <h1 className="mt-3 text-2xl font-bold text-ink">Kelola Artikel</h1>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-full border border-primary-light bg-card px-4 py-2 text-sm text-muted transition-colors hover:text-primary-dark"
              >
                Lihat Website
              </Link>
              <TombolKeluar />
            </div>
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </Sesi>
    </Suspense>
  );
}
