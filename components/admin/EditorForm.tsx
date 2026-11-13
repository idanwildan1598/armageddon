"use client";

/* ============================================================
   FORM EDITOR ARTIKEL
   Client Component besar untuk menulis/mengubah artikel:
   - Data diri artikel: judul, slug, kategori, tanggal, ringkasan
   - Isi berupa "blok" yang bisa ditambah, diurutkan, dihapus:
     paragraf, sub judul, daftar butir, dan dalil (ayat/hadis)
   Simpan: kirim POST ke /api/admin/simpan.
   ============================================================ */

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Clock,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { Artikel, BlokIsi, Dalil } from "@/data/artikel";

interface Props {
  awal?: Artikel; // artikel yang diedit (kosong = artikel baru)
}

export default function EditorForm({ awal }: Props) {
  const router = useRouter();

  // ===== State data diri artikel =====
  const [judul, setJudul] = useState(awal?.judul ?? "");
  const [slug, setSlug] = useState(awal?.slug ?? "");
  const [slugDiedit, setSlugDiedit] = useState(Boolean(awal)); // slug otomatis hanya untuk artikel baru
  const [kategori, setKategori] = useState(awal?.kategori ?? "Akhir Zaman");
  const [tanggal, setTanggal] = useState(awal?.tanggal ?? new Date().toISOString().slice(0, 10));
  const [ringkasan, setRingkasan] = useState(awal?.ringkasan ?? "");

  // ===== State isi artikel (blok-blok) =====
  const [isi, setIsi] = useState<BlokIsi[]>(awal?.isi ?? []);

  // ===== State UI =====
  const [sedangSimpan, setSedangSimpan] = useState(false);
  const [pesan, setPesan] = useState<{ jenis: "ok" | "error"; teks: string } | null>(null);
  const [bukaPilihBlok, setBukaPilihBlok] = useState(false); // menu pilih jenis blok

  // Buat slug otomatis dari judul (huruf kecil, tanpa tanda)
  function ubahJudul(v: string) {
    setJudul(v);
    if (!slugDiedit) {
      setSlug(
        v
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") // buang karakter aneh
          .trim()
          .replace(/\s+/g, "-"), // spasi jadi tanda hubung
      );
    }
  }

  // ===== Operasi blok =====
  function tambahBlok(jenis: BlokIsi["jenis"]) {
    setBukaPilihBlok(false);
    if (jenis === "paragraf") setIsi((s) => [...s, { jenis, teks: "" }]);
    else if (jenis === "subJudul") setIsi((s) => [...s, { jenis, teks: "" }]);
    else if (jenis === "daftar") setIsi((s) => [...s, { jenis, butir: [""] }]);
    else
      setIsi((s) => [
        ...s,
        { jenis, dalil: { arab: "", terjemah: "", sumber: "" } },
      ]);
  }

  function hapusBlok(i: number) {
    setIsi((s) => s.filter((_, idx) => idx !== i));
  }

  // Naikkan/turunkan posisi blok
  function geser(i: number, arah: -1 | 1) {
    setIsi((s) => {
      const j = i + arah;
      if (j < 0 || j >= s.length) return s;
      const baru = [...s];
      [baru[i], baru[j]] = [baru[j], baru[i]];
      return baru;
    });
  }

  // Perbarui satu properti blok (immutable)
  function ubahBlok(i: number, perubahan: Partial<BlokIsi>) {
    setIsi((s) => s.map((b, idx) => (idx === i ? ({ ...b, ...perubahan } as BlokIsi) : b)));
  }

  function ubahDalil(i: number, perubahan: Partial<Dalil>) {
    setIsi((s) =>
      s.map((b, idx) =>
        idx === i && b.jenis === "dalil" ? { ...b, dalil: { ...b.dalil, ...perubahan } } : b,
      ),
    );
  }

  // ===== Simpan ke server =====
  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setSedangSimpan(true);
    setPesan(null);

    const artikel: Artikel = {
      slug: slug.trim(),
      judul: judul.trim(),
      kategori,
      tanggal,
      ringkasan: ringkasan.trim(),
      isi: isi.map(bersihkanBlok), // buang teks kosong
    };

    try {
      const res = await fetch("/api/admin/simpan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artikel, slugAsli: awal?.slug }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.push("/admin"); // kembali ke daftar
        router.refresh();
        return;
      }
      setPesan({ jenis: "error", teks: data.pesan ?? "Gagal menyimpan" });
    } catch {
      setPesan({ jenis: "error", teks: "Terjadi kesalahan jaringan" });
    } finally {
      setSedangSimpan(false);
    }
  }

  return (
    <form onSubmit={simpan} className="space-y-6">
      {/* ===== Data diri artikel ===== */}
      <section className="rounded-2xl border border-primary-light bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-dark">
          Data Artikel
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Judul */}
          <div className="sm:col-span-2">
            <label htmlFor="judul" className="text-sm font-medium text-ink">Judul</label>
            <input
              id="judul"
              value={judul}
              onChange={(e) => ubahJudul(e.target.value)}
              required
              className="mt-1.5 w-full rounded-2xl border border-primary-light bg-background px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Slug (alamat URL) */}
          <div>
            <label htmlFor="slug" className="text-sm font-medium text-ink">
              Slug <span className="font-normal text-muted">(alamat: /artikel/{slug})</span>
            </label>
            <input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugDiedit(true);
              }}
              required
              className="mt-1.5 w-full rounded-2xl border border-primary-light bg-background px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Kategori */}
          <div>
            <label htmlFor="kategori" className="text-sm font-medium text-ink">Kategori</label>
            <select
              id="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-primary-light bg-background px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {DAFTAR_KATEGORI.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Tanggal */}
          <div>
            <label htmlFor="tanggal" className="text-sm font-medium text-ink">Tanggal</label>
            <input
              id="tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
              className="mt-1.5 w-full rounded-2xl border border-primary-light bg-background px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Ringkasan */}
          <div className="sm:col-span-2">
            <label htmlFor="ringkasan" className="text-sm font-medium text-ink">Ringkasan</label>
            <textarea
              id="ringkasan"
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              rows={2}
              required
              className="mt-1.5 w-full rounded-2xl border border-primary-light bg-background px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </section>

      {/* ===== Isi artikel (blok) ===== */}
      <section className="rounded-2xl border border-primary-light bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-dark">
            Isi Artikel
          </h2>
          <span className="text-xs text-muted">{isi.length} blok</span>
        </div>

        {/* Editor tiap blok */}
        <div className="mt-4 space-y-4">
          {isi.map((blok, i) => (
            <div key={i} className="rounded-2xl bg-primary-light p-4">
              {/* Kepala blok: jenis + tombol urut/hapus */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
                  {JENIS_LABEL[blok.jenis]}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => geser(i, -1)} aria-label="Naikkan blok"
                    className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-primary-dark">
                    <ArrowUp className="size-3.5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => geser(i, 1)} aria-label="Turunkan blok"
                    className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-primary-dark">
                    <ArrowDown className="size-3.5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => hapusBlok(i)} aria-label="Hapus blok"
                    className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-primary-dark">
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Input sesuai jenis blok */}
              {blok.jenis === "paragraf" && (
                <textarea
                  value={blok.teks}
                  onChange={(e) => ubahBlok(i, { teks: e.target.value })}
                  rows={4}
                  placeholder="Tulis paragraf di sini..."
                  className="mt-3 w-full rounded-xl border border-primary/20 bg-card px-3 py-2 text-sm leading-relaxed text-ink focus:border-primary focus:outline-none"
                />
              )}

              {blok.jenis === "subJudul" && (
                <input
                  value={blok.teks}
                  onChange={(e) => ubahBlok(i, { teks: e.target.value })}
                  placeholder="Tulis sub judul..."
                  className="mt-3 w-full rounded-xl border border-primary/20 bg-card px-3 py-2 text-sm font-semibold text-ink focus:border-primary focus:outline-none"
                />
              )}

              {blok.jenis === "daftar" && (
                <div className="mt-3 space-y-2">
                  {blok.butir.map((b, j) => (
                    <div key={j} className="flex gap-2">
                      <input
                        value={b}
                        onChange={(e) => {
                          const butir = [...blok.butir];
                          butir[j] = e.target.value;
                          ubahBlok(i, { butir });
                        }}
                        placeholder={`Butir ${j + 1}`}
                        className="flex-1 rounded-xl border border-primary/20 bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                      />
                      <button type="button"
                        onClick={() => ubahBlok(i, { butir: blok.butir.filter((_, x) => x !== j) })}
                        aria-label="Hapus butir"
                        className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-primary-dark">
                        <X className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button type="button"
                    onClick={() => ubahBlok(i, { butir: [...blok.butir, ""] })}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-dark hover:underline">
                    <Plus className="size-3" aria-hidden="true" />
                    Tambah butir
                  </button>
                </div>
              )}

              {blok.jenis === "dalil" && (
                <div className="mt-3 space-y-2">
                  <input
                    dir="rtl"
                    lang="ar"
                    value={blok.dalil.arab}
                    onChange={(e) => ubahDalil(i, { arab: e.target.value })}
                    placeholder="Teks Arab..."
                    className="w-full rounded-xl border border-primary/20 bg-card px-3 py-2 text-right text-lg text-ink focus:border-primary focus:outline-none"
                  />
                  <textarea
                    value={blok.dalil.terjemah}
                    onChange={(e) => ubahDalil(i, { terjemah: e.target.value })}
                    rows={2}
                    placeholder="Terjemahan..."
                    className="w-full rounded-xl border border-primary/20 bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                  />
                  <input
                    value={blok.dalil.sumber}
                    onChange={(e) => ubahDalil(i, { sumber: e.target.value })}
                    placeholder="Sumber (contoh: HR. Muslim no. 809)"
                    className="w-full rounded-xl border border-primary/20 bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Menu pilih jenis blok baru */}
        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => setBukaPilihBlok((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-primary-light bg-card px-4 py-2 text-sm font-medium text-primary-dark transition-colors hover:bg-primary-light"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tambah Blok
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>

          {bukaPilihBlok && (
            <div className="absolute bottom-full left-0 z-10 mt-1 mb-2 w-56 rounded-2xl border border-primary-light bg-card p-2 shadow-md">
              {(Object.keys(JENIS_LABEL) as Array<BlokIsi["jenis"]>).map((j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => tambahBlok(j)}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-primary-light hover:text-primary-dark"
                >
                  {JENIS_LABEL[j]}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Pesan & tombol simpan ===== */}
      {pesan && (
        <p className={`rounded-2xl px-5 py-4 text-xs leading-relaxed ${
          pesan.jenis === "ok" ? "bg-primary-light text-primary-dark" : "bg-primary-light text-primary-dark"
        }`}>
          {pesan.teks}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={sedangSimpan}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          <Clock className="size-4" aria-hidden="true" />
          {sedangSimpan ? "Menyimpan..." : "Simpan Artikel"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full px-4 py-3 text-sm text-muted transition-colors hover:text-primary-dark"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

// ===== Konstanta bantu (di luar komponen agar stabil) =====

// Daftar kategori dari data (di-copy agar editor tetap client-side;
// sinkron dengan kategoriList di data/artikel.ts)
const DAFTAR_KATEGORI = [
  "Akhir Zaman",
  "Tanda Kiamat",
  "Fitnah & Dajjal",
  "Jaga Iman",
  "Ilmu & Adab",
  "Kesiapan & Taubat",
];

// Label ramah untuk tiap jenis blok
const JENIS_LABEL: Record<BlokIsi["jenis"], string> = {
  paragraf: "Paragraf",
  subJudul: "Sub Judul",
  daftar: "Daftar Butir",
  dalil: "Dalil (Ayat/Hadis)",
};

// Bersihkan blok sebelum dikirim: buang baris kosong di daftar
function bersihkanBlok(b: BlokIsi): BlokIsi {
  if (b.jenis === "daftar") {
    return { ...b, butir: b.butir.filter((x) => x.trim() !== "") };
  }
  return b;
}
