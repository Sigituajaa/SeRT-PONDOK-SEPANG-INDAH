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
  report: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>',
  user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  shield: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z"/></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>'
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
  btn.addEventListener('click', () => showView(btn.getAttribute('data-back') || 'dashboard'));
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
  if(view === 'profil') loadProfilWarga();
  if(view === 'admin-tagihan') loadAdminTagihan();
  if(view === 'admin-informasi') loadAdminInformasi();
  if(view === 'admin-surat') loadAdminSurat();
  if(view === 'admin-lapor') loadAdminLapor();
  if(view === 'admin-cctv') loadAdminCctv();
  if(view === 'admin-kontak') loadAdminKontak();
  if(view === 'admin-kas') loadAdminKas();
  if(view === 'admin-profil') loadAdminProfil();
}

const NAMA_BULAN_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
function labelTanggalHariIni(){
  const d = new Date();
  return d.getDate() + ' ' + NAMA_BULAN_ID[d.getMonth()] + ' ' + d.getFullYear();
}
function periodeBulanIni(){
  const d = new Date();
  return NAMA_BULAN_ID[d.getMonth()] + ' ' + d.getFullYear();
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
document.getElementById('btn-logout-admin').addEventListener('click', () => auth.signOut());

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

let currentProfileData = {};
let currentRole = 'warga';

auth.onAuthStateChanged(user => {
  if(user){
    db.collection('warga').doc(user.uid).get().then(doc => {
      const data = doc.exists ? doc.data() : { nama:'Warga', blok:'-', rt:'-', rw:'-' };
      currentProfileData = data;
      currentRole = data.role === 'admin' ? 'admin' : 'warga';
      if(currentRole === 'admin'){
        showView('admin-dashboard');
        loadAdminBadges();
      } else {
        showView('dashboard');
        renderProfileHeader(data);
      }
    });
  } else {
    showView('login');
  }
});

/* =========================================================
   5. PROFIL WARGA (Firestore: koleksi "warga")
========================================================= */
function renderProfileHeader(data){
  document.getElementById('profile-name').textContent = data.nama || 'Warga';
  document.getElementById('profile-blok').textContent = data.blok || '-';
  document.getElementById('profile-rt').textContent = 'RT ' + (data.rt || '-');
  document.getElementById('profile-rw').textContent = 'RW ' + (data.rw || '-');
  const initials = (data.nama || 'W A').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  document.getElementById('profile-avatar').textContent = initials;
}

function loadProfilWarga(){
  const data = currentProfileData || {};
  document.getElementById('pw-nama').value = data.nama || '';
  document.getElementById('pw-rt').value = data.rt || '';
  document.getElementById('pw-rw').value = data.rw || '';
  document.getElementById('pw-blok').value = data.blok || '';
  document.getElementById('pw-hp').value = data.hp || '';
  document.getElementById('pw-email').value = data.contactEmail || auth.currentUser.email || '';
}

document.getElementById('form-profil-warga').addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('pw-nama').value.trim();
  const errorEl = document.getElementById('profil-warga-error');
  if(!nama){
    errorEl.textContent = 'Nama wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  const payload = {
    nama,
    rt: document.getElementById('pw-rt').value.trim(),
    rw: document.getElementById('pw-rw').value.trim(),
    blok: document.getElementById('pw-blok').value.trim(),
    hp: document.getElementById('pw-hp').value.trim(),
    contactEmail: document.getElementById('pw-email').value.trim()
  };
  db.collection('warga').doc(auth.currentUser.uid).set(payload, { merge: true }).then(() => {
    currentProfileData = Object.assign({}, currentProfileData, payload);
    renderProfileHeader(currentProfileData);
  });
});

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
    namaWarga: currentProfileData.nama || 'Warga',
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
    namaWarga: currentProfileData.nama || 'Warga',
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
   15. ADMIN: BADGE NOTIFIKASI (surat & laporan yang belum diproses)
