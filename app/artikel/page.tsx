/* ============================================================
   HALAMAN ARTIKEL
   Daftar seluruh artikel dengan pencarian dan filter kategori
   (logika di components/ArtikelList.tsx).
   ============================================================ */

import type { Metadata } from "next";
import ArtikelList from "@/components/ArtikelList";
import { bacaTerbaru } from "@/lib/store";

// Metadata SEO untuk halaman daftar artikel
export const metadata: Metadata = {
  title: "Artikel",
  description:
    "Daftar artikel dakwah: tanda kiamat, fitnah Dajjal, jaga iman, ilmu, dan taubat. Cari berdasarkan judul atau kategori.",
  openGraph: {
    title: "Artikel | Web Akhir Zaman",
    description:
      "Daftar artikel dakwah: tanda kiamat, fitnah Dajjal, jaga iman, ilmu, dan taubat.",
  },
};

export default function ArtikelPage() {
  // Semua artikel terurut terbaru (dari penyimpanan lokal)
  const daftar = bacaTerbaru();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header halaman */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Artikel</h1>
        <p className="mt-3 leading-relaxed text-muted">
          Telusuri bacaan dakwah berdasarkan kata kunci atau kategori.
          Semua artikel dirancang singkat agar mudah dipahami.
        </p>
      </div>

      {/* Daftar + pencarian + filter */}
      <div className="mt-10">
        <ArtikelList daftar={daftar} />
      </div>
    </div>
  );
}
