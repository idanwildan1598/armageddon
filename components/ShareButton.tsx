"use client";

/* ============================================================
   SHARE BUTTON
   Tombol bagikan artikel. Client Component karena memanggil
   Web Share API (navigator.share) dan clipboard.
   - Bila perangkat mendukung Web Share: buka menu bagikan.
   - Bila tidak: salin tautan, lalu tampilkan ikon centang.
   ============================================================ */

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface Props {
  judul: string; // dipakai sebagai teks bagikan
}

export default function ShareButton({ judul }: Props) {
  const [tersalin, setTersalin] = useState(false);

  async function bagikan() {
    const tautan = window.location.href;
    const data: ShareData = { title: judul, text: judul, url: tautan };

    // Bila browser mendukung Web Share API (umumnya di HP)
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // pengguna membatalkan bagikan; abaikan
        return;
      }
    }

    // Fallback: salin tautan ke clipboard
    try {
      await navigator.clipboard.writeText(tautan);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000); // kembali setelah 2 detik
    } catch {
      // clipboard diblokir browser; biarkan diam
    }
  }

  return (
    <button
      type="button"
      onClick={bagikan}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
    >
      {tersalin ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Share2 className="size-4" aria-hidden="true" />
      )}
      {tersalin ? "Tautan tersalin" : "Bagikan"}
    </button>
  );
}
