/* ============================================================
   DALIL BLOCK
   Kartu kutipan dalil (ayat/hadis): teks Arab, terjemahan,
   dan sumber. Latar primary muda sesuai spesifikasi desain.
   ============================================================ */

import { BookOpen, Quote } from "lucide-react";
import type { Dalil } from "@/data/artikel";

interface Props {
  dalil: Dalil;
}

export default function DalilBlock({ dalil }: Props) {
  return (
    <figure className="rounded-2xl bg-primary-light p-6 sm:p-8">
      {/* Penanda kutipan */}
      <div className="flex items-center gap-2 text-primary-dark">
        <Quote className="size-5" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Dalil
        </span>
      </div>

      {/* Teks Arab: kanan ke kiri, memakai font Amiri */}
      <blockquote
        dir="rtl"
        lang="ar"
        className="mt-4 text-right text-2xl leading-loose text-ink"
      >
        {dalil.arab}
      </blockquote>

      {/* Terjemahan */}
      <blockquote className="mt-4 border-r-2 border-primary pr-4 text-sm leading-relaxed text-ink sm:pr-5">
        &ldquo;{dalil.terjemah}&rdquo;
      </blockquote>

      {/* Sumber */}
      <figcaption className="mt-4 flex items-center gap-1.5 text-xs text-muted">
        <BookOpen className="size-3.5 shrink-0 text-primary-dark" aria-hidden="true" />
        {dalil.sumber}
      </figcaption>
    </figure>
  );
}
