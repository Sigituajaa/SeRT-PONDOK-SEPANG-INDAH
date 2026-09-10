# SeRT - Sepang Indah

Aplikasi warga (dashboard tagihan, informasi, surat, lapor, CCTV, kontak darurat, kas warga, rincian pengeluaran). Dibuat statis (HTML, CSS, JS) dan memakai Firebase sebagai database serta autentikasinya, sehingga bisa langsung di-deploy lewat GitHub Pages tanpa proses build.

## Struktur file

```
index.html      halaman utama (semua tampilan ada di sini, ditampilkan/disembunyikan lewat JS)
style.css       tampilan
script.js       logika navigasi + koneksi Firebase
manifest.json   konfigurasi PWA (bisa di-install seperti aplikasi)
sw.js           service worker untuk mode offline
icons/          ikon aplikasi
```

## 1. Buat project Firebase

1. Buka https://console.firebase.google.com dan buat project baru.
2. Di menu **Build > Authentication**, aktifkan sign-in method **Email/Password**.
3. Di menu **Build > Firestore Database**, klik **Create database**, pilih mode production.
4. Buka **Project settings > General > Your apps**, klik ikon web (`</>`), daftarkan aplikasi, lalu salin objek `firebaseConfig` yang muncul.
5. Tempel objek tersebut ke bagian atas file `script.js`, menggantikan nilai `GANTI_DENGAN_...`.

## 2. Koleksi Firestore yang dipakai

Buat koleksi berikut secara manual dari Firestore console (atau biarkan kosong dulu, aplikasi akan menampilkan pesan "belum ada data"):

| Koleksi | Field contoh |
|---|---|
| `warga` (id dokumen = uid) | `nama`, `blok`, `rt`, `rw` |
| `tagihan` | `uid`, `periode`, `total`, `status`, `jatuhTempo`, `rincian` (array `{nama, jumlah}`) |
| `informasi` | `judul`, `isi`, `kategori`, `tanggal` |
| `surat` | ditulis otomatis oleh warga lewat form |
| `laporan` | ditulis otomatis oleh warga lewat form |
| `cctv` | `lokasi`, `status` |
| `kontakDarurat` | `nama`, `nomor`, `darurat` (boolean) |
| `kas` | `keterangan`, `jumlah` (negatif = pengeluaran), `tanggal`, `tanggalLabel` |
| `pengeluaran` | `keterangan`, `jumlah`, `tanggal`, `tanggalLabel` |

## 3. Aturan keamanan Firestore (contoh dasar)

Sesuaikan di **Firestore > Rules** agar warga hanya bisa mengakses datanya sendiri:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /warga/{uid} { allow read, write: if request.auth.uid == uid; }
    match /tagihan/{id} { allow read: if request.auth.uid == resource.data.uid; }
    match /surat/{id} { allow read, create: if request.auth != null; }
    match /laporan/{id} { allow read, create: if request.auth != null; }
    match /informasi/{id} { allow read: if request.auth != null; }
    match /cctv/{id} { allow read: if request.auth != null; }
    match /kontakDarurat/{id} { allow read: if request.auth != null; }
    match /kas/{id} { allow read: if request.auth != null; }
    match /pengeluaran/{id} { allow read: if request.auth != null; }
  }
}
```

## 4. Deploy ke GitHub Pages

1. Push semua file ini ke repositori GitHub Anda.
2. Buka **Settings > Pages** di repo tersebut.
3. Pada **Source**, pilih branch `main` dan folder `/root`, lalu simpan.
4. Setelah beberapa saat, aplikasi akan aktif di `https://<username>.github.io/<nama-repo>/`.
5. Di Firebase Console, buka **Authentication > Settings > Authorized domains** dan tambahkan domain GitHub Pages tersebut agar login tidak diblokir.

Tidak ada proses build yang diperlukan — semua file sudah siap pakai langsung dari root repositori.