========================================================= */
function loadAdminBadges(){
  db.collection('surat').where('status','==','Diajukan').get().then(snap => {
    setBadge('badge-surat', snap.size);
  });
  db.collection('laporan').where('status','==','Diterima').get().then(snap => {
    setBadge('badge-lapor', snap.size);
  });
}
function setBadge(id, count){
  const el = document.getElementById(id);
  if(count > 0){
    el.textContent = count > 99 ? '99+' : count;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
}

/* =========================================================
   16. ADMIN: KELOLA TAGIHAN (Firestore: "pengaturan/tagihan", "jenisTagihan")
========================================================= */
function loadAdminTagihan(){
  db.collection('pengaturan').doc('tagihan').get().then(doc => {
    document.getElementById('at-tanggal').value = doc.exists ? (doc.data().tanggalPenagihan || 10) : 10;
  });
  db.collection('jenisTagihan').get().then(snap => {
    const el = document.getElementById('at-jenis-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada jenis tagihan. Tambahkan lewat form di bawah.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.nama}</p><p class="subtitle">${formatRupiah(d.jumlah)} / bulan</p></div>
          <i data-icon="trash" data-del-jenis="${doc.id}" style="cursor:pointer;color:var(--text-muted);"></i>
        </div>`;
    });
    document.querySelectorAll('[data-icon]').forEach(el=>{ if(!el.innerHTML) el.innerHTML = ICONS[el.getAttribute('data-icon')] || ''; });
    document.querySelectorAll('[data-del-jenis]').forEach(icon => {
      icon.addEventListener('click', () => {
        db.collection('jenisTagihan').doc(icon.getAttribute('data-del-jenis')).delete().then(loadAdminTagihan);
      });
    });
  });
}

document.getElementById('at-simpan-tanggal').addEventListener('click', () => {
  const tanggal = Number(document.getElementById('at-tanggal').value);
  if(!tanggal || tanggal < 1 || tanggal > 28) return;
  db.collection('pengaturan').doc('tagihan').set({ tanggalPenagihan: tanggal }, { merge: true });
});

document.getElementById('form-jenis-tagihan').addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('at-nama').value.trim();
  const jumlah = Number(document.getElementById('at-jumlah').value);
  const errorEl = document.getElementById('at-error');
  if(!nama || !jumlah){
    errorEl.textContent = 'Nama dan jumlah wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('jenisTagihan').add({ nama, jumlah }).then(() => {
    document.getElementById('at-nama').value = '';
    document.getElementById('at-jumlah').value = '';
    loadAdminTagihan();
  });
});

document.getElementById('at-generate').addEventListener('click', () => {
  if(!confirm('Buat tagihan bulan ini untuk semua warga berdasarkan jenis tagihan yang ada?')) return;
  Promise.all([
    db.collection('jenisTagihan').get(),
    db.collection('pengaturan').doc('tagihan').get(),
    db.collection('warga').get()
  ]).then(([jenisSnap, tanggalDoc, wargaSnap]) => {
    const rincian = jenisSnap.docs.map(d => ({ nama: d.data().nama, jumlah: d.data().jumlah }));
    const total = rincian.reduce((sum, r) => sum + Number(r.jumlah), 0);
    const tanggal = tanggalDoc.exists ? (tanggalDoc.data().tanggalPenagihan || 10) : 10;
    const periode = periodeBulanIni();
    const batch = db.batch();
    wargaSnap.forEach(wDoc => {
      const ref = db.collection('tagihan').doc();
      batch.set(ref, {
        uid: wDoc.id,
        periode,
        total,
        status: 'Belum lunas',
        jatuhTempo: 'Tanggal ' + tanggal,
        rincian
      });
    });
    return batch.commit();
  }).then(() => alert('Tagihan bulan ini berhasil dibuat untuk semua warga.'));
});

/* =========================================================
   17. ADMIN: INFORMASI (Firestore: "informasi")
========================================================= */
function loadAdminInformasi(){
  db.collection('informasi').orderBy('tanggal','desc').get().then(snap => {
    const el = document.getElementById('ai-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada informasi yang dipublikasikan.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.judul}</p><p class="subtitle">${d.kategori || 'Info'}</p></div>
          <i data-icon="trash" data-del-info="${doc.id}" style="cursor:pointer;color:var(--text-muted);"></i>
        </div>`;
    });
    document.querySelectorAll('[data-icon]').forEach(el=>{ if(!el.innerHTML) el.innerHTML = ICONS[el.getAttribute('data-icon')] || ''; });
    document.querySelectorAll('[data-del-info]').forEach(icon => {
      icon.addEventListener('click', () => {
        db.collection('informasi').doc(icon.getAttribute('data-del-info')).delete().then(loadAdminInformasi);
      });
    });
  });
}

