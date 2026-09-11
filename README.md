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

| Koleksi / dokumen | Field |
|---|---|
| `warga` (id dokumen = uid) | `nama`, `blok`, `rt`, `rw`, `hp`, `contactEmail`, `role` (`"admin"` atau kosong = warga biasa) |
| `tagihan` | `uid`, `periode`, `total`, `status`, `jatuhTempo`, `rincian` (array `{nama, jumlah}`) — dibuat otomatis lewat tombol "Buat tagihan bulan ini" di menu admin |
| `jenisTagihan` | `nama`, `jumlah` — dikelola dari menu admin Kelola tagihan |
| `pengaturan/tagihan` (dokumen tunggal) | `tanggalPenagihan` (angka 1-28) |
| `informasi` | `judul`, `isi`, `kategori`, `tanggal` — ditulis dari menu admin |
| `surat` | `uid`, `namaWarga`, `jenis`, `keperluan`, `status` (`Diajukan`/`Disetujui`/`Ditolak`) |
| `laporan` | `uid`, `namaWarga`, `kategori`, `lokasi`, `deskripsi`, `status` (`Diterima`/`Diproses`/`Selesai`) |
| `cctv` | `lokasi`, `link`, `status` — dikelola dari menu admin |
| `kontakDarurat` | `nama`, `nomor`, `darurat` (boolean) — dikelola dari menu admin |
| `kas` | `keterangan`, `jumlah` (negatif = pengeluaran), `tanggal`, `tanggalLabel` — dikelola dari menu admin Kas |
| `pengeluaran` | `keterangan`, `jumlah`, `tanggal`, `tanggalLabel` — otomatis terisi saat admin mencatat pengeluaran di menu Kas |
| `pengaturan/kontakAdmin` (dokumen tunggal) | `nama`, `hp`, `email` — diisi dari menu Profil admin |

## 2a. Menjadikan sebuah akun sebagai admin

1. Daftar/login dulu dengan akun yang ingin dijadikan admin lewat aplikasi (menu Daftar).
2. Buka Firestore console → koleksi `warga` → cari dokumen dengan id sama seperti UID akun tersebut (lihat di Authentication > Users untuk tahu UID-nya).
3. Tambahkan field baru: `role` (tipe string) dengan nilai `admin`.
4. Logout lalu login ulang di aplikasi — akun tersebut otomatis diarahkan ke Dashboard admin, bukan dashboard warga.

Akun tanpa field `role` (atau nilainya bukan `"admin"`) akan selalu masuk ke dashboard warga biasa.

## 3. Aturan keamanan Firestore (WAJIB diperbarui)

**Penting:** aturan versi sebelumnya hanya mengizinkan "read" untuk sebagian besar koleksi, sehingga semua tombol Simpan/Tambah di menu admin gagal secara diam-diam. Ganti seluruhnya dengan aturan di bawah ini di **Firestore > Rules**, lalu klik **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function isAdmin() {
      return isSignedIn() &&
        exists(/databases/$(database)/documents/warga/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/warga/$(request.auth.uid)).data.role == 'admin';
    }

    match /warga/{uid} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && (request.auth.uid == uid || isAdmin());
    }
    match /tagihan/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /jenisTagihan/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /pengaturan/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /informasi/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /surat/{id} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isAdmin();
    }
    match /laporan/{id} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isAdmin();
    }
    match /cctv/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /kontakDarurat/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /kas/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    match /pengeluaran/{id} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
  }
}
```

Aturan ini memakai field `role` di dokumen `warga/{uid}` untuk mengecek admin **di sisi server** (bukan cuma di aplikasi) — jadi hanya akun dengan `role: "admin"` yang benar-benar bisa menulis ke koleksi seperti `kas`, `cctv`, `kontakDarurat`, `informasi`, `jenisTagihan`, dan `pengaturan`, serta meng-ACC/menolak surat dan mengubah status laporan. Warga biasa tetap bisa mengajukan surat/laporan baru (create) dan membaca datanya sendiri.

## 4. Deploy ke GitHub Pages

1. Push semua file ini ke repositori GitHub Anda.
2. Buka **Settings > Pages** di repo tersebut.
3. Pada **Source**, pilih branch `main` dan folder `/root`, lalu simpan.
4. Setelah beberapa saat, aplikasi akan aktif di `https://<username>.github.io/<nama-repo>/`.
5. Di Firebase Console, buka **Authentication > Settings > Authorized domains** dan tambahkan domain GitHub Pages tersebut agar login tidak diblokir.

Tidak ada proses build yang diperlukan — semua file sudah siap pakai langsung dari root repositori.

## 5. Catatan: index Firestore

Query yang menggabungkan filter dan urutan (misalnya ACC surat, tagihan, riwayat surat/laporan warga) sudah diubah supaya diurutkan di sisi aplikasi (bukan di query Firestore), jadi **tidak perlu membuat composite index apa pun** — halaman-halaman itu akan langsung berfungsi begitu aturan keamanan di atas sudah dipasang.

## 6. Belum termasuk di update ini: notifikasi WhatsApp & email otomatis

Fitur push notifikasi otomatis ke WhatsApp/email admin saat ada laporan atau pengajuan surat baru **belum ditambahkan** di kode ini karena masih menunggu:
- Project di-upgrade ke paket Blaze,
- Token API Fonnte (WhatsApp) dan nomor admin,
- Gmail App Password (email) dan alamat admin.

Setelah data itu dikirim, akan ditambahkan folder `functions/` berisi Cloud Functions yang otomatis berjalan setiap ada dokumen baru di koleksi `laporan` atau `surat`.
