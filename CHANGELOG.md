# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Emotion Editor > Paslon: halaman **Generate** yang mengisi data emotion seluruh kabupaten/kota pada **rentang tanggal terpilih** jam 01:00, baik untuk satu paslon maupun semua paslon sekaligus. Data digenerate untuk setiap tanggal dalam rentang dengan nilai acak yang berbeda tiap tanggal. Setiap metrik bernilai 3-4 digit dan total seluruh metrik per wilayah dibatasi agar tidak melebihi nilai audience wilayah tersebut.
- Rate Popularity: halaman **Generate** yang mengisi data rate popularity untuk seluruh paslon (atau satu paslon) pada **rentang tanggal terpilih** jam 01:00. Rate tiap paslon berupa persentase 0-100% yang **independen** (tidak dijumlahkan menjadi 100%): tiap paslon punya base rate acak sendiri per generate, lalu tiap tanggal berfluktuasi wajar di sekitar base itu sehingga garis rate naik-turun masuk akal dan berbeda tiap kali generate ulang. Cek dan replace (nonaktifkan `isActive`) data existing mencakup seluruh tanggal dalam rentang pada jam generate.
- SWOT: halaman **Generate** yang mengisi data SWOT untuk seluruh kandidat (atau satu kandidat). Tiap kandidat diisi 4 kategori (STRENGTH/WEAKNESS/OPPORTUNITY/THREAT), dan tiap kategori berisi **3 value**. Tiap value berupa **1 paragraf berisi 3 kalimat** acak yang dirangkai dari pool kalimat Indonesia per kategori, sehingga berbeda tiap kali generate ulang. SWOT lama kandidat dinonaktifkan (`isActive`) lebih dulu lalu diisi ulang (replace).

### Changed
- Generate emotion paslon kini memberi tiap paslon **profil sentimen acak sendiri per tanggal**, sehingga persentase agregat POSITIVE/NEUTRAL/NEGATIVE tiap paslon berbeda secara terlihat (selisih halus ~±4-6%, NEUTRAL tetap stabil ~12-13%) dan berubah tiap kali generate ulang. Sebelumnya semua paslon konvergen ke proporsi yang hampir identik (~37.5/12.5/50) karena seluruh metrik memakai distribusi seragam yang sama.
- Generate emotion candidate mendapat perbaikan yang sama: tiap kandidat kini memiliki **profil sentimen acak sendiri** sehingga persentase agregat antar kandidat berbeda terlihat, tidak lagi konvergen ke proporsi yang hampir identik.
- Halaman generate emotion candidate kini menerima **rentang tanggal** (range picker), bukan hanya tanggal hari ini. Data digenerate untuk setiap tanggal dalam rentang dengan nilai (dan profil sentimen) acak yang berbeda tiap tanggal. Cek dan replace data existing mencakup seluruh tanggal dalam rentang pada jam generate.
