/* ============================================================
   AUTENTIKASI ADMIN
   Login 1 akun (tanpa database):
   - Password diambil dari variabel lingkungan ADMIN_PASSWORD
     (file .env.local). Default "010598" hanya untuk
     pengembangan lokal — WAJIB diganti sebelum deploy.
   - Sesi disimpan sebagai cookie HTTP-only berisi token
     HMAC-SHA256, sehingga tidak bisa dipalsukan dari browser.
   ============================================================ */

import { createHmac, timingSafeEqual } from "crypto";

// Nama cookie sesi
export const COOKIE_SESI = "sesi_admin";

// Durasi sesi: 7 hari (detik)
export const DURASI_SESI = 60 * 60 * 24 * 7;

// Kunci rahasia untuk menandatangani token sesi
function rahasia(): string {
  return process.env.AUTH_SECRET ?? "rahasia-dev-ganti-di-env-local";
}

// Password admin (default hanya untuk pengembangan)
export function sandiAdmin(): string {
  return process.env.ADMIN_PASSWORD ?? "rahasiaadalahsesuatuyangtidakbolehdiketahuioranglain";
}

// True bila masih memakai password default (untuk peringatan di panel)
export function sandiDefault(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

// Periksa password yang dikirim user
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
