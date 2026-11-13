/* ============================================================
   PENYIMPANAN ARTIKEL (LOKAL, TANPA DATABASE)
   Artikel bawaan ada di data/artikel.ts. Begitu admin
   menyimpan perubahan, seluruh daftar ditulis ke
   data/artikel-lokal.json yang menjadi sumber utama.

   CATATAN PENTING:
   - Saat menjalankan `npm run dev` lokal: edit langsung
     tersimpan dan langsung tampil di website.
   - Saat di-hosting Vercel: sistem file HANYA-BACA, jadi
     tombol simpan akan gagal. Agar edit muncul di Vercel,
     commit file data/artikel-lokal.json ke GitHub.
   ============================================================ */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { artikel as artikelBawaan } from "@/data/artikel";
import type { Artikel } from "@/data/artikel";

// Lokasi file JSON hasil edit admin
function fileData(): string {
  return path.join(process.cwd(), "data", "artikel-lokal.json");
}

// Baca seluruh artikel: JSON hasil edit bila ada, jika tidak
// pakai data bawaan dari data/artikel.ts
export function bacaSemua(): Artikel[] {
  try {
    if (existsSync(fileData())) {
      const isi = readFileSync(fileData(), "utf-8");
      const daftar = JSON.parse(isi) as Artikel[];
      if (Array.isArray(daftar)) return daftar;
    }
  } catch {
    // file rusak/tidak terbaca: kembali ke data bawaan
  }
  return artikelBawaan;
}

// Baca seluruh artikel terurut terbaru (pembacaan data untuk halaman)
export function bacaTerbaru(jumlah?: number): Artikel[] {
  const urut = [...bacaSemua()].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  return jumlah ? urut.slice(0, jumlah) : urut;
}

// Simpan seluruh daftar artikel ke file JSON lokal.
// Mengembalikan status agar UI admin bisa menampilkan pesan.
export function simpanSemua(daftar: Artikel[]): { ok: boolean; pesan?: string } {
  try {
    // Pastikan folder data ada
    mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
    writeFileSync(fileData(), JSON.stringify(daftar, null, 2), "utf-8");
    return { ok: true };
  } catch {
    return {
      ok: false,
      pesan:
        "Gagal menyimpan: sistem file hanya-baca (umumnya karena di-hosting). Jalankan website secara lokal (npm run dev) untuk mengedit, lalu commit data/artikel-lokal.json agar muncul di hosting.",
    };
  }
}

// Tambah atau perbarui satu artikel (cari berdasarkan slug)
export function simpanSatu(baru: Artikel): { ok: boolean; pesan?: string } {
  const daftar = bacaSemua();
  const i = daftar.findIndex((a) => a.slug === baru.slug);
  if (i >= 0) daftar[i] = baru;
  else daftar.push(baru);
  return simpanSemua(daftar);
}

// Hapus satu artikel berdasarkan slug
export function hapusSatu(slug: string): { ok: boolean; pesan?: string } {
  const daftar = bacaSemua().filter((a) => a.slug !== slug);
  return simpanSemua(daftar);
}

// Periksa apakah slug sudah dipakai artikel lain
export function slugDipakai(slug: string, kecualiSlug?: string): boolean {
  return bacaSemua().some(
    (a) => a.slug === slug && a.slug !== kecualiSlug,
  );
}
