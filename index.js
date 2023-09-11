// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
let databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama: '',
    nomorHp: ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Data Satuan \n");
    console.log("0.Exit \n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData()
            break;
        case 3:
            resetData()
            break
        case 4:
            pencarianData()
            break
        case 5:
            hapusData()
            break
        case 0:
            //Failed
            exitProgram()
            break
        default:
            console.log("Pilihan Anda Tidak Valid !");
            viewMenu();
            break;
    }
}

function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
    const questNama = () => {
        readline.question("Nama :", (nama) => {
            if (/^[a-zA-Z]+$/.test(nama)) {
                objectKontak.nama = nama
            } else {
                console.log('Input Nama Harus Bersifat String')
                questNama();
            }
            //pemanggilan pertanyaan no hp
            questNoHp();
        })
    }

    const questNoHp = () => {
        readline.question("Nomor :", (nomor) => {

            //validasi input nomor harus angka
            if (/^[0-9]+$/.test(nomor)) {
                //validasi no HP yang sama
                if (nomorTersedia(nomor)) {
                    console.log('Nomor Yang Anda Input Sudah Ada Dalam Database !')
                    questNoHp();
                } else {
                    objectKontak.nomorHp = nomor
                    databaseKontak.push(Object.assign({}, objectKontak)) // insert data kedalam array databseKOntak
                    console.log(`Data Kontak Berhasil di Simpan`);
                }
            } else {
                console.log('Input No. Hp Harus Bersifat Number')
                questNoHp();
            }

            //pertanyaan apabila user ingin menginputkan data kembali
            const back = () => {
                readline.question("Input Data Lagi ? (y/n) :", (pilihan) => {
                    if (pilihan === "y") {
                        simpan()
                    } else if (pilihan === "n") {
                        viewMenu();
                    } else {
                        console.log('Pilihan Anda Tidak Valid !')
                        back();
                    }
                })
            }
            back();
        })
    }

    //pemanggilan pertanyaan awal
    questNama();
}

const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Kembali Ke Menu Utama ? (y/n) :", (pilihan) => {
        if (pilihan === "y") {
            viewMenu()
        } else {
            console.log('Pilihan Anda Tidak Valid !')
            kembali()
        }

    })
}

function lihatData() { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData() {
    readline.question("Apakah Anda Serius Ingin Menghapus Semua Data ? (y/n) :", (pilihan) => {
        if (pilihan === "y") {

            if (databaseKontak.length === 0) {

                console.log('Database Kontak Sudah Kosong');
                kembali();
            } else {

                databaseKontak.length = 0;
                lihatData();
                console.log('Database Anda Sudah Berhasil Dihapus');
                kembali();
            }
        } else {

            viewMenu()
        }

    })
}

function pencarianData() {
    readline.question("Masukkan Kata Kunci Pencarian : ", (keyWord) => {

        const hasilPencarian = databaseKontak.filter((kontak) => {
            return (
                kontak.nama.toLowerCase().includes(keyWord.toLowerCase()) || kontak.nomorHp.includes(keyWord)
            )
        })

        if (hasilPencarian.length > 0) {

            console.log('Data Yang Anda Cari Sebagai Berikut : ');
            console.table(hasilPencarian);
            console.log(`${hasilPencarian.length} Data Serupa Berhasil Ditemukan`)
            kembali()
        } else {

            console.log('Data Tidak Berhasil Ditemukan')
            kembali()
        }
    })
}

function hapusData() {
    readline.question("Input Data Yang Akan Dihapus Berdasarkan Index : ", (inputIndex) => {
        const index = parseInt(inputIndex);

        if (index >= 0 && index < databaseKontak.length) {
            const deletedItem = databaseKontak.splice(index, 1);
            console.log(`Data Milik ${deletedItem[0].nama} Sudah Terhapus !`);
            console.table(databaseKontak);
            kembali();
        } else {
            console.log('Indeks Yang Dimasukkan Tidak Valid');
            kembali();
        }
    });
}

function exitProgram() {

    console.log("Program Aplikasi Kontak akan ditutup.");
    readline.close(); // Tutup readline interface
    process.exit(0); // Keluar dari program dengan status berhasil (0)
}

function nomorTersedia(nomorHp) {
    //mencari apakah data didalam array ada yang memenuhi dengan inputtan nomorHP
    return databaseKontak.some((kontak) => kontak.nomorHp === nomorHp);
}



viewMenu() // panggil fungsi view menu untuk pertama kali