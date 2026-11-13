/* ============================================================
   HALAMAN 404
   Tampil bila artikel/halaman tidak ditemukan.
   ============================================================ */

import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary-light">
        <Compass className="size-8 text-primary-dark" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-3 max-w-md leading-relaxed text-muted">
        Halaman yang kamu cari mungkin sudah dipindah atau tautannya salah.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
