"use client";

/* ============================================================
   TOMBOL KELUAR
   Client Component: memanggil /api/keluar lalu kembali
   ke beranda.
   ============================================================ */

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function TombolKeluar() {
  const router = useRouter();

  async function keluar() {
    await fetch("/api/keluar", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={keluar}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
    >
      <LogOut className="size-4" aria-hidden="true" />
      Keluar
    </button>
  );
}
