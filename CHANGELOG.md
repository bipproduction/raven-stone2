# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Emotion Editor > Paslon: halaman **Generate** yang mengisi data emotion seluruh kabupaten/kota pada **rentang tanggal terpilih** jam 01:00, baik untuk satu paslon maupun semua paslon sekaligus. Data digenerate untuk setiap tanggal dalam rentang dengan nilai acak yang berbeda tiap tanggal. Setiap metrik bernilai 3-4 digit dan total seluruh metrik per wilayah dibatasi agar tidak melebihi nilai audience wilayah tersebut.

### Changed
- Generate emotion paslon kini memberi tiap paslon **profil sentimen acak sendiri per tanggal**, sehingga persentase agregat POSITIVE/NEUTRAL/NEGATIVE tiap paslon berbeda secara terlihat (selisih halus ~±4-6%, NEUTRAL tetap stabil ~12-13%) dan berubah tiap kali generate ulang. Sebelumnya semua paslon konvergen ke proporsi yang hampir identik (~37.5/12.5/50) karena seluruh metrik memakai distribusi seragam yang sama.
- Generate emotion candidate mendapat perbaikan yang sama: tiap kandidat kini memiliki **profil sentimen acak sendiri** sehingga persentase agregat antar kandidat berbeda terlihat, tidak lagi konvergen ke proporsi yang hampir identik.
