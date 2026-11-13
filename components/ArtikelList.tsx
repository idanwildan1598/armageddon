"use client";

/* ============================================================
   ARTIKEL LIST
   Daftar artikel dengan pencarian dan filter kategori.
   Client Component karena butuh state (teks pencarian dan
   kategori terpilih). Pemfilteran dilakukan di sisi client,
   tanpa perlu request ke server.
   ============================================================ */

import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import ArtikelCard from "@/components/ArtikelCard";
import SearchBar from "@/components/SearchBar";
import type { Artikel } from "@/data/artikel";

interface Props {
  daftar: Artikel[]; // seluruh artikel (sudah terurut dari server)
  kategoriAwal?: string; // kategori terpilih saat pertama render
}

export default function ArtikelList({ daftar, kategoriAwal }: Props) {
  const [kata, setKata] = useState("");
  const [kategori, setKategori] = useState(kategoriAwal ?? "");

  // Ambil daftar nama kategori unik dari data
  const semuaKategori = useMemo(
    () => [...new Set(daftar.map((a) => a.kategori))],
    [daftar],
  );

  // Filter artikel berdasarkan kategori + teks pencarian
  const hasil = useMemo(() => {
    const q = kata.trim().toLowerCase();
    return daftar.filter((a) => {
      // Filter kategori dulu, lalu teks pencarian
      if (kategori && a.kategori !== kategori) return false;
      if (!q) return true;
      const gabungan = `${a.judul} ${a.ringkasan}`.toLowerCase();
      return gabungan.includes(q);
    });
  }, [daftar, kata, kategori]);

  return (
    <div>
      {/* Pencarian */}
      <SearchBar
        nilai={kata}
        onUbah={setKata}
        placeholder="Cari judul atau ringkasan artikel..."
      />

      {/* Filter kategori (tombol pil) */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setKategori("")}
          className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
            kategori === ""
              ? "bg-primary text-white"
              : "bg-primary-light text-primary-dark hover:bg-primary/20"
          }`}
        >
          Semua
        </button>
        {semuaKategori.map((nama) => (
          <button
            key={nama}
            type="button"
            onClick={() => setKategori(nama === kategori ? "" : nama)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              kategori === nama
                ? "bg-primary text-white"
                : "bg-primary-light text-primary-dark hover:bg-primary/20"
            }`}
          >
            {nama}
          </button>
        ))}
      </div>

      {/* Grid hasil */}
      {hasil.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((a) => (
            <ArtikelCard key={a.slug} artikel={a} />
          ))}
        </div>
      ) : (
        /* Kondisi kosong: tidak ada artikel yang cocok */
        <div className="mt-12 flex flex-col items-center rounded-2xl bg-primary-light px-6 py-16 text-center">
          <BookOpen className="size-10 text-primary-dark" aria-hidden="true" />
          <p className="mt-4 font-medium text-ink">Tidak ada artikel yang cocok</p>
          <p className="mt-1 text-sm text-muted">
            Coba kata kunci lain atau pilih kategori berbeda.
          </p>
        </div>
      )}

      {/* Jumlah hasil */}
      <p className="mt-6 text-center text-xs text-muted">
        Menampilkan {hasil.length} dari {daftar.length} artikel
      </p>
    </div>
  );
}
