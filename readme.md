
# Cara menjalankan program :

* pastikan sudah terinstal nodejs, untuk mengeceknya silahkan buka cmd dan ketik : 
```bash
node -v
```
jika muncul seperti ini : v18.12.1 berarti teman - teman sudah menginstall nodejs

* silahkan clone atau download kode ini kedalam komputer teman - teman 
* jika sudah, jalankan program tersebut dengan mengetik : 
```bash
node index.js
```
atau

```bash
npm run start
```
boleh pilih salah satu

# Berikut fungsi yang sudah saya buat dengan template yang sudah digunakan

1. Sudah ada fungsi reset data
2. Sudah ada fungsi pencarian data
3. Sudah ada fungsi hapus data berdasarkan index
4. Sudah ada fungsi validasi input nama wajib huruf dan number harus angka
5. Sudah ada fungsi dimana tidak bisa input nomor yang sudah pernah di input

    <br>Ada beberapa kode yang saya ubah terutama pada bagian readline question. pada pertanyaan pertama dan kedua saya masukan kedalam anonymous function agar memudahkan ketika validasi input. karena ketika input salah maka akan memanggil fungsi pertanyaan tersebut

    Jika sesuai template, databaseKontak menggunakan deklarasi const. tetapi kerena fungsi hapus dimana ia mangubah isi variable databaseKontak. maka saya mengubahnya menjadi menggunakan let