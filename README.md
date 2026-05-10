# 🚀 Universal Web Boilerplate

Boilerplate Next.js modern yang dirancang untuk kecepatan pengembangan (Vibe Coding ready). Dilengkapi dengan arsitektur yang teruji, otomatisasi fitur, dan integrasi Supabase.

---

## 🛠️ Fitur Utama
- **Automated Module Generator**: Bikin fitur CRUD lengkap (Repo, Hook, UI) cuma satu perintah.
- **Dependency Injection (DI)**: Pemisahan logic yang rapi dengan Inversion of Control.
- **Repository Pattern**: Abstraksi database yang konsisten.
- **Premium UI**: Dashboard admin modern menggunakan Tailwind CSS & Lucide Icons.
- **Industrial UX**: Loading states, toast notifications (react-hot-toast), dan network resilience.
- **Supabase Integrated**: Auth, Database, dan Storage (Image Upload).

---

## 🏁 Memulai (Quick Start)

### 1. Kloning Projek
Copy seluruh folder ini (kecuali `.git`, `.next`, dan `node_modules`). Jalankan:
```bash
npm install
```

### 2. Setup Environment (`.env.local`)
Buat file `.env.local` di root folder:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```
*Dapatkan di: Dashboard Supabase -> Settings -> API.*

### 3. Konfigurasi Supabase (Wajib!)

**A. Authentication**
- Dashboard Supabase -> **Authentication** -> **Providers**.
- Pastikan **Email** enabled.
- Matikan **Confirm Email** (untuk fase development agar tidak perlu verifikasi link email).

**B. Storage (Foto Produk)**
1. Dashboard Supabase -> **Storage** -> **New Bucket**.
2. Beri nama: `product-images`.
3. Centang **Public Bucket**.
4. Klik **Save**.

**C. SQL Editor (Database & Policy)**
1. Buka file `./supabase/setup.sql` di projek ini.
2. Copy semua isinya.
3. Dashboard Supabase -> **SQL Editor** -> **New Query**.
4. Paste dan klik **Run**.
*Ini akan otomatis membuat tabel dan mengatur izin (RLS) agar aplikasi bisa akses data.*

---

## ⚡ Cara Menambah Fitur Baru (Module Generator)

Gunakan perintah sakti ini untuk membuat modul baru:
```bash
npm run generate:module NamaModul
```
*Contoh: `npm run generate:module Supplier`*

**⚠️ Langkah Penting Setelah Generate:**

1. **Registrasi DI**:
   Buka `src/core/di/bootstrap.ts`. Daftarkan repository baru agar bisa dipanggil oleh Hook:
   ```typescript
   container.registerFactory("supplierRepository", () => new SupplierRepository());
   ```
   *(Gunakan huruf kecil untuk nama key repository-nya)*

2. **Update Sidebar**:
   Buka `src/app/(protected)/dashboard/layout.tsx`. Tambahkan link menu baru di bagian navigasi.

3. **Buat Tabel di Supabase**:
   Jangan lupa buat tabel di Supabase SQL Editor sesuai nama modulnya (plural/jamak). Contoh: `suppliers`.

---

## 📂 Struktur Arsitektur (Pahami ini bray!)
- `src/core/di`: Tempat registrasi semua "mesin" (repository/auth).
- `src/core/database/repositories`: Logic query database (SQL).
- `src/core/database/hooks`: Logic state UI (Loading, Success, Error).
- `src/app/(protected)`: Semua halaman dashboard yang butuh login.
- `supabase/setup.sql`: Mantra SQL untuk setup database awal.

---

## ❓ Troubleshooting
- **Gagal Simpan/Update?**: Cek apakah RLS Policy di Supabase sudah aktif. Jalankan ulang script di `setup.sql`.
- **Gambar Tidak Muncul?**: Cek apakah bucket `product-images` sudah diset ke **Public**.
- **Error "Cannot resolve repository"?**: Berarti kamu lupa melakukan langkah **Registrasi DI** di `bootstrap.ts`.

---

## ⚖️ Lisensi
Dibuat dengan ❤️. Gunakan sepuasnya bray! 🍢🚀🔥
