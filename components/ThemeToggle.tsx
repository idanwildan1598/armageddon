"use client";

/* ============================================================
   THEME TOGGLE
   Tombol ganti tema terang/gelap di kanan atas navbar.
   - Preferensi disimpan di localStorage (kunci: "tema").
   - Class "dark" ditambahkan/dihapus pada elemen <html>.
   - Kali pertama (belum ada preferensi), mengikuti setting
     sistem pengguna (prefers-color-scheme).
   ============================================================ */

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  // Mulai null agar icon tidak salah tampil sebelum sinkron
  // dengan class yang sudah dipasang script anti-kedip di layout.
  const [gelap, setGelap] = useState<boolean | null>(null);

  // Saat komponen terpasang: baca kondisi tema saat ini dari <html>
  useEffect(() => {
    setGelap(document.documentElement.classList.contains("dark"));
  }, []);

  function gantiTema() {
    const berikutnya = !gelap;
    setGelap(berikutnya);

    // Terapkan class pada <html>
    document.documentElement.classList.toggle("dark", berikutnya);

    // Simpan preferensi untuk kunjungan berikutnya
    try {
      localStorage.setItem("tema", berikutnya ? "gelap" : "terang");
    } catch {
      // localStorage diblokir (mode privat); abaikan
    }
  }

  return (
    <button
      type="button"
      onClick={gantiTema}
      aria-label={gelap ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      className="flex size-10 shrink-0 items-center justify-center rounded-xl text-ink transition-colors hover:bg-primary-light hover:text-primary-dark"
    >
      {/* Icon tampil sesuai tema aktif */}
      {gelap ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
