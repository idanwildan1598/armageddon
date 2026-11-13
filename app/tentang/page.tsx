/* ============================================================
   HALAMAN TENTANG
   Menampilkan visi, tujuan, dan kontak singkat.
   ============================================================ */

import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Heart, Mail, MapPin, Moon } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Visi, tujuan, dan kontak Web Akhir Zaman: media bahan dakwah yang ringan, rapi, dan mudah dibaca.",
  openGraph: {
    title: "Tentang | Web Akhir Zaman",
    description:
      "Visi, tujuan, dan kontak Web Akhir Zaman: media bahan dakwah yang ringan dan mudah dibaca.",
  },
};

// Daftar tujuan website
const tujuan = [
  "Menyajikan bahan dakwah singkat yang mudah dibaca semua kalangan.",
  "Mengingatkan pada akhirat di tengah kesibukan kehidupan.",
  "Menyediakan dalil yang rapi beserta terjemahan dan sumbernya.",
  "Menjadi bahan ceramah, kajian, dan bahan bagikan di media sosial.",
];

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* ============ VISI ============ */}
      <section>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-medium text-primary-dark">
          <Moon className="size-3.5" aria-hidden="true" />
          Tentang Kami
        </span>

        <h1 className="mt-6 text-3xl font-bold text-ink sm:text-4xl">
          Dakwah yang Ringan, Hati yang Terjaga
        </h1>

        <p className="mt-5 leading-loose text-ink">
          Web Akhir Zaman adalah kumpulan bahan dakwah sederhana: artikel
          pendek tentang akhir zaman, tanda-tanda kiamat, dan cara menjaga
          iman. Tujuan kami bukan menakuti, melainkan menumbuhkan semangat
          beramal saleh hari ini.
        </p>
      </section>

      {/* ============ TUJUAN ============ */}
      <section className="mt-12 rounded-2xl bg-primary-light p-6 sm:p-8">
        <h2 className="flex items-center gap-2.5 text-xl font-semibold text-primary-dark">
          <Heart className="size-5" aria-hidden="true" />
          Tujuan Kami
        </h2>
        <ul className="mt-5 space-y-3">
          {tujuan.map((t) => (
            <li key={t} className="flex gap-3 leading-relaxed text-ink">
              <BookOpen className="mt-1 size-4 shrink-0 text-primary-dark" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ KONTAK ============ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-primary-dark">Kontak</h2>
        <ul className="mt-5 space-y-3 text-sm">
          <li className="flex items-center gap-3 text-muted">
            <Mail className="size-4 shrink-0 text-primary-dark" aria-hidden="true" />
            email@contoh.com
          </li>
          <li className="flex items-center gap-3 text-muted">
            <MapPin className="size-4 shrink-0 text-primary-dark" aria-hidden="true" />
            Ciamis, Jawa Barat, Indonesia
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted">
          * Ganti kontak di atas dengan kontak asli pada file{" "}
          <code className="rounded bg-primary-light px-1.5 py-0.5">app/tentang/page.tsx</code>.
        </p>
      </section>

      {/* ============ AJAKAN ============ */}
      <div className="mt-14 text-center">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <BookOpen className="size-4" aria-hidden="true" />
          Mulai Membaca
        </Link>
      </div>
    </div>
  );
}
