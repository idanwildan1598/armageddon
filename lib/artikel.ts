/* ============================================================
   HELPER ARTIKEL (MURNI)
   Kumpulan fungsi murni (tanpa akses file/sistem) sehingga
   aman dipakai di server maupun client component.
   Pembacaan data artikel ada di lib/store.ts (server only).
   ============================================================ */

import type { Artikel } from "@/data/artikel";

// Format tanggal ISO (YYYY-MM-DD) menjadi teks Indonesia,
// contoh: "1 November 2026". Diformat dengan zona UTC agar
// hasilnya konsisten di build dan browser.
export function formatTanggal(iso: string): string {
  const tanggal = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(tanggal);
}

// Estimasi waktu baca (menit), asumsi ~180 kata per menit.
// Meliputi semua teks di blok paragraf, sub judul, dan daftar.
export function hitungWaktuBaca(artikelItem: Artikel): number {
  const teks = artikelItem.isi
    .map((blok) => {
      if (blok.jenis === "paragraf" || blok.jenis === "subJudul") return blok.teks;
      if (blok.jenis === "daftar") return blok.butir.join(" ");
      return "";
    })
    .join(" ");
  const jumlahKata = teks.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(jumlahKata / 180));
}

// Urutkan daftar artikel dari tanggal terbaru
export function urutTerbaru(daftar: Artikel[]): Artikel[] {
  return [...daftar].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

// Cari satu artikel berdasarkan slug dari sebuah daftar
export function cariArtikel(daftar: Artikel[], slug: string): Artikel | undefined {
  return daftar.find((a) => a.slug === slug);
}

// Artikel terkait dari sebuah daftar: prioritas kategori sama
export function artikelTerkait(
  daftar: Artikel[],
  saatIni: Artikel,
  jumlah = 3,
): Artikel[] {
  const lainnya = daftar.filter((a) => a.slug !== saatIni.slug);
  const sekategori = lainnya.filter((a) => a.kategori === saatIni.kategori);
  const lainnyaLagi = lainnya.filter((a) => a.kategori !== saatIni.kategori);
  return [...sekategori, ...lainnyaLagi].slice(0, jumlah);
}
