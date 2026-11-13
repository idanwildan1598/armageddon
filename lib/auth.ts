/* ============================================================
   AUTENTIKASI ADMIN
   Login 1 akun (tanpa database):
   - Password WAJIB diatur lewat variabel lingkungan
     ADMIN_PASSWORD: di .env.local (lokal) atau Environment
     Variables (Vercel). TIDAK ADA password bawaan di kode —
     sehingga tidak ada rahasia yang pernah tertulis di sini.
   - Sesi disimpan sebagai cookie HTTP-only berisi token
     HMAC-SHA256, sehingga tidak bisa dipalsukan dari browser.
   ============================================================ */

import { createHmac, timingSafeEqual } from "crypto";

// Nama cookie sesi
export const COOKIE_SESI = "sesi_admin";

// Durasi sesi: 7 hari (detik)
export const DURASI_SESI = 60 * 60 * 24 * 7;

// Kunci rahasia untuk menandatangani token sesi (wajib diatur)
function rahasia(): string {
  const kunci = process.env.AUTH_SECRET;
  if (!kunci) {
    throw new Error(
      "AUTH_SECRET belum diatur. Isi di file .env.local (lokal) " +
        "atau Environment Variables (Vercel).",
    );
  }
  return kunci;
}

// Password admin (wajib diatur, tanpa nilai bawaan)
export function sandiAdmin(): string {
  const sandi = process.env.ADMIN_PASSWORD;
  if (!sandi) {
    throw new Error(
      "ADMIN_PASSWORD belum diatur. Isi di file .env.local (lokal) " +
        "atau Environment Variables (Vercel).",
    );
  }
  return sandi;
}

// Periksa password yang dikirim user (bandingkan aman, anti timing attack)
export function sandiBenar(input: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(sandiAdmin());
  return a.length === b.length && timingSafeEqual(a, b);
}

// Buat token sesi dari kunci rahasia
export function bikinToken(): string {
  return createHmac("sha256", rahasia()).update("admin-akhir-zaman").digest("hex");
}

// Verifikasi token dari cookie
export function tokenValid(token: string | undefined | null): boolean {
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(bikinToken());
  try {
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
