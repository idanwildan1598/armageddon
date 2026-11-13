"use client";

/* ============================================================
   TOMBOL HAPUS ARTIKEL
   Konfirmasi dulu, lalu kirim permintaan hapus ke API.
   ============================================================ */

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Props {
  slug: string;
  judul: string;
}

export default function TombolHapus({ slug, judul }: Props) {
  const router = useRouter();
  const [sedangHapus, setSedangHapus] = useState(false);
  const [pesan, setPesan] = useState<string | null>(null);

  async function hapus() {
    // Konfirmasi sebelum menghapus
    if (!confirm(`Hapus artikel "${judul}"? Tindakan ini tidak bisa dibatalkan.`)) {
      return;
    }

    setSedangHapus(true);
    setPesan(null);
    try {
      const res = await fetch("/api/admin/hapus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.refresh(); // muat ulang daftar dari server
        return;
      }
      setPesan(data.pesan ?? "Gagal menghapus");
    } catch {
      setPesan("Terjadi kesalahan jaringan");
    } finally {
      setSedangHapus(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={hapus}
        disabled={sedangHapus}
        aria-label={`Hapus ${judul}`}
        className="flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-primary-light hover:text-primary-dark disabled:opacity-50"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
      {pesan && <p className="text-xs text-primary-dark">{pesan}</p>}
    </div>
  );
}
