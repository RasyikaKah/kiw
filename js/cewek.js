const halamanAwal = document.getElementById("halaman-awal");
const kontenUtama = document.getElementById("konten-utama");
const btnBukaSurat = document.getElementById("btn-buka-surat");
const btnSubmitNama = document.getElementById("btn-submit-nama");
const inputNama = document.getElementById("input-nama");

const musik = document.getElementById("backsound");
const wrapperEfek = document.getElementById("efek-lingkaran");

// Elemen Baru Bagian Pertanyaan (Punya lo yang lama)
const sectionNama = document.getElementById("section-nama");
const sectionPertanyaan = document.getElementById("section-pertanyaan");
const sapaanNama = document.getElementById("sapaan-nama");
const btnIya = document.getElementById("btn-iya");
const btnTidak = document.getElementById("btn-tidak");

// TAMBAHKAN 3 BARIS INI BIAR BISA DIEDIT PAS DIKLIK
const fotoMaskot = document.querySelector(".mascot-bundar");
const boxPertanyaan = document.querySelector(".box-pertanyaan");
const wrapperTombol = document.querySelector(".wrapper-tombol-pilihan");

let namaUser = "";
let hitungKlikTidak = 0; // Counter buat ngitung berapa kali tombol ga dipencet

// 1. Logika Klik Buka Surat (Selesai)
btnBukaSurat.onclick = () => {
    btnBukaSurat.classList.add("open");
    musik.volume = 0.3; 
    musik.play().catch(err => console.log(err));
    
    setTimeout(() => {
        halamanAwal.style.animation = "fade-out 0.4s ease forwards";
        setTimeout(() => {
            halamanAwal.style.display = "none";
            kontenUtama.style.display = "block";
            buatEfekHati(); 
            inputNama.focus();
        }, 400);
    }, 1000); 
}

// GANTI FUNGSI LINGKARAN JADI HUJAN HATI
function buatEfekHati() {
    const wrapper = document.getElementById("efek-lingkaran"); // Tetep pake wadah ini ga masalah
    if (!wrapper) return;

    // Bikin hati rontok setiap 300ms
    setInterval(() => {
        const hati = document.createElement("div");
        hati.classList.add("hati-gugur");
        
        // Isi pake emoji hati murni biar anti-gagal nampil
        hati.innerText = "❤️"; 
        
        // Acak ukuran dan posisi horizontalnya
        const ukuran = Math.random() * 15 + 10; // Ukuran 10px sampai 25px
        hati.style.fontSize = `${ukuran}px`;
        hati.style.left = `${Math.random() * 100}vw`;
        
        // Acak durasi jatuhnya biar estetik (antara 3 sampai 6 detik)
        hati.style.animationDuration = `${Math.random() * 3 + 3}s`;
        
        wrapper.appendChild(hati);
        
        // Hapus elemen dari HTML kalau udah sampai bawah biar gak ngebatin memori browser
        setTimeout(() => {
            hati.remove();
        }, 6000);
    }, 300);
}

// 3. Logika Klik Tombol OK Nama (Pindah Ke Pertanyaan)
btnSubmitNama.onclick = () => {
    namaUser = inputNama.value.trim();
    if (namaUser === "") {
        alert("Masukkan nama kamu dulu ya... 🫣");
        return;
    }
    
    // Set teks sapaan sesuai screenshot: "Hai, [nama user] ✨"
    sapaanNama.innerHTML = `Hai, ${namaUser.toLowerCase()} ✨`;
    
    // Sembunyikan form nama, tampilkan pertanyaan nembak
    sectionNama.style.display = "none";
    sectionPertanyaan.style.display = "block";
}

