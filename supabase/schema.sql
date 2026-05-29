-- ====================================================================
-- OURCODE - DATABASE SCHEMA & SEED DATA FOR SUPABASE
-- ====================================================================
-- Copy and paste this entire SQL script into the Supabase SQL Editor
-- to set up your tables, security policies, and seed data.
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. Create Tables
-- --------------------------------------------------------------------

-- Drop existing tables if you are doing a reset
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS projects;

-- Create Projects Table
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    year TEXT NOT NULL,
    author TEXT NOT NULL,
    version TEXT,
    license TEXT,
    repository TEXT,
    image TEXT,
    summary TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    categories TEXT[] DEFAULT '{}',
    stats JSONB DEFAULT '{}'::jsonb,
    gallery TEXT[] DEFAULT '{}',
    toc JSONB DEFAULT '[]'::jsonb,
    content JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'PUBLISHED' CHECK (status IN ('PENDING', 'APPROVED', 'PUBLISHED', 'REJECTED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Contact Submissions Table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    honeypot TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. Configure Row Level Security (RLS)
-- --------------------------------------------------------------------

-- Enable RLS on both tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for 'projects'
CREATE POLICY "Allow public read access to published projects" 
ON projects FOR SELECT 
TO public 
USING (status = 'PUBLISHED');

CREATE POLICY "Allow anyone to submit/insert a project" 
ON projects FOR INSERT 
TO public 
WITH CHECK (status = 'PENDING');

-- Policies for 'contact_submissions'
CREATE POLICY "Allow anyone to insert contact submissions" 
ON contact_submissions FOR INSERT 
TO public 
WITH CHECK (honeypot IS NULL);


-- --------------------------------------------------------------------
-- 3. Seed Projects Data
-- --------------------------------------------------------------------

INSERT INTO projects (
    id, title, category, year, author, version, license, repository, image, summary, 
    tech_stack, categories, stats, gallery, toc, content, status
) VALUES 
(
    '01', 
    'SISTEM DESA', 
    'SUMBER TERBUKA', 
    '2025', 
    'Arif Rahman & Tim', 
    'v2.4.0', 
    'MIT', 
    'github.com/ourcreativity/sistem-desa', 
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop', 
    'Sistem Desa itu platform open-source komprehensif yang dibikin buat digitalisasi administrasi dan pelayanan publik di desa-desa seluruh Indonesia.',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis'],
    ARRAY['E-Government', 'Public Service', 'Web App', 'Monorepo', 'Civic Tech'],
    '{"stars": "1.2k", "forks": "340", "issues": "12 open", "contributors": "45"}'::jsonb,
    ARRAY[
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
    ],
    '[
        {"id": "latar-belakang", "label": "1. Latar Belakang & Visi"},
        {"id": "arsitektur", "label": "2. Arsitektur Sistem & Keputusan Teknis"},
        {"id": "implementasi-kode", "label": "3. Implementasi Kode (Caching)"},
        {"id": "fitur-utama", "label": "4. Fitur Utama"},
        {"id": "dampak", "label": "5. Dampak & Implementasi"}
    ]'::jsonb,
    '[
        {"id": "latar-belakang", "type": "heading", "text": "Latar Belakang & Visi"},
        {"type": "paragraph", "text": "Di era digital ini, banyak desa di Indonesia masih pake kertas buat administrasi. Ini bikin pelayanan lambat dan gampang ilang datanya. Makanya, OurCreativity bikin Sistem Desa di awal 2024 buat menuhin kebutuhan software yang gratis, aman, dan gampang dipake sama aparat desa."},
        {"type": "paragraph", "text": "Visi kita simpel: \"Tiap desa berhak dapet infrastruktur digital kelas dunia, tanpa harus bayar lisensi software yang mahal.\" Lewat open-source, kita mastiin keamanan yang transparan dan ngasih ruang buat inovasi dari komunitas developer lokal."},
        {"url": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop", "type": "image", "caption": "Tampilan antarmuka dashboard admin Sistem Desa versi 2.0."},
        {"id": "arsitektur", "type": "heading", "text": "Arsitektur Sistem & Keputusan Teknis"},
        {"type": "paragraph", "text": "Sistem ini dibangun pake arsitektur monorepo modern. Frontend-nya pake React dan TypeScript biar aman dan responsif. Backend-nya pake Node.js sama Express, nyambung ke database PostgreSQL yang kuat buat nanganin data penduduk yang ribet."},
        {"type": "quote", "text": "\"Kode yang bagus itu kode yang bisa dibaca dan dikembangin sama siapa aja. Makanya kita milih tech stack yang paling umum dan dokumentasinya lengkap di komunitas.\" - Arif Rahman, Kepala Teknisi."},
        {"type": "paragraph", "text": "Biar sistemnya selalu nyala dan cepet walau internetnya lemot, kita pake strategi caching agresif pake Redis dan optimasi payload API. Semua infrastrukturnya dibungkus di Docker biar gampang di-deploy di mana aja (on-premise atau cloud)."},
        {"id": "implementasi-kode", "type": "heading", "text": "Implementasi Kode (Caching)"},
        {"type": "paragraph", "text": "Ini contoh implementasi service worker dan Redis buat caching data penduduk, biar aplikasinya tetep cepet walau koneksi database lagi lemot:"},
        {
            "code": "// src/services/population.service.ts\\nimport { redis } from ''@/lib/redis'';\\nimport { db } from ''@/lib/db'';\\n\\nexport async function getPopulationData(villageId: string) {\\n  const cacheKey = `population:${villageId}`;\\n  \\n  try {\\n    // 1. Try fetching from Redis cache first (O(1) time complexity)\\n    const cached = await redis.get(cacheKey);\\n    if (cached) {\\n      console.log(''[CACHE HIT] Serving from Redis'');\\n      return JSON.parse(cached);\\n    }\\n\\n    // 2. Fallback to PostgreSQL database\\n    console.log(''[CACHE MISS] Querying Database'');\\n    const data = await db.population.findMany({\\n      where: { villageId, status: ''ACTIVE'' },\\n      include: { familyCard: true }\\n    });\\n\\n    // 3. Set cache with 1 hour TTL (Time To Live)\\n    await redis.setex(cacheKey, 3600, JSON.stringify(data));\\n    \\n    return data;\\n  } catch (error) {\\n    console.error(''Failed to fetch population data:'', error);\\n    throw new Error(''Service Unavailable'');\\n  }\\n}",
            "type": "code",
            "language": "typescript"
        },
        {"id": "fitur-utama", "type": "heading", "text": "Fitur Utama"},
        {
            "type": "list",
            "items": [
                "Manajemen Data Penduduk (Kelahiran, Kematian, Mutasi) dengan validasi NIK terintegrasi.",
                "Pembuatan Surat Keterangan Otomatis (PDF Generator) dengan tanda tangan digital.",
                "Sistem Pelaporan Warga Berbasis Web (Pengaduan Masyarakat).",
                "Dashboard Statistik Demografi Real-time dengan visualisasi interaktif.",
                "Manajemen Anggaran Pendapatan dan Belanja Desa (APBDes) yang transparan.",
                "Sistem Informasi Geografis (GIS) untuk pemetaan batas wilayah dan infrastruktur desa."
            ]
        },
        {"id": "dampak", "type": "heading", "text": "Dampak & Implementasi"},
        {"type": "paragraph", "text": "Semenjak rilis versi stabil pertama (v1.0.0) di pertengahan 2024, Sistem Desa udah dipake sama lebih dari 150 desa di berbagai provinsi. Komunitas open-source juga udah nyumbang lebih dari 500 pull request, benerin bug, dan nambahin fitur bahasa daerah."},
        {"type": "paragraph", "text": "Dampak nyatanya, waktu buat ngurus surat-surat yang tadinya rata-rata 45 menit sekarang cuma 5 menit per warga. Akurasi data penduduk juga naik drastis berkat sistem validasi otomatis yang nyegah data dobel."}
    ]'::jsonb,
    'PUBLISHED'
),
(
    '02', 
    'OURCREATIVITY HUB', 
    'INTERNAL', 
    '2024', 
    'Internal Team', 
    'v1.1.0', 
    'Proprietary', 
    'github.com/ourcreativity/hub', 
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop', 
    'Platform internal untuk manajemen proyek dan kolaborasi tim OurCreativity.',
    ARRAY['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    ARRAY['Internal', 'Dashboard', 'Management'],
    '{"stars": "N/A", "forks": "N/A", "issues": "2 open", "contributors": "15"}'::jsonb,
    ARRAY[
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop'
    ],
    '[
        {"id": "latar-belakang", "label": "1. Latar Belakang & Kebutuhan"},
        {"id": "arsitektur", "label": "2. Arsitektur & Teknologi"},
        {"id": "fitur-kolaborasi", "label": "3. Fitur Kolaborasi Utama"}
    ]'::jsonb,
    '[
        {"id": "latar-belakang", "type": "heading", "text": "Latar Belakang & Kebutuhan"},
        {"type": "paragraph", "text": "Seiring bertambahnya anggota dan proyek di ekosistem OurCreativity, koordinasi lewat chat grup dirasa kurang terstruktur. Oleh karena itu, tim merancang OurCreativity Hub sebagai portal internal satu pintu untuk mengelola workflow, repositori, dan dokumentasi teknis secara efisien."},
        {"id": "arsitektur", "type": "heading", "text": "Arsitektur & Teknologi"},
        {"type": "paragraph", "text": "Aplikasi ini menggunakan MERN stack (MongoDB, Express, React, Node.js) yang ringan namun powerful. Tailwind CSS digunakan untuk merancang antarmuka panel admin yang minimalis dan ramah pengguna dengan performa rendering cepat."},
        {"id": "fitur-kolaborasi", "type": "heading", "text": "Fitur Kolaborasi Utama"},
        {
            "type": "list",
            "items": [
                "Manajemen tugas kanban board terintegrasi untuk pembagian tugas developer.",
                "Sistem wiki internal untuk menyimpan dokumentasi API dan standard operating procedure (SOP).",
                "Monitoring repositori Git dan status integrasi berkelanjutan (CI/CD) secara langsung.",
                "Kalender bersama untuk koordinasi jadwal rilis proyek dan agenda demo day."
            ]
        }
    ]'::jsonb,
    'PUBLISHED'
),
(
    '03', 
    'NEXUS API', 
    'SUMBER TERTUTUP', 
    '2026', 
    'Backend Team', 
    'v3.0.0', 
    'Commercial', 
    'github.com/ourcreativity/nexus-api', 
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop', 
    'API Gateway Enterprise untuk menghubungkan berbagai layanan terintegrasi dengan performa tinggi dan keamanan maksimal.',
    ARRAY['Go', 'Redis', 'PostgreSQL', 'Kafka'],
    ARRAY['API', 'Backend', 'Enterprise'],
    '{"stars": "N/A", "forks": "N/A", "issues": "0 open", "contributors": "8"}'::jsonb,
    ARRAY[
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'
    ],
    '[
        {"id": "skala-enterprise", "label": "1. Skala Enterprise & Kebutuhan Bisnis"},
        {"id": "performa-tinggi", "label": "2. Performa Tinggi & Go Concurrency"},
        {"id": "fitur-keamanan", "label": "3. Keamanan & Fitur Utama"}
    ]'::jsonb,
    '[
        {"id": "skala-enterprise", "type": "heading", "text": "Skala Enterprise & Kebutuhan Bisnis"},
        {"type": "paragraph", "text": "Dengan berkembangnya ekosistem microservices pada klien komersial kami, dibutuhkan satu gerbang utama (API Gateway) yang aman dan mampu mengarahkan lalu lintas data dalam volume sangat besar tanpa mengorbankan kecepatan."},
        {"id": "performa-tinggi", "type": "heading", "text": "Performa Tinggi & Go Concurrency"},
        {"type": "paragraph", "text": "Nexus API dibangun menggunakan bahasa pemrograman Go (Golang) untuk memaksimalkan efisiensi memory footprint dan pemanfaatan konkurensi (Goroutines). Sistem ini dibantu oleh Redis sebagai cache layer dan Apache Kafka untuk menangani stream antrean data log secara asinkronus."},
        {"id": "fitur-keamanan", "type": "heading", "text": "Keamanan & Fitur Utama"},
        {
            "type": "list",
            "items": [
                "Dynamic Rate Limiting menggunakan algoritma token bucket.",
                "Autentikasi terpusat berbasis JSON Web Token (JWT) dengan OAuth2 fallback.",
                "Automatic API Documentation generator via OpenAPI/Swagger.",
                "Sistem load balancing bawaan dengan deteksi kegagalan server otomatis."
            ]
        }
    ]'::jsonb,
    'PUBLISHED'
),
(
    '04', 
    'E-LEARNING PLATFORM', 
    'SUMBER TERBUKA', 
    '2025', 
    'EduTech Team', 
    'v1.5.2', 
    'MIT', 
    'github.com/ourcreativity/e-learning', 
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2000&auto=format&fit=crop', 
    'Platform pembelajaran digital gratis dan terbuka untuk pemerataan pendidikan di area tertinggal.',
    ARRAY['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
    ARRAY['Education', 'Open Source', 'Platform'],
    '{"stars": "850", "forks": "210", "issues": "8 open", "contributors": "32"}'::jsonb,
    ARRAY[
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop'
    ],
    '[
        {"id": "misi-pendidikan", "label": "1. Misi Sosial & Pemerataan Akses"},
        {"id": "arsitektur-modern", "label": "2. Arsitektur Modern Supabase & Next.js"},
        {"id": "fitur-interaktif", "label": "3. Fitur Interaktif"}
    ]'::jsonb,
    '[
        {"id": "misi-pendidikan", "type": "heading", "text": "Misi Sosial & Pemerataan Akses"},
        {"type": "paragraph", "text": "Akses pendidikan berkualitas di wilayah 3T (Tertinggal, Terdepan, dan Terluar) seringkali terhambat oleh keterbatasan koneksi internet dan perangkat keras. Platform E-Learning ini didesain agar sangat ringan, dapat diakses secara offline, dan menggunakan konsumsi bandwidth sehemat mungkin."},
        {"id": "arsitektur-modern", "type": "heading", "text": "Arsitektur Modern Supabase & Next.js"},
        {"type": "paragraph", "text": "Kami menggunakan Next.js dengan optimasi Static Site Generation (SSG) dan Incremental Static Regeneration (ISR). Hal ini memungkinkan ribuan halaman modul pembelajaran dimuat hampir instan. Database dan Autentikasi didukung penuh oleh Supabase."},
        {"id": "fitur-interaktif", "type": "heading", "text": "Fitur Interaktif"},
        {
            "type": "list",
            "items": [
                "Akses modul pembelajaran video berukuran kecil dan teks teroptimasi.",
                "Sistem kuis interaktif dengan umpan balik langsung.",
                "Dashboard pencapaian belajar siswa dengan grafik kemajuan belajar.",
                "Mode hemat data dan kemampuan download materi untuk dipelajari secara offline."
            ]
        }
    ]'::jsonb,
    'PUBLISHED'
),
(
    '05', 
    'FINTECH DASHBOARD', 
    'KLIEN', 
    '2024', 
    'Frontend Team', 
    'v1.0.0', 
    'Proprietary', 
    'N/A', 
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop', 
    'Dashboard analitik finansial real-time yang dibuat khusus untuk klien manajemen aset perbankan.',
    ARRAY['React', 'D3.js', 'TypeScript', 'Tailwind'],
    ARRAY['Finance', 'Client Work', 'Dashboard'],
    '{"stars": "N/A", "forks": "N/A", "issues": "0 open", "contributors": "5"}'::jsonb,
    ARRAY[
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543286386-7a38112d7d6e?q=80&w=1200&auto=format&fit=crop'
    ],
    '[
        {"id": "kebutuhan-analitik", "label": "1. Kebutuhan Analitik Finansial"},
        {"id": "visualisasi-d3", "label": "2. Kekuatan Visualisasi D3.js & React"},
        {"id": "fitur-dashboard", "label": "3. Fitur Utama Analisis"}
    ]'::jsonb,
    '[
        {"id": "kebutuhan-analitik", "type": "heading", "text": "Kebutuhan Analitik Finansial"},
        {"type": "paragraph", "text": "Klien kami di sektor manajemen aset membutuhkan cara cepat untuk melacak alokasi portofolio investasi global, memantau tren pergerakan pasar secara real-time, dan membuat keputusan investasi berskala besar dalam hitungan detik."},
        {"id": "visualisasi-d3", "type": "heading", "text": "Kekuatan Visualisasi D3.js & React"},
        {"type": "paragraph", "text": "Dashboard ini menggabungkan fleksibilitas React dengan kekuatan rendering visualisasi D3.js. Grafik candlestick, diagram alokasi, serta grafik deret waktu (time-series) dapat melakukan kalkulasi dan render ulang secara real-time saat data baru masuk via WebSockets."},
        {"id": "fitur-dashboard", "type": "heading", "text": "Fitur Utama Analisis"},
        {
            "type": "list",
            "items": [
                "Bagan analisis portofolio dinamis dengan visualisasi alokasi aset sektoral.",
                "Sistem peringatan real-time untuk fluktuasi pasar ekstrem.",
                "Ekspor laporan komprehensif dalam format PDF dan lembar kerja Excel sekali klik.",
                "Simulasi skenario stres testing portofolio berbasis data historis."
            ]
        }
    ]'::jsonb,
    'PUBLISHED'
);

-- Show success status
SELECT 'DATABASE SETUP SUCCESSFUL' as status;
