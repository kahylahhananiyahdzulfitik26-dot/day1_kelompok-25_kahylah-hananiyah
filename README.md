# Student Task Planner

Aplikasi web sederhana untuk membantu mahasiswa tahun pertama mencatat tugas dan tenggat waktu kuliah. Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa library tambahan, sehingga mudah dipahami pemula.

## Fitur

- Menampilkan daftar tugas contoh lengkap dengan judul, tanggal tenggat, dan status.
- Menandai tugas sebagai selesai lewat checkbox.
- Filter tugas: **Semua**, **Belum selesai**, dan **Selesai**.
- Ringkasan jumlah tugas (semua, belum selesai, selesai).
- Penanda merah dan label "(terlambat)" untuk tugas yang tenggatnya sudah lewat.
- Status tugas tersimpan di browser (`localStorage`), jadi tidak hilang saat halaman di-refresh.
- Tampilan bersih dan responsif untuk laptop maupun HP.

## Teknologi

- HTML5
- CSS3
- JavaScript (vanilla, tanpa dependensi)

## Struktur Folder

```
student-task-planner/
├── index.html   # Kerangka halaman
├── style.css    # Tampilan dan tema warna
├── script.js    # Logika aplikasi (data, filter, penyimpanan)
└── README.md    # Dokumentasi proyek
```

| File | Fungsi |
|------|--------|
| `index.html` | Struktur halaman: judul, ringkasan, tombol filter, dan tempat daftar tugas. |
| `style.css` | Seluruh gaya tampilan. Warna tema dapat diubah di bagian `:root`. |
| `script.js` | Data tugas contoh, fungsi filter, mengubah status tugas, dan menyimpan data ke `localStorage`. |

## Cara Menjalankan

1. Unduh atau clone repository ini.
2. Pastikan `index.html`, `style.css`, dan `script.js` berada dalam satu folder.
3. Buka `index.html` dengan cara klik dua kali, atau seret filenya ke jendela browser.

Alternatif lewat terminal:

```bash
git clone git@github.com:USERNAME/student-task-planner.git
cd student-task-planner
code .
```

Tidak perlu instalasi atau server tambahan.

## Cara Mengetes Interaksi Utama

1. Klik filter **Belum selesai**, lalu pastikan hanya tugas yang belum selesai yang tampil.
2. Centang salah satu tugas, lalu pastikan tugas tercoret dan angka ringkasan berubah.
3. Klik filter **Selesai**, lalu pastikan tugas yang baru dicentang muncul di sana.
4. Refresh halaman, lalu pastikan status centang tetap tersimpan.
5. Perkecil jendela browser untuk mengecek tampilan di layar HP.

## Kustomisasi

**Mengganti tugas contoh**

Buka `script.js`, lalu ubah daftar `TUGAS_AWAL` di bagian paling atas:

```js
{ id: 1, judul: "Esai Pengantar Psikologi", tenggat: "2026-11-12", selesai: false }
```

- `id`: angka unik untuk setiap tugas.
- `judul`: nama tugas.
- `tenggat`: tanggal dengan format `TAHUN-BULAN-TANGGAL`.
- `selesai`: `true` atau `false`.

Karena status disimpan di `localStorage`, perubahan pada `TUGAS_AWAL` baru terlihat setelah data lama dihapus. Caranya: buka DevTools browser, masuk ke tab Application, pilih Local Storage, lalu hapus kunci `student-task-planner`.

**Mengganti warna**

Buka `style.css`, lalu ubah nilai variabel di `:root`, misalnya `--utama: #4f46e5;`.

## Alur Git

Proyek ini dibuat sebagai latihan version control dengan Git dan GitHub:

```bash
git init
git add .
git commit -m "Add student task planner"
git branch -M main
git remote add origin git@github.com:USERNAME/student-task-planner.git
git push -u origin main
```

Untuk setiap perubahan berikutnya:

```bash
git add .
git commit -m "Pesan perubahan"
git push origin main
```

## Ide Pengembangan

- Formulir untuk menambah dan menghapus tugas.
- Mengurutkan tugas berdasarkan tenggat.
- Mode gelap.
- Pengingat untuk tugas yang tenggatnya dekat.

## Lisensi

Bebas digunakan untuk keperluan belajar.