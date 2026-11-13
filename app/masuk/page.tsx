"use client";

/* ============================================================
   HALAMAN LOGIN
   Form password tunggal. Sukses: cookie sesi diterbitkan
   server, lalu diarahkan ke panel /admin.
   ============================================================ */

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function MasukPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [lihat, setLihat] = useState(false); // tampil/sembunyi password
  const [sedangKirim, setSedangKirim] = useState(false);
  const [pesan, setPesan] = useState<string | null>(null);

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    setSedangKirim(true);
    setPesan(null);

    try {
      const res = await fetch("/api/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.push("/admin"); // masuk ke panel admin
        router.refresh();
        return;
      }
      setPesan(data.pesan ?? "Gagal masuk");
    } catch {
      setPesan("Terjadi kesalahan jaringan");
    } finally {
      setSedangKirim(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-24 sm:px-6">
      {/* Ikon + judul */}
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-light">
          <Lock className="size-7 text-primary-dark" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-ink">Masuk Admin</h1>
        <p className="mt-2 text-sm text-muted">
          Masukkan password admin untuk mengelola artikel.
        </p>
      </div>

      {/* Form login */}
      <form onSubmit={kirim} className="mt-8 rounded-2xl border border-primary-light bg-card p-6 shadow-sm">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            type={lihat ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-2xl border border-primary-light bg-background py-3 pl-4 pr-11 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {/* Tombol tampil/sembunyikan password */}
          <button
            type="button"
            onClick={() => setLihat((v) => !v)}
            aria-label={lihat ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary-dark"
          >
            {lihat ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Pesan error */}
        {pesan && (
          <p className="mt-3 rounded-xl bg-primary-light px-3 py-2 text-xs text-primary-dark">
            {pesan}
          </p>
        )}

        <button
          type="submit"
          disabled={sedangKirim}
          className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          {sedangKirim ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
