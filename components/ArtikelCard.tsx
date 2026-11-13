/* ============================================================
   ARTIKEL CARD
   Kartu ringkas artikel untuk beranda dan halaman daftar.
   Server Component (tanpa "use client") agar ringan.
   ============================================================ */

import Link from "next/link";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import KategoriIcon from "@/components/KategoriIcon";
import { formatTanggal, hitungWaktuBaca } from "@/lib/artikel";
import { kategoriList } from "@/data/artikel";
import type { Artikel } from "@/data/artikel";

// Cari nama icon kategori dari data kategoriList.
function kategoriIcon(nama: string): string {
  return kategoriList.find((k) => k.nama === nama)?.icon ?? "BookOpen";
}

interface Props {
  artikel: Artikel;
}

export default function ArtikelCard({ artikel }: Props) {
  return (
    <Link
      href={`/artikel/${artikel.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-primary-light bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
    >
      {/* Badge kategori dengan icon */}
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-dark">
        <KategoriIcon nama={kategoriIcon(artikel.kategori)} className="size-3.5" />
        {artikel.kategori}
      </span>

      {/* Judul */}
      <h3 className="mt-4 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-primary-dark">
        {artikel.judul}
      </h3>

      {/* Ringkasan, maksimal 2 baris */}
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {artikel.ringkasan}
      </p>

      {/* Meta: tanggal, estimasi baca, dan panah */}
      <div className="mt-auto flex items-center justify-between gap-2 pt-6 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5" aria-hidden="true" />
          {formatTanggal(artikel.tanggal)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden="true" />
          {hitungWaktuBaca(artikel)} menit
        </span>
        <ChevronRight
          className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