document.getElementById('form-admin-informasi').addEventListener('submit', e => {
  e.preventDefault();
  const judul = document.getElementById('ai-judul').value.trim();
  const isi = document.getElementById('ai-isi').value.trim();
  const kategori = document.getElementById('ai-kategori').value;
  const errorEl = document.getElementById('ai-error');
  if(!judul || !isi){
    errorEl.textContent = 'Judul dan isi wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('informasi').add({
    judul, isi, kategori,
    tanggal: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById('ai-judul').value = '';
    document.getElementById('ai-isi').value = '';
    loadAdminInformasi();
  });
});

/* =========================================================
   18. ADMIN: ACC SURAT (Firestore: "surat")
========================================================= */
function loadAdminSurat(){
  db.collection('surat').where('status','==','Diajukan').orderBy('dibuatPada','desc').get().then(snap => {
    const el = document.getElementById('as-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Tidak ada pengajuan surat yang menunggu.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item" style="flex-direction:column;align-items:stretch;">
          <div style="display:flex;justify-content:space-between;"><p class="title">${d.namaWarga || 'Warga'}</p><span class="pill pill-red">Menunggu</span></div>
          <p class="subtitle">${d.jenis} &middot; ${d.keperluan}</p>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button class="btn btn-primary" style="margin:0;flex:1;" data-acc="${doc.id}">ACC</button>
            <button class="btn btn-secondary" style="margin:0;flex:1;" data-tolak="${doc.id}">Tolak</button>
          </div>
        </div>`;
    });
    document.querySelectorAll('[data-acc]').forEach(btn => {
      btn.addEventListener('click', () => {
        db.collection('surat').doc(btn.getAttribute('data-acc')).update({ status: 'Disetujui' }).then(() => { loadAdminSurat(); loadAdminBadges(); });
      });
    });
    document.querySelectorAll('[data-tolak]').forEach(btn => {
      btn.addEventListener('click', () => {
        db.collection('surat').doc(btn.getAttribute('data-tolak')).update({ status: 'Ditolak' }).then(() => { loadAdminSurat(); loadAdminBadges(); });
      });
    });
  });
}

/* =========================================================
   19. ADMIN: LAPORAN WARGA (Firestore: "laporan")
========================================================= */
function loadAdminLapor(){
  db.collection('laporan').orderBy('dibuatPada','desc').limit(30).get().then(snap => {
    const el = document.getElementById('al-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada laporan masuk.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item" style="flex-direction:column;align-items:stretch;">
          <div style="display:flex;justify-content:space-between;"><p class="title">${d.namaWarga || 'Warga'} &middot; ${d.kategori}</p></div>
          <p class="subtitle">${d.lokasi} &middot; ${d.deskripsi}</p>
          <select data-status-id="${doc.id}" style="margin-top:8px;">
            <option value="Diterima" ${d.status==='Diterima'?'selected':''}>Diterima</option>
            <option value="Diproses" ${d.status==='Diproses'?'selected':''}>Diproses</option>
            <option value="Selesai" ${d.status==='Selesai'?'selected':''}>Selesai</option>
          </select>
        </div>`;
    });
    document.querySelectorAll('[data-status-id]').forEach(sel => {
      sel.addEventListener('change', () => {
        db.collection('laporan').doc(sel.getAttribute('data-status-id')).update({ status: sel.value }).then(loadAdminBadges);
      });
    });
  });
}

