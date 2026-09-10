/* =========================================================
   1. KONFIGURASI FIREBASE
   Ganti seluruh objek di bawah ini dengan konfigurasi
   dari Firebase Console punya Anda:
   Project settings > General > Your apps > SDK setup and configuration
========================================================= */
const firebaseConfig = {
  apiKey: "AIzaSyDVeIIU55tsW18eAFIP5uWzpKGtC20RUh8",
  authDomain: "sert-pondoksepangindah2.firebaseapp.com",
  projectId: "sert-pondoksepangindah2",
  storageBucket: "sert-pondoksepangindah2.firebasestorage.app",
  messagingSenderId: "239962454498",
  appId: "1:239962454498:web:169713ef331f4a1e8aa1bb",
  measurementId: "G-TQT03Z6NLY"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* =========================================================
   2. ICON SET SEDERHANA (inline SVG, tanpa dependency luar)
========================================================= */
const ICONS = {
  home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  logout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
  receipt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3h16v18l-3-2-3 2-3-2-3 2-3-2-1 2z"/><path d="M8 8h8M8 12h8"/></svg>',
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
  file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
  video: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-4v12l-6-4"/></svg>',
  phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>',
  wallet: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M18 12h.01"/><path d="M2 9h18a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4"/></svg>',
  report: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>'
};
document.querySelectorAll('[data-icon]').forEach(el=>{
  el.innerHTML = ICONS[el.getAttribute('data-icon')] || '';
});

/* =========================================================
   3. NAVIGASI ANTAR HALAMAN
========================================================= */
function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
}

document.querySelectorAll('.menu-tile').forEach(btn=>{
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view');
    showView(view);
    loadDataFor(view);
  });
});

document.querySelectorAll('[data-back]').forEach(btn=>{
  btn.addEventListener('click', () => showView('dashboard'));
});

function loadDataFor(view){
  if(view === 'tagihan') loadTagihan();
  if(view === 'informasi') loadInformasi();
  if(view === 'surat') loadSurat();
  if(view === 'lapor') loadLapor();
  if(view === 'cctv') loadCctv();
  if(view === 'kontak') loadKontak();
  if(view === 'kas') loadKas();
  if(view === 'pengeluaran') loadPengeluaran();
}

function formatRupiah(angka){
  return 'Rp ' + Number(angka || 0).toLocaleString('id-ID');
}

/* =========================================================
   4. AUTENTIKASI
========================================================= */
document.getElementById('btn-login').addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';
  if(!email || !password){
    errorEl.textContent = 'Isi email dan kata sandi terlebih dahulu.';
    return;
  }
  auth.signInWithEmailAndPassword(email, password)
    .catch(err => errorEl.textContent = terjemahkanErrorAuth(err));
});

document.getElementById('btn-register').addEventListener('click', () => {
  const nama = document.getElementById('register-nama').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const errorEl = document.getElementById('register-error');
  errorEl.textContent = '';
  if(!nama || !email || password.length < 6){
    errorEl.textContent = 'Nama, email wajib diisi dan kata sandi minimal 6 karakter.';
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // Buat dokumen profil warga awal, bisa diedit lebih lanjut lewat Firestore console
      return db.collection('warga').doc(cred.user.uid).set({
        nama: nama,
        blok: '-',
        rt: '-',
        rw: '-'
      });
    })
    .catch(err => errorEl.textContent = terjemahkanErrorAuth(err));
});

document.getElementById('btn-logout').addEventListener('click', () => auth.signOut());

// Navigasi antara halaman Masuk dan Daftar
document.getElementById('link-to-register').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('login-error').textContent = '';
  showView('register');
});
document.getElementById('link-to-login').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('register-error').textContent = '';
  showView('login');
});

function terjemahkanErrorAuth(err){
  const map = {
    'auth/user-not-found': 'Akun tidak ditemukan.',
    'auth/wrong-password': 'Kata sandi salah.',
    'auth/email-already-in-use': 'Email sudah terdaftar.',
    'auth/invalid-email': 'Format email tidak valid.'
  };
  return map[err.code] || 'Terjadi kesalahan, coba lagi.';
}

auth.onAuthStateChanged(user => {
  if(user){
    showView('dashboard');
    loadProfile(user.uid);
  } else {
    showView('login');
  }
});

