// ===== 1. Data tugas contoh =====
// Setiap tugas punya: id, judul, tanggal tenggat (format YYYY-MM-DD), dan status selesai.
// Ganti isi daftar ini dengan tugas kuliahmu sendiri.
const TUGAS_AWAL = [
  { id: 1, judul: "Esai Pengantar Psikologi",        tenggat: "2026-11-12", selesai: false },
  { id: 2, judul: "Laporan Praktikum Fisika Dasar",  tenggat: "2026-11-15", selesai: false },
  { id: 3, judul: "Latihan Soal Kalkulus Bab 3",     tenggat: "2026-11-05", selesai: true  },
  { id: 4, judul: "Presentasi Kelompok Bahasa Inggris", tenggat: "2026-11-20", selesai: false },
  { id: 5, judul: "Kuis Online Pengantar Pemrograman", tenggat: "2026-11-03", selesai: true  },
  { id: 6, judul: "Rangkuman Materi Statistika",     tenggat: "2026-11-02", selesai: false }
];

const KUNCI_PENYIMPANAN = "student-task-planner";

// ===== 2. State (kondisi aplikasi saat ini) =====
let daftarTugas = muatTugas();
let filterAktif = "all"; // "all" | "pending" | "completed"

// ===== 3. Ambil elemen HTML yang akan diubah =====
const elDaftar   = document.getElementById("daftar-tugas");
const elKosong   = document.getElementById("pesan-kosong");
const tombolFilter = document.querySelectorAll(".filter-btn");

// ===== 4. Simpan & muat data (supaya status tidak hilang saat refresh) =====
function muatTugas() {
  try {
    const tersimpan = localStorage.getItem(KUNCI_PENYIMPANAN);
    if (tersimpan) return JSON.parse(tersimpan);
  } catch (e) {
    // Kalau penyimpanan tidak tersedia, pakai data contoh saja
  }
  return TUGAS_AWAL.map(t => ({ ...t }));
}

function simpanTugas() {
  try {
    localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(daftarTugas));
  } catch (e) {
    // Abaikan jika gagal menyimpan
  }
}

// ===== 5. Fungsi bantu =====
// Ubah "2026-11-12" menjadi "12 November 2026"
function formatTanggal(teks) {
  const [tahun, bulan, hari] = teks.split("-").map(Number);
  const tanggal = new Date(tahun, bulan - 1, hari);
  return tanggal.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Cek apakah tenggat sudah lewat (dan tugas belum selesai)
function sudahLewat(tugas) {
  if (tugas.selesai) return false;
  const [tahun, bulan, hari] = tugas.tenggat.split("-").map(Number);
  const tenggat = new Date(tahun, bulan - 1, hari);
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);
  return tenggat < hariIni;
}

// Ambil tugas sesuai filter yang dipilih
function tugasTerfilter() {
  if (filterAktif === "pending")   return daftarTugas.filter(t => !t.selesai);
  if (filterAktif === "completed") return daftarTugas.filter(t => t.selesai);
  return daftarTugas;
}

// ===== 6. Tampilkan data ke layar =====
function tampilkan() {
  elDaftar.innerHTML = "";
  const tampil = tugasTerfilter();

  tampil.forEach(tugas => {
    const li = document.createElement("li");
    li.className = "tugas" + (tugas.selesai ? " selesai" : "");

    // Checkbox untuk menandai selesai
    const cek = document.createElement("input");
    cek.type = "checkbox";
    cek.checked = tugas.selesai;
    cek.setAttribute("aria-label", "Tandai selesai: " + tugas.judul);
    cek.addEventListener("change", () => ubahStatus(tugas.id));

    // Judul dan tenggat
    const isi = document.createElement("div");
    isi.className = "isi";

    const judul = document.createElement("div");
    judul.className = "judul";
    judul.textContent = tugas.judul; // textContent aman dari injeksi HTML

    const info = document.createElement("div");
    info.className = "info" + (sudahLewat(tugas) ? " lewat" : "");
    info.textContent = "Tenggat: " + formatTanggal(tugas.tenggat) + (sudahLewat(tugas) ? " (terlambat)" : "");

    isi.append(judul, info);

    // Label status
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = tugas.selesai ? "Selesai" : "Belum selesai";

    li.append(cek, isi, status);
    elDaftar.appendChild(li);
  });

  elKosong.hidden = tampil.length > 0;
  perbaruiRingkasan();
}

function perbaruiRingkasan() {
  const selesai = daftarTugas.filter(t => t.selesai).length;
  document.getElementById("jumlah-semua").textContent   = daftarTugas.length;
  document.getElementById("jumlah-selesai").textContent = selesai;
  document.getElementById("jumlah-pending").textContent = daftarTugas.length - selesai;
}

// ===== 7. Aksi pengguna =====
function ubahStatus(id) {
  const tugas = daftarTugas.find(t => t.id === id);
  if (!tugas) return;
  tugas.selesai = !tugas.selesai;
  simpanTugas();
  tampilkan();
}

tombolFilter.forEach(tombol => {
  tombol.addEventListener("click", () => {
    filterAktif = tombol.dataset.filter;
    tombolFilter.forEach(t => t.classList.toggle("aktif", t === tombol));
    tampilkan();
  });
});

// ===== 8. Jalankan saat halaman dibuka =====
tampilkan();