# 🚀 Universal Web Boilerplate

Boilerplate Next.js modern yang dirancang untuk kecepatan pengembangan (Vibe Coding ready). Dilengkapi dengan arsitektur yang teruji, otomatisasi fitur, dan integrasi Supabase.

---

## 🛠️ Fitur Utama
- **Automated Module Generator**: Bikin fitur CRUD lengkap (Repo, Hook, UI) cuma satu perintah.
- **Dependency Injection (DI)**: Pemisahan logic yang rapi dengan Inversion of Control.
- **Repository Pattern**: Abstraksi database yang konsisten dan mudah di-unit test.
- **Premium UI**: Dashboard admin modern menggunakan Tailwind CSS & Lucide Icons.
- **Industrial UX**: Loading states, toast notifications (react-hot-toast), dan network resilience.
- **Supabase Integrated**: Auth, Database, dan Storage (Image Upload) sudah terkonfigurasi.

---

## 🏁 Memulai (Quick Start)

### 1. Kloning Projek
```bash
# Copy folder ini ke folder projek baru kamu
# Hapus folder .git, .next, dan node_modules
npm install
```

### 2. Setup Environment
Buat file `.env.local` dan isi dengan kredensial Supabase kamu:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Setup Supabase (Langkah Krusial)
Boilerplate ini membutuhkan konfigurasi database awal:

**A. Membuat Bucket Storage**
1. Buka Supabase Dashboard -> **Storage**.
2. Buat bucket baru bernama: `product-images`.
3. Set bucket tersebut menjadi **Public**.

**B. Menjalankan SQL Schema**
1. Buka Supabase Dashboard -> **SQL Editor**.
2. Buka file `./supabase/setup.sql` di projek ini.
3. Copy semua isinya dan jalankan (Run) di SQL Editor.

---

## ⚡ Cara Menambah Fitur Baru (Module Generator)

Gunakan perintah sakti ini untuk membuat modul baru secara otomatis:
```bash
npm run generate:module NamaModul
```
*Contoh: `npm run generate:module Supplier`*

**Setelah generate selesai, lakukan 2 langkah ini:**
1. **Daftarkan Repository**: Buka `src/core/di/bootstrap.ts`, tambahkan:
   `container.registerFactory("namaModulRepository", () => new NamaModulRepository());`
2. **Tambah ke Sidebar**: Buka `src/app/(protected)/dashboard/layout.tsx`, tambahkan link menunya.

---

## 📂 Struktur Arsitektur
- `src/core/di`: Dependency Injection container.
- `src/core/database/repositories`: Semua logic database.
- `src/core/database/hooks`: Custom hooks untuk akses data ke UI.
- `src/app/(protected)`: Halaman-halaman dashboard (authenticated only).
- `scripts/`: Berisi automation scripts (generator).
- `supabase/`: Berisi dokumentasi setup database.

---

## ⚖️ Lisensi
Dibuat dengan ❤️ untuk komunitas programmer sat-set. Gunakan, modifikasi, dan hasilkan cuan sebanyak-banyaknya bray! 🍢🚀🔥
