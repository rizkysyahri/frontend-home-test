Home Test Frontend Web Developer
Gambaran Umum
Proyek ini merupakan aplikasi web untuk manajemen artikel dengan kontrol akses berbasis peran untuk User dan Admin. Aplikasi mendukung autentikasi, otorisasi, dan berbagai fitur yang disesuaikan untuk setiap peran, seperti daftar artikel, manajemen kategori, dan operasi CRUD. Antarmuka pengguna (UI) dirancang responsif untuk perangkat mobile, tablet, dan desktop, serta terintegrasi dengan API yang disediakan.
Proyek ini dibangun dengan teknologi web modern, mengikuti praktik terbaik untuk struktur kode yang mudah dibaca, dan dilengkapi dengan penanganan error, status loading, serta pesan sukses untuk meningkatkan pengalaman pengguna.

Fitur
1. User Role
Authentication

Login: Formulir dengan validasi menggunakan Zod dan React Hook Form.
Register: Formulir dengan validasi menggunakan Zod dan React Hook Form.
Redirect: Setelah login/register berhasil, arahkan ke halaman daftar artikel.
Logout: Arahkan ke halaman login saat logout.

Article List

Filter: Filter artikel berdasarkan kategori menggunakan dropdown.
Pencarian: Pencarian artikel dengan debounce 400ms.
Paginasi: Tampilkan paginasi jika data lebih dari 9 item.

Article Detail

Tampilan Detail: Tampilkan konten lengkap artikel yang dipilih.
Artikel Lain: Tampilkan maksimal 3 artikel dari kategori yang sama dengan artikel yang sedang dilihat.

2. Admin Role
Authentication

Sama seperti peran User (login, register, redirect, logout).

Category List

Pencarian: Pencarian kategori dengan debounce 400ms.
Paginasi: Tampilkan paginasi jika data lebih dari 10 item.

Create Category

Formulir dengan validasi menggunakan Zod dan React Hook Form.

Edit Category

Formulir dengan validasi menggunakan Zod dan React Hook Form.

Article List

Filter: Filter artikel berdasarkan kategori.
Pencarian: Pencarian artikel dengan debounce 400ms.
Paginasi: Tampilkan paginasi jika data lebih dari 10 item.

Create Article

Formulir dengan validasi menggunakan Zod dan React Hook Form.
Fitur pratinjau sebelum submit (fetch API untuk pratinjau).

Edit Article

Formulir dengan validasi menggunakan Zod dan React Hook Form.
Fitur pratinjau sebelum submit (fetch API untuk pratinjau).


Technologies Used

Framework: Next.js (App Router, CSR)
Styling: Tailwind CSS dengan komponen Shadcn/ui
API Fetching: Axios
Icon: Lucide
Form Validator: Zod + React Hook Form
State Management: Zustand (dengan persistensi untuk autentikasi dan state artikel/kategori)
Data Fetching: React Query (TanStack Query) untuk caching dan manajemen API

Pengaturan dan Instalasi Proyek
Prasyarat

Node.js (versi 18 atau lebih baru)
Git
Manajer paket (npm, yarn, atau pnpm)

Langkah-langkah untuk Menjalankan Lokal

clone Repository
git clone https://github.com/nama-anda/nama-repo-anda.git
cd nama-repo-anda


Install Dependensi
npm install
# atau
yarn install
# atau
pnpm install


Jalankan Server Pengembangan
npm run dev
# atau
yarn dev
# atau
pnpm dev

Buka http://localhost:3000 di browser untuk melihat aplikasi.

Build untuk Produksi
npm run build
npm run start


Autentikasi:
POST /auth/login - Login User/Admin
POST /auth/register - Registrasi User/Admin


Artikel:
GET /articles - Ambil daftar artikel (mendukung page, limit, categoryId, search)
GET /articles/:id - Ambil detail artikel
POST /articles - Buat artikel (Admin)
PUT /articles/:id - Perbarui artikel (Admin)


Kategori:
GET /categories - Ambil daftar kategori (mendukung page, limit, search)
POST /categories - Buat kategori (Admin)
PUT /categories/:id - Perbarui kategori (Admin)