/* =========================================================
   20. ADMIN: CCTV (Firestore: "cctv")
========================================================= */
function loadAdminCctv(){
  db.collection('cctv').get().then(snap => {
    const el = document.getElementById('ac-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada CCTV terdaftar.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.lokasi}</p><p class="subtitle">${d.link || '-'}</p></div>
          <i data-icon="trash" data-del-cctv="${doc.id}" style="cursor:pointer;color:var(--text-muted);"></i>
        </div>`;
    });
    document.querySelectorAll('[data-icon]').forEach(el=>{ if(!el.innerHTML) el.innerHTML = ICONS[el.getAttribute('data-icon')] || ''; });
    document.querySelectorAll('[data-del-cctv]').forEach(icon => {
      icon.addEventListener('click', () => {
        db.collection('cctv').doc(icon.getAttribute('data-del-cctv')).delete().then(loadAdminCctv);
      });
    });
  });
}

document.getElementById('form-admin-cctv').addEventListener('submit', e => {
  e.preventDefault();
  const lokasi = document.getElementById('ac-lokasi').value.trim();
  const link = document.getElementById('ac-link').value.trim();
  const errorEl = document.getElementById('ac-error');
  if(!lokasi || !link){
    errorEl.textContent = 'Nama lokasi dan link wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('cctv').add({ lokasi, link, status: 'Aktif' }).then(() => {
    document.getElementById('ac-lokasi').value = '';
    document.getElementById('ac-link').value = '';
    loadAdminCctv();
  });
});

/* =========================================================
   21. ADMIN: KONTAK DARURAT (Firestore: "kontakDarurat")
========================================================= */
function loadAdminKontak(){
  db.collection('kontakDarurat').get().then(snap => {
    const el = document.getElementById('ak-list');
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="empty-state">Belum ada kontak darurat.</p>';
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      el.innerHTML += `
        <div class="list-item">
          <div><p class="title">${d.nama}</p><p class="subtitle">${d.nomor}</p></div>
          <i data-icon="trash" data-del-kontak="${doc.id}" style="cursor:pointer;color:var(--text-muted);"></i>
        </div>`;
    });
    document.querySelectorAll('[data-icon]').forEach(el=>{ if(!el.innerHTML) el.innerHTML = ICONS[el.getAttribute('data-icon')] || ''; });
    document.querySelectorAll('[data-del-kontak]').forEach(icon => {
      icon.addEventListener('click', () => {
        db.collection('kontakDarurat').doc(icon.getAttribute('data-del-kontak')).delete().then(loadAdminKontak);
      });
    });
  });
}

document.getElementById('form-admin-kontak').addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('ak-nama').value.trim();
  const nomor = document.getElementById('ak-nomor').value.trim();
  const errorEl = document.getElementById('ak-error');
  if(!nama || !nomor){
    errorEl.textContent = 'Nama dan no. HP wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('kontakDarurat').add({ nama, nomor, darurat: true }).then(() => {
    document.getElementById('ak-nama').value = '';
    document.getElementById('ak-nomor').value = '';
    loadAdminKontak();
  });
});

/* =========================================================
   22. ADMIN: KAS (Firestore: "kas", mencerminkan pengeluaran ke "pengeluaran")
========================================================= */
function loadAdminKas(){
  db.collection('kas').orderBy('tanggal','desc').get().then(snap => {
    const masukEl = document.getElementById('akas-masuk-list');
    const keluarEl = document.getElementById('akas-keluar-list');
    masukEl.innerHTML = '';
    keluarEl.innerHTML = '';
    let totalMasuk = 0;
    let adaMasuk = false, adaKeluar = false;
    snap.forEach(doc => {
      const d = doc.data();
      if(d.jumlah >= 0){
        adaMasuk = true;
        totalMasuk += d.jumlah;
        masukEl.innerHTML += `<div class="list-item"><div><p class="title">${d.keterangan}</p><p class="subtitle">${d.tanggalLabel || ''}</p></div><span class="amount-green">+${formatRupiah(d.jumlah)}</span></div>`;
      } else {
        adaKeluar = true;
        keluarEl.innerHTML += `<div class="list-item"><div><p class="title">${d.keterangan}</p><p class="subtitle">${d.tanggalLabel || ''}</p></div><span class="amount-red">-${formatRupiah(Math.abs(d.jumlah))}</span></div>`;
      }
    });
    if(!adaMasuk) masukEl.innerHTML = '<p class="empty-state">Belum ada pemasukan.</p>';
    if(!adaKeluar) keluarEl.innerHTML = '<p class="empty-state">Belum ada pengeluaran.</p>';
    document.getElementById('akas-total-masuk').textContent = formatRupiah(totalMasuk);
  });
}

document.getElementById('akas-toggle-masuk').addEventListener('click', () => {
  const form = document.getElementById('form-kas-masuk');
  form.hidden = !form.hidden;
});
document.getElementById('akas-toggle-keluar').addEventListener('click', () => {
  const form = document.getElementById('form-kas-keluar');
  form.hidden = !form.hidden;
});

document.getElementById('form-kas-masuk').addEventListener('submit', e => {
  e.preventDefault();
  const keterangan = document.getElementById('akm-keterangan').value.trim();
  const jumlah = Number(document.getElementById('akm-jumlah').value);
  const errorEl = document.getElementById('akm-error');
  if(!keterangan || !jumlah){
    errorEl.textContent = 'Keterangan dan jumlah wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('kas').add({
    keterangan, jumlah,
    tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    tanggalLabel: labelTanggalHariIni()
  }).then(() => {
    document.getElementById('akm-keterangan').value = '';
    document.getElementById('akm-jumlah').value = '';
    document.getElementById('form-kas-masuk').hidden = true;
    loadAdminKas();
  });
});

document.getElementById('form-kas-keluar').addEventListener('submit', e => {
  e.preventDefault();
  const keterangan = document.getElementById('akk-keterangan').value.trim();
  const jumlah = Number(document.getElementById('akk-jumlah').value);
  const errorEl = document.getElementById('akk-error');
  if(!keterangan || !jumlah){
    errorEl.textContent = 'Keterangan dan jumlah wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  const tanggalLabel = labelTanggalHariIni();
  const batch = db.batch();
  batch.set(db.collection('kas').doc(), {
    keterangan, jumlah: -Math.abs(jumlah),
    tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    tanggalLabel
  });
  batch.set(db.collection('pengeluaran').doc(), {
    keterangan, jumlah: Math.abs(jumlah),
    tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    tanggalLabel
  });
  batch.commit().then(() => {
    document.getElementById('akk-keterangan').value = '';
    document.getElementById('akk-jumlah').value = '';
    document.getElementById('form-kas-keluar').hidden = true;
    loadAdminKas();
  });
});

/* =========================================================
   23. ADMIN: PROFIL (Firestore: "pengaturan/kontakAdmin")
========================================================= */
function loadAdminProfil(){
  db.collection('pengaturan').doc('kontakAdmin').get().then(doc => {
    const data = doc.exists ? doc.data() : {};
    document.getElementById('pa-nama').value = data.nama || '';
    document.getElementById('pa-hp').value = data.hp || '';
    document.getElementById('pa-email').value = data.email || '';
  });
}

document.getElementById('form-profil-admin').addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('pa-nama').value.trim();
  const hp = document.getElementById('pa-hp').value.trim();
  const email = document.getElementById('pa-email').value.trim();
  const errorEl = document.getElementById('profil-admin-error');
  if(!nama || !hp || !email){
    errorEl.textContent = 'Semua kolom wajib diisi.';
    return;
  }
  errorEl.textContent = '';
  db.collection('pengaturan').doc('kontakAdmin').set({ nama, hp, email }, { merge: true });
});

/* =========================================================
   14. PWA: DAFTARKAN SERVICE WORKER
========================================================= */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
