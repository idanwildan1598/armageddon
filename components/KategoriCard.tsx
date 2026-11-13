/* ============================================================
   KATEGORI CARD
   Kartu kategori di beranda, menampilkan icon, nama,
   deskripsi, dan jumlah artikel dalam kategori tersebut.
   ============================================================ */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import KategoriIcon from "@/components/KategoriIcon";
import { artikel } from "@/data/artikel";
import type { Kategori } from "@/data/artikel";

interface Props {
  kategori: Kategori;
}

export default function KategoriCard({ kategori }: Props) {
  // Hitung jumlah artikel pada kategori ini
  const jumlah = artikel.filter((a) => a.kategori === kategori.nama).length;

  return (
    <Link
      href="/artikel"
      className="group flex h-full flex-col rounded-2xl bg-primary-light p-6 transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Icon kategori di dalam lingkaran putih */}
      <span className="flex size-12 items-center justify-center rounded-2xl bg-card shadow-sm">
        <KategoriIcon nama={kategori.icon} className="size-6 text-primary-dark" />
      </span>

      <h3 className="mt-4 font-semibold text-ink transition-colors group-hover:text-primary-dark">
        {kategori.nama}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
        {kategori.deskripsi}
      </p>

      {/* Jumlah artikel */}
      <span className="mt-4 flex items-center justify-between text-xs font-medium text-primary-dark">
        {jumlah} artikel
        <ChevronRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