// 4. LOGIKA TOMBOL "TIDAK" KABUR + 2 TOMBOL DI AKHIR (WA & COWOK.HTML)
btnTidak.onclick = () => {
    hitungKlikTidak++;
    
    if (hitungKlikTidak <= 3) {
        btnTidak.style.position = "absolute";
        btnTidak.style.zIndex = "10";
        const box = document.querySelector(".box-pertanyaan");
        const batasX = box.clientWidth - btnTidak.clientWidth - 20;
        const batasY = box.clientHeight - btnTidak.clientHeight - 20;
        const acakX = Math.max(10, Math.floor(Math.random() * batasX));
        const acakY = Math.max(10, Math.floor(Math.random() * batasY));
        btnTidak.style.left = `${acakX}px`;
        btnTidak.style.top = `${acakY}px`;
    }
    
    // Klik ke-4: Teks Sedih Selesai -> Munculin 2 Tombol Pilihan Akhir
    if (hitungKlikTidak > 3) {
        fotoMaskot.src = "assets/dudu2.gif"; 
        sapaanNama.innerText = "Yaaah... Nt Lagi";
        wrapperTombol.innerHTML = ""; 
        
        boxPertanyaan.style.color = "#ffffff";
        boxPertanyaan.style.textAlign = "justify";
        boxPertanyaan.style.fontSize = "15px";
        boxPertanyaan.style.lineHeight = "1.8";
        
        // Struktur wadah teks + 2 tombol di bawahnya (display: none dulu biar muncul smooth)
        boxPertanyaan.innerHTML = `
            <div id='isi-teks-sedih'></div>
            <div id='wrapper-opsi-tidak' style='display: none; margin-top: 25px; display: flex; justify-content: center; gap: 15px; animation: containerMasuk 0.5s ease forwards;'>
                <!-- Tombol 1: Menuju WA lo -->
                <a href="https://wa.me/62895327994877?text=Makasi%20Ya%20Raka" target="_blank" style="text-decoration: none;">
                    <button style="background: #25d366; color: white; border: none; padding: 10px 18px; font-size: 14px; font-weight: bold; border-radius: 20px; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
                        Whatsupp?
                    </button>
                </a>
                
                <!-- Tombol 2: Menuju cowok.html -->
                <a href="cowok.html" style="text-decoration: none;">
                    <button style="background: #4b5563; color: white; border: none; padding: 10px 18px; font-size: 14px; font-weight: bold; border-radius: 20px; cursor: pointer; box-shadow: 0 4px 12px rgba(75, 85, 99, 0.3);">
                        Mau Gacha?
                    </button>
                </a>
            </div>
        `;
        
        const wadahTeks = document.getElementById("isi-teks-sedih");
        const wrapperOpsiTidak = document.getElementById("wrapper-opsi-tidak");
        
        // Kita paksa sembunyikan dulu wrapper tombolnya lewat JS biar gak langsung nongol pas ngetik
        wrapperOpsiTidak.style.setProperty('display', 'none', 'important');
        
        const teksSedih = "Yaudah, semangat ya jalanin harinya... Aku tau kok hidupmu lagi berat banget belakangan ini atau ada hati lain yang harus kamu jaga baik-baik di sana. Makasih ya udah mau sempetin baca ginian,  iseng doang kok aku juga ga berharap di terima siapapun kamu, yg penting jangan nyerah yah sama jangan belok juga, jodoh udah ada yg ngatur, kalo kita nyerah? jodoh mu gimana nanti? yekan? SEMANGAT!! Kalo trus berjuang pasti dpt sama sama yg Berjuang, tetep jaga kesehatan dan jangan lupa senyum hari ini! 😊✨";
        
        // Mulai mengetik teks panjangnya
        ketikTeksPinter(wadahTeks, teksSedih, 15);
        
        // Jeda 4 detik (menyesuaikan panjang teks sedih biar beres ngetik dulu), baru 2 tombolnya muncul berjejer rapi
        setTimeout(() => {
            wrapperOpsiTidak.style.setProperty('display', 'flex', 'important');
        }, 4000);
    }
}

// 5. LOGIKA TOMBOL "IYA MAU KOK" + TOMBOL WHATSAPP (AUTO-TEXT)
btnIya.onclick = () => {
    fotoMaskot.src = "assets/dudu3.gif"; 
    sapaanNama.style.display = "none";
    wrapperTombol.innerHTML = ""; 
    
    // Struktur wadah teks + siapkan container tombol WA di paling bawah (display: none dulu)
    boxPertanyaan.innerHTML = `
        <div id='judul-kaget' style='color: #ffffff; font-size: 20px; font-weight: 800; margin-bottom: 15px; text-align: center;'></div>
        <div id='sub-kaget' style='color: #ffffff; font-size: 15px; line-height: 1.6; text-align: center; margin-bottom: 20px;'></div>
        <div id='wrapper-wa' style='display: none; text-align: center; animation: containerMasuk 0.5s ease forwards;'>
            <a href="https://wa.me/62895327994877?text=Aku%20mau%20ka" target="_blank" style="text-decoration: none;">
                <button style="background: #25d366; color: white; border: none; padding: 12px 25px; font-size: 15px; font-weight: bold; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); display: inline-flex; align-items: center; gap: 8px;">
                    CHAT GUA, SEKARANG😡
                </button>
            </a>
        </div>
    `;
    
    const wadahJudul = document.getElementById("judul-kaget");
    const wadahSub = document.getElementById("sub-kaget");
    const wrapperWa = document.getElementById("wrapper-wa");
    
    const teksJudul = "HAH SUMPAH MAU BENERAN?! 😱";
    const teksSub = "BECANDA LU YAK?? BECANDA NIIII?<br>anjir jungkir balik gua ni, my bini gweh kah, jujur lu jangan becanda jir, beneran? cius? mi apah? kalo cius mi lanjut wa gak sieh😏";
    
    // Ngetik judul
    ketikTeksPinter(wadahJudul, teksJudul, 20);
    
    // Jeda 600ms baru ngetik sub-teks
    setTimeout(() => {
        ketikTeksPinter(wadahSub, teksSub, 20);
    }, 600);
    
    // Jeda 2.5 detik (pas teks udah kelar ngetik semua), tombol WhatsApp baru muncul smooth
    setTimeout(() => {
        wrapperWa.style.display = "block";
    }, 2500);
}

// FUNGSI KETIK PINTER: HANYA NGETIK TEKS, BUKAN TAG HTML
function ketikTeksPinter(elemen, teks, kecepatan = 20) {
    elemen.innerHTML = "";
    let i = 0;
    
    function jalanKetik() {
        if (i < teks.length) {
            // Kalau nemu tag <br>, langsung masukin 4 karakter sekaligus
            if (teks.substring(i, i + 4) === "<br>") {
                elemen.innerHTML += "<br>";
                i += 4;
            } else {
                elemen.innerHTML += teks.charAt(i);
                i++;
            }
            setTimeout(jalanKetik, kecepatan);
        }
    }
    jalanKetik();
}