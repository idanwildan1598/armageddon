/* ============================================================
   BERANDA
   Terdiri dari: hero, section kategori, dan artikel terbaru.
   Server Component: semua data diambil langsung dari file data.
   ============================================================ */

import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Moon } from "lucide-react";
import KategoriCard from "@/components/KategoriCard";
import ArtikelCard from "@/components/ArtikelCard";
import { kategoriList } from "@/data/artikel";
import { bacaTerbaru } from "@/lib/store";

export default function BerandaPage() {
  // 3 artikel terbaru untuk section beranda (dari penyimpanan lokal)
  const terbaru = bacaTerbaru(3);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge kecil di atas judul */}
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-medium text-primary-dark">
            <Moon className="size-3.5" aria-hidden="true" />
            Bahan Dakwah Ringan
          </span>

          {/* Judul & deskripsi */}
          <h1 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Siapkan Hati untuk
            <span className="text-primary-dark"> Akhir Zaman</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            Kumpulan artikel dakwah singkat yang mudah dibaca.
          </p>

          {/* Tombol aksi */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              Baca Artikel
            </Link>
            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 rounded-full border border-primary-light bg-card px-6 py-3 text-sm font-medium text-primary-dark transition-colors hover:bg-primary-light"
            >
              Tentang Kami
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ KATEGORI ============ */}
      <section id="kategori" className="bg-primary-light py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                Jelajahi Kategori
              </h2>
              <p className="mt-2 text-sm text-muted">
                Pilih tema yang paling dekat dengan hatimu hari ini.
              </p>
            </div>
            <Link
              href="/artikel"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary-dark hover:underline sm:inline-flex"
            >
              Semua artikel
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Grid kartu kategori */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kategoriList.map((k) => (
              <KategoriCard key={k.nama} kategori={k} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARTIKEL TERBARU ============ */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Artikel Terbaru
            </h2>
            <p className="mt-2 text-sm text-muted">
              Bacaan singkat, ringan, dan menenangkan hati.
            </p>
          </div>
          <Link
            href="/artikel"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary-dark hover:underline sm:inline-flex"
          >
            Lihat semua
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Grid 3 artikel terbaru */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {terbaru.map((a) => (
            <ArtikelCard key={a.slug} artikel={a} />
          ))}
        </div>

        {/* Tombol "semua artikel" untuk mobile (di desktop sudah ada di atas) */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Lihat semua artikel
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
