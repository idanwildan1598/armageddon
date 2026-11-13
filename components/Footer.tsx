/* ============================================================
   FOOTER
   Footer sederhana: identitas, tautan cepat, dan catatan
   pengingat verifikasi dalil. Server Component.
   ============================================================ */

import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

// Tautan cepat di footer
const tautan = [
  { label: "Beranda", href: "/" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tentang", href: "/tentang" },
  { label: "Masuk Admin", href: "/masuk" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-primary-light bg-card">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Identitas */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-white">
                <BookOpen className="size-5" aria-hidden="true" />
              </span>
              <span className="font-semibold text-ink">
                Web <span className="text-primary-dark">Akhir Zaman</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Kumpulan bahan dakwah ringan yang mudah dibaca, agar hati
              kembali teringat akhirat di tengah kesibukan dunia.
            </p>
          </div>

          {/* Tautan cepat */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-dark">
              Tautan
            </h3>
            <ul className="mt-4 space-y-2">
              {tautan.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-muted transition-colors hover:text-primary-dark"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Catatan pengingat */}
        <div className="mt-10 rounded-2xl bg-primary-light px-5 py-4">
          <p className="text-xs leading-relaxed text-muted">
            Seluruh dalil pada website ini wajib diverifikasi terlebih
            dahulu kepada ustadz atau sumber terpercaya sebelum
            dipublikasikan ke masyarakat luas.
          </p>
        </div>

        {/* Hak cipta (tahun ditulis manual agar build tetap statis) */}
        <p className="mt-8 flex items-center gap-1.5 text-center text-xs text-muted sm:justify-center">
          Web Akhir Zaman
          <Heart className="size-3.5 text-primary" aria-hidden="true" />
          2026
        </p>
      </div>
    </footer>
  );
}