/* =========================================================
   5. PROFIL WARGA (Firestore: koleksi "warga")
========================================================= */
function loadProfile(uid){
  db.collection('warga').doc(uid).get().then(doc => {
    const data = doc.exists ? doc.data() : { nama:'Warga', blok:'-', rt:'-', rw:'-' };
    document.getElementById('profile-name').textContent = data.nama || 'Warga';
    document.getElementById('profile-blok').textContent = data.blok || '-';
    document.getElementById('profile-rt').textContent = 'RT ' + (data.rt || '-');
    document.getElementById('profile-rw').textContent = 'RW ' + (data.rw || '-');
    const initials = (data.nama || 'W A').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    document.getElementById('profile-avatar').textContent = initials;
  });
}

/* =========================================================
   6. TAGIHAN BULANAN (Firestore: koleksi "tagihan", field uid)
========================================================= */
function loadTagihan(){
  const uid = auth.currentUser.uid;
  db.collection('tagihan').where('uid','==',uid).orderBy('periode','desc').get()
    .then(snap => {
      const riwayatEl = document.getElementById('tagihan-riwayat');
      riwayatEl.innerHTML = '';
      if(snap.empty){
        riwayatEl.innerHTML = '<p class="empty-state">Belum ada data tagihan. Tambahkan dokumen di koleksi Firestore "tagihan".</p>';
        document.getElementById('tagihan-total').textContent = formatRupiah(0);
        document.getElementById('tagihan-detail').innerHTML = '';
        document.getElementById('tagihan-jatuhtempo').textContent = 'Jatuh tempo -';
        return;
      }
      const terbaru = snap.docs[0].data();
      document.getElementById('tagihan-total').textContent = formatRupiah(terbaru.total);
      document.getElementById('tagihan-jatuhtempo').textContent = 'Jatuh tempo ' + (terbaru.jatuhTempo || '-');
      const detailEl = document.getElementById('tagihan-detail');
      detailEl.innerHTML = '';
      (terbaru.rincian || []).forEach(item => {
        detailEl.innerHTML += `<div class="detail-row"><span>${item.nama}</span><span>${formatRupiah(item.jumlah)}</span></div>`;
      });
      snap.docs.forEach(d => {
        const t = d.data();
        riwayatEl.innerHTML += `
          <div class="list-item">
            <div><p class="title">${t.periode}</p><p class="subtitle">${formatRupiah(t.total)}</p></div>
            <span class="pill ${t.status === 'Lunas' ? 'pill-green' : 'pill-red'}">${t.status}</span>
          </div>`;
      });
    });
}

/* =========================================================
   7. INFORMASI (Firestore: koleksi "informasi", untuk semua warga)
========================================================= */
function loadInformasi(){
  db.collection('informasi').orderBy('tanggal','desc').get().then(snap => {
    const el = document.getElementById('informasi-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada informasi. Tambahkan dokumen di koleksi Firestore "informasi".</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item" style="flex-direction:column;align-items:flex-start;">
          <span class="pill pill-green">${d.kategori || 'Info'}</span>
          <p class="title" style="margin-top:8px;">${d.judul}</p>
          <p class="subtitle">${d.isi}</p>
        </div>`;
    });
  });
}

/* =========================================================
   8. BUAT SURAT (Firestore: koleksi "surat", ditulis oleh warga)
========================================================= */
document.getElementById('form-surat').addEventListener('submit', e => {
  e.preventDefault();
  const jenis = document.getElementById('surat-jenis').value;
  const keperluan = document.getElementById('surat-keperluan').value.trim();
  const errorEl = document.getElementById('surat-error');
  if(!keperluan){
    errorEl.textContent = 'Isi keperluan surat terlebih dahulu.';
    return;
  }
  errorEl.textContent = '';
  db.collection('surat').add({
    uid: auth.currentUser.uid,
    jenis, keperluan,
    status: 'Diajukan',
    dibuatPada: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById('surat-keperluan').value = '';
    loadSurat();
  });
});

function loadSurat(){
  const uid = auth.currentUser.uid;
  db.collection('surat').where('uid','==',uid).orderBy('dibuatPada','desc').get().then(snap => {
    const el = document.getElementById('surat-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada pengajuan surat.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.jenis}</p><p class="subtitle">${d.keperluan}</p></div>
          <span class="pill pill-green">${d.status}</span>
        </div>`;
    });
  });
}

