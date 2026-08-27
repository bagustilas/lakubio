-- ============================================================
-- LAKUBIO — Skema Database (jalankan di Supabase SQL Editor)
-- Tabel: stores, products, store_views, RLS policies, & storage
-- ============================================================

-- Ekstensi untuk generate UUID (biasanya sudah aktif di Supabase)
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- Tabel: stores
-- 1 user (auth.users) bisa punya 1 toko di versi MVP ini
-- ------------------------------------------------------------
create table if not exists public.stores (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  slug text not null unique,
  name text not null,
  whatsapp_number text not null,
  description text,
  logo_url text,
  theme_color text default '#2F6B4F',
  is_open boolean not null default true,
  is_pro boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Slug hanya boleh huruf kecil, angka, dan tanda hubung
alter table public.stores
  add constraint stores_slug_format check (slug ~ '^[a-z0-9-]{3,40}$');

create unique index if not exists stores_owner_id_idx on public.stores (owner_id);

-- ------------------------------------------------------------
-- Tabel: products
-- ------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores (id) on delete cascade,
  name text not null,
  price numeric(12, 2) not null check (price >= 0),
  description text,
  photo_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_store_id_idx on public.products (store_id);

-- ------------------------------------------------------------
-- Tabel: store_views (Statistik Pengunjung Toko)
-- ------------------------------------------------------------
create table if not exists public.store_views (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores (id) on delete cascade,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists store_views_store_id_idx on public.store_views (store_id);
create index if not exists store_views_created_at_idx on public.store_views (created_at);

-- ------------------------------------------------------------
-- Trigger sederhana untuk auto-update updated_at
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists stores_set_updated_at on public.stores;
create trigger stores_set_updated_at
  before update on public.stores
  for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.stores enable row level security;
alter table public.products enable row level security;
alter table public.store_views enable row level security;

-- STORES: siapa saja boleh membaca toko (untuk halaman publik /[slug])
create policy "Toko dapat dibaca publik"
  on public.stores for select
  using (true);

-- STORES: hanya pemilik yang boleh membuat toko miliknya sendiri
create policy "Pemilik dapat membuat toko"
  on public.stores for insert
  with check (auth.uid() = owner_id);

-- STORES: hanya pemilik yang boleh mengubah tokonya sendiri
create policy "Pemilik dapat mengubah toko"
  on public.stores for update
  using (auth.uid() = owner_id);

-- STORES: hanya pemilik yang boleh menghapus tokonya sendiri
create policy "Pemilik dapat menghapus toko"
  on public.stores for delete
  using (auth.uid() = owner_id);

-- PRODUCTS: siapa saja boleh membaca produk dari toko yang aktif (untuk halaman publik)
create policy "Produk dapat dibaca publik"
  on public.products for select
  using (true);

-- PRODUCTS: hanya pemilik toko terkait yang boleh menambah produk
create policy "Pemilik dapat menambah produk"
  on public.products for insert
  with check (
    exists (
      select 1 from public.stores
      where stores.id = products.store_id
      and stores.owner_id = auth.uid()
    )
  );

-- PRODUCTS: hanya pemilik toko terkait yang boleh mengubah produk
create policy "Pemilik dapat mengubah produk"
  on public.products for update
  using (
    exists (
      select 1 from public.stores
      where stores.id = products.store_id
      and stores.owner_id = auth.uid()
    )
  );

-- PRODUCTS: hanya pemilik toko terkait yang boleh menghapus produk
create policy "Pemilik dapat menghapus produk"
  on public.products for delete
  using (
    exists (
      select 1 from public.stores
      where stores.id = products.store_id
      and stores.owner_id = auth.uid()
    )
  );

-- STORE_VIEWS: siapa saja boleh mencatat kunjungan saat melihat toko
create policy "Publik boleh mencatat kunjungan"
  on public.store_views for insert
  with check (true);

-- STORE_VIEWS: hanya pemilik toko yang boleh melihat statistik kunjungannya
create policy "Pemilik boleh melihat statistik kunjungan"
  on public.store_views for select
  using (
    exists (
      select 1 from public.stores
      where stores.id = store_views.store_id
      and stores.owner_id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- Storage bucket untuk foto produk & logo toko
-- Jalankan bagian ini juga, atau buat manual lewat dashboard Storage
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('store-assets', 'store-assets', true)
on conflict (id) do nothing;

create policy "Siapa saja boleh melihat file toko"
  on storage.objects for select
  using (bucket_id = 'store-assets');

create policy "User login boleh upload file toko"
  on storage.objects for insert
  with check (bucket_id = 'store-assets' and auth.role() = 'authenticated');

create policy "User login boleh update file toko miliknya"
  on storage.objects for update
  using (bucket_id = 'store-assets' and auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- view untuk mendapatkan view dari toko yang di kunjungi oleh customer
-- Jalankan bagian ini juga, untuk membuat table views
-- ------------------------------------------------------------

create table if not exists public.store_views (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores (id) on delete cascade,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists store_views_store_id_idx on public.store_views (store_id);

alter table public.store_views enable row level security;

create policy "Siapa saja boleh mencatat kunjungan"
  on public.store_views for insert
  with check (true);

create policy "Pemilik dapat membaca statistik tokonya"
  on public.store_views for select
  using (
    exists (
      select 1 from public.stores
      where stores.id = store_views.store_id
      and stores.owner_id = auth.uid()
    )
  );