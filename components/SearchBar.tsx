/* ============================================================
   SEARCH BAR
   Input pencarian dengan icon Search. Controlled component:
   nilai dan perubahan dikontrol oleh induknya (ArtikelList),
   sehingga komponen ini bisa dipakai di mana saja.
   ============================================================ */

import { Search, X } from "lucide-react";

interface Props {
  nilai: string;
  onUbah: (teks: string) => void;
  placeholder?: string;
}

export default function SearchBar({ nilai, onUbah, placeholder }: Props) {
  return (
    <div className="relative">
      {/* Icon kiri */}
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder={placeholder ?? "Cari artikel..."}
        aria-label="Cari artikel"
        className="w-full rounded-2xl border border-primary-light bg-card py-3 pl-11 pr-11 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {/* Tombol bersihkan, hanya muncul saat ada teks */}
      {nilai && (
        <button
          type="button"
          onClick={() => onUbah("")}
          aria-label="Hapus pencarian"
          className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-light hover:text-primary-dark"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
