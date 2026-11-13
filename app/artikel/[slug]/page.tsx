/* ============================================================
   DETAIL ARTIKEL
   Menampilkan satu artikel secara utuh: judul, meta
   (kategori, tanggal, estimasi baca), isi per blok, tombol
   bagikan, dan artikel terkait.
   ============================================================ */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import DalilBlock from "@/components/DalilBlock";
import ShareButton from "@/components/ShareButton";
import KategoriIcon from "@/components/KategoriIcon";
import { artikel, kategoriList } from "@/data/artikel";
import {
  artikelTerkait,
  cariArtikel,
  formatTanggal,
  hitungWaktuBaca,
  urutTerbaru,
} from "@/lib/artikel";
import { bacaSemua } from "@/lib/store";
import ArtikelCard from "@/components/ArtikelCard";

// Cari nama icon kategori (untuk badge di header)
function kategoriIconNama(nama: string): string {
  return kategoriList.find((k) => k.nama === nama)?.icon ?? "BookOpen";
}

// Prerender slug artikel bawaan saat build (lebih cepat & SEO bagus).
// Artikel tambahan dari admin tetap bisa dirender saat dibuka.
export function generateStaticParams() {
  return artikel.map((a) => ({ slug: a.slug }));
}

// Metadata dinamis per artikel (judul, deskripsi, Open Graph)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = cariArtikel(bacaSemua(), slug);
  if (!a) return { title: "Artikel tidak ditemukan" };

  return {
    title: a.judul,
    description: a.ringkasan,
    openGraph: {
      title: a.judul,
      description: a.ringkasan,
      type: "article",
      publishedTime: a.tanggal,
    },
  };
}

export default async function DetailArtikelPage({
  params,
}: PageProps<"/artikel/[slug]">) {
  const { slug } = await params;

  // Baca seluruh artikel dari penyimpanan lokal (ikut hasil edit admin)
  const semua = bacaSemua();
  const a = cariArtikel(semua, slug);

  // Slug tidak ada di data: tampilkan 404
  if (!a) notFound();

  const terkait = artikelTerkait(urutTerbaru(semua), a);
  const kategori = a.kategori;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* ============ HEADER ARTIKEL ============ */}
      <header>
        {/* Badge kategori + icon */}
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-medium text-primary-dark transition-colors hover:bg-primary/20"
        >
          <KategoriIcon nama={kategoriIconNama(kategori)} className="size-3.5" />
          {kategori}
        </Link>

        {/* Judul */}
        <h1 className="mt-5 text-3xl font-bold leading-snug text-ink sm:text-4xl">
          {a.judul}
        </h1>

        {/* Meta: tanggal & estimasi waktu baca */}
        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4 text-primary-dark" aria-hidden="true" />
            {formatTanggal(a.tanggal)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-primary-dark" aria-hidden="true" />
            {hitungWaktuBaca(a)} menit baca
          </span>
        </div>
      </header>

      {/* ============ ISI ARTIKEL ============ */}
      {/* max-w dipilih agar lebar teks ~70 karakter per baris */}
      <div className="mx-auto mt-10 max-w-[70ch]">
        {a.isi.map((blok, i) => {
          switch (blok.jenis) {
            case "subJudul":
              return (
                <h2 key={i} className="mt-10 text-xl font-semibold text-primary-dark">
                  {blok.teks}
                </h2>
              );
            case "paragraf":
              return (
                <p key={i} className="mt-5 leading-loose text-ink">
                  {blok.teks}
                </p>
              );
            case "daftar":
              return (
                <ul key={i} className="mt-5 space-y-3">
                  {blok.butir.map((b, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-ink">
                      <ChevronRight
                        className="mt-1 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              );
            case "dalil":
              return <DalilBlock key={i} dalil={blok.dalil} />;
          }
        })}
      </div>

      {/* ============ TOMBOL BAGIKAN ============ */}
      <div className="mt-14 flex items-center gap-4 border-t border-primary-light pt-8">
        <ShareButton judul={a.judul} />
        <p className="text-sm text-muted">Bagikan artikel ini kepada yang terkasih.</p>
      </div>

      {/* ============ ARTIKEL TERKAIT ============ */}
      {terkait.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Artikel Terkait</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {terkait.map((t) => (
              <ArtikelCard key={t.slug} artikel={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