/* =========================================================
   9. LAPOR (Firestore: koleksi "laporan", ditulis oleh warga)
========================================================= */
document.getElementById('form-lapor').addEventListener('submit', e => {
  e.preventDefault();
  const kategori = document.getElementById('lapor-kategori').value;
  const lokasi = document.getElementById('lapor-lokasi').value.trim();
  const deskripsi = document.getElementById('lapor-deskripsi').value.trim();
  const errorEl = document.getElementById('lapor-error');
  if(!lokasi || !deskripsi){
    errorEl.textContent = 'Lokasi dan deskripsi wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('laporan').add({
    uid: auth.currentUser.uid,
    kategori, lokasi, deskripsi,
    status: 'Diterima',
    dibuatPada: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById('lapor-lokasi').value = '';
    document.getElementById('lapor-deskripsi').value = '';
    loadLapor();
  });
});

function loadLapor(){
  const uid = auth.currentUser.uid;
  db.collection('laporan').where('uid','==',uid).orderBy('dibuatPada','desc').get().then(snap => {
    const el = document.getElementById('lapor-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada laporan yang dikirim.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.kategori} &middot; ${d.lokasi}</p><p class="subtitle">${d.deskripsi}</p></div>
          <span class="pill pill-green">${d.status}</span>
        </div>`;
    });
  });
}

/* =========================================================
   10. CCTV (Firestore: koleksi "cctv", dikelola pengurus)
========================================================= */
function loadCctv(){
  db.collection('cctv').get().then(snap => {
    const el = document.getElementById('cctv-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada data CCTV. Tambahkan dokumen di koleksi Firestore "cctv".</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div class="left-row">
            <span class="icon-circle icon-circle-blue">${ICONS.video}</span>
            <p class="title">${d.lokasi}</p>
          </div>
          <span class="pill ${d.status === 'Aktif' ? 'pill-green' : 'pill-red'}">${d.status}</span>
        </div>`;
    });
  });
}

/* =========================================================
   11. KONTAK DARURAT (Firestore: koleksi "kontakDarurat")
========================================================= */
function loadKontak(){
  db.collection('kontakDarurat').get().then(snap => {
    const el = document.getElementById('kontak-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada kontak darurat. Tambahkan dokumen di koleksi Firestore "kontakDarurat".</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.nama}</p><p class="subtitle">${d.nomor}</p></div>
          <a href="tel:${d.nomor}" class="icon-circle ${d.darurat ? 'icon-circle-red' : 'icon-circle-green'}" style="text-decoration:none;">${ICONS.phone}</a>
        </div>`;
    });
  });
}

/* =========================================================
   12. KAS WARGA (Firestore: koleksi "kas")
========================================================= */
function loadKas(){
  db.collection('kas').orderBy('tanggal','desc').get().then(snap => {
    const el = document.getElementById('kas-list');
    el.innerHTML = '';
    let saldo = 0, masuk = 0, keluar = 0;
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada transaksi. Tambahkan dokumen di koleksi Firestore "kas".</p>';
    }
    snap.forEach(doc => {
      const d = doc.data();
      saldo += d.jumlah;
      if(d.jumlah >= 0) masuk += d.jumlah; else keluar += Math.abs(d.jumlah);
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.keterangan}</p><p class="subtitle">${d.tanggalLabel || ''}</p></div>
          <span class="${d.jumlah >= 0 ? 'amount-green' : 'amount-red'}">${d.jumlah >= 0 ? '+' : '-'}${formatRupiah(Math.abs(d.jumlah))}</span>
        </div>`;
    });
    document.getElementById('kas-saldo').textContent = formatRupiah(saldo);
    document.getElementById('kas-masuk').textContent = formatRupiah(masuk);
    document.getElementById('kas-keluar').textContent = formatRupiah(keluar);
  });
}

/* =========================================================
   13. RINCIAN PENGELUARAN (Firestore: koleksi "pengeluaran")
========================================================= */
function loadPengeluaran(){
  db.collection('pengeluaran').orderBy('tanggal','desc').get().then(snap => {
    const el = document.getElementById('pengeluaran-list');
    el.innerHTML = '';
    let total = 0;
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada data pengeluaran. Tambahkan dokumen di koleksi Firestore "pengeluaran".</p>';
    }
    snap.forEach(doc => {
      const d = doc.data();
      total += d.jumlah;
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.keterangan}</p><p class="subtitle">${d.tanggalLabel || ''}</p></div>
          <span class="title">${formatRupiah(d.jumlah)}</span>
        </div>`;
    });
    document.getElementById('pengeluaran-total').textContent = formatRupiah(total);
  });
}

/* =========================================================
   14. PWA: DAFTARKAN SERVICE WORKER
========================================================= */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
