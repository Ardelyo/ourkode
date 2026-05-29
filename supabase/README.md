# Skema Database OurCode

File ini berisi seluruh DDL (Data Definition Language) untuk setup database OurCode di Supabase — tabel, RLS policies, dan seed data awal.

## Cara Pakai

1. Buka project Supabase kamu
2. Pergi ke **SQL Editor**
3. Salin seluruh isi `schema.sql` dan jalankan
4. Selesai — tabel sudah ada, RLS aktif, dan 5 proyek seed sudah masuk

> **Hati-hati:** Script dimulai dengan `DROP TABLE IF EXISTS` — kalau sudah ada data di tabel `projects` atau `contact_submissions`, data itu akan terhapus. Pakai ini hanya untuk setup awal atau reset total.

## Struktur Tabel

### `projects`

Menyimpan semua proyek yang sudah dan belum dikurasi.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | TEXT | Primary key — UUID yang di-generate client-side |
| `title` | TEXT | Nama proyek |
| `category` | TEXT | Kategori utama (misal: "SUMBER TERBUKA", "KLIEN") |
| `year` | TEXT | Tahun proyek dibuat/dirilis |
| `author` | TEXT | Nama pembuat |
| `version` | TEXT | Versi saat ini (opsional) |
| `license` | TEXT | Lisensi proyek (opsional) |
| `repository` | TEXT | URL repositori |
| `image` | TEXT | URL gambar sampul |
| `summary` | TEXT | Deskripsi singkat satu paragraf |
| `tech_stack` | TEXT[] | Array nama teknologi yang dipakai |
| `categories` | TEXT[] | Tag tambahan untuk filtering |
| `stats` | JSONB | Data GitHub (stars, forks, contributors, issues) |
| `gallery` | TEXT[] | Array URL gambar untuk galeri |
| `toc` | JSONB | Daftar isi artikel (array `{id, label}`) |
| `content` | JSONB | Isi artikel (array content blocks) |
| `status` | TEXT | `PENDING`, `APPROVED`, `PUBLISHED`, atau `REJECTED` |
| `created_at` | TIMESTAMPTZ | Timestamp otomatis |

### `contact_submissions`

Menyimpan pesan masuk dari formulir kontak.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | UUID | Primary key — di-generate otomatis Supabase |
| `name` | TEXT | Nama pengirim |
| `email` | TEXT | Email pengirim |
| `message` | TEXT | Isi pesan |
| `honeypot` | TEXT | Field jebakan bot — harus NULL untuk lolos RLS |
| `created_at` | TIMESTAMPTZ | Timestamp otomatis |

## RLS Policies

Row Level Security aktif di kedua tabel. Ringkasannya:

**`projects`:**
- Siapa saja bisa SELECT baris dengan `status = 'PUBLISHED'`
- Siapa saja bisa INSERT, tapi hanya kalau `status = 'PENDING'` — tidak bisa langsung bypass ke PUBLISHED

**`contact_submissions`:**
- Siapa saja bisa INSERT, tapi hanya kalau kolom `honeypot` bernilai NULL

Tidak ada policy untuk UPDATE atau DELETE — operasi itu hanya bisa dilakukan melalui Supabase dashboard (by admin).

## Content Blocks

Field `content` di tabel `projects` adalah array JSON. Setiap elemen adalah "blok" yang dirender berbeda tergantung `type`-nya:

```json
{ "type": "heading", "id": "section-id", "text": "Judul Section" }
{ "type": "paragraph", "text": "Isi paragraf." }
{ "type": "image", "url": "https://...", "caption": "Keterangan gambar" }
{ "type": "quote", "text": "Kutipan yang ingin ditonjolkan." }
{ "type": "list", "items": ["item 1", "item 2"] }
{ "type": "code", "language": "typescript", "code": "const x = 1;" }
```

Field `toc` adalah array ringkas untuk navigasi sidebar:

```json
[
  { "id": "section-id", "label": "1. Judul Section" }
]
```

`id` di TOC harus cocok dengan `id` di content block bertipe `heading`.
