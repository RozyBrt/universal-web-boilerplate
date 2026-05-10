-- SUPABASE SETUP SCHEMA --
-- Jalankan query ini di SQL Editor Supabase kamu bray!

-- 1. Tabel Kategori
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- 2. Tabel Produk
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price bigint not null default 0,
  category text,
  stock int not null default 0,
  image_url text,
  created_at timestamptz default now()
);

-- 3. RLS (Row Level Security) - Mode Development (Public)
-- Catatan: Untuk produksi, sebaiknya diatur per User ID

alter table categories enable row level security;
create policy "Enable all access for all users" on categories for all using (true) with check (true);

alter table products enable row level security;
create policy "Enable all access for all users" on products for all using (true) with check (true);

-- 4. Storage Setup (Jalankan ini setelah membuat bucket 'product-images' di Dashboard)
-- Kasih izin buat siapa saja untuk UPLOAD (Insert) ke bucket product-images
create policy "Allow Public Upload" 
on storage.objects for insert 
with check (bucket_id = 'product-images');

-- Kasih izin buat siapa saja untuk LIHAT (Select) foto di bucket product-images
create policy "Allow Public Select" 
on storage.objects for select 
using (bucket_id = 'product-images');
