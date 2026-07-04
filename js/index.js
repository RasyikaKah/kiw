const girlBtn = document.getElementById("girl");
const boyBtn = document.getElementById("boy");

const startScreen = document.getElementById("startScreen");
const container = document.querySelector(".container");

const welcomeSound = document.getElementById("welcomeSound");
const maleSound = document.getElementById("maleSound");
const femaleSound = document.getElementById("femaleSound");
const bgMusic = document.getElementById("bgMusic");

// =========================
// START SCREEN
// =========================

startScreen.addEventListener("click", () => {

    startScreen.classList.add("hide");
    container.classList.add("show");

    welcomeSound.play();

    welcomeSound.onended = () => {

        bgMusic.volume = 0;
        bgMusic.play();

        fadeInMusic();

    };

}, { once:true });

// =========================
// CEWEK
// =========================

girlBtn.addEventListener("click", () => {

    girlBtn.disabled = true;
    boyBtn.disabled = true;

    fadeOutMusic();

    setTimeout(() => {

        femaleSound.play();

        femaleSound.onended = () => {

            window.location.href = "cewek.html";

        };

    },400);

});

// =========================
// COWOK
// =========================

boyBtn.addEventListener("click", () => {

    girlBtn.disabled = true;
    boyBtn.disabled = true;

    fadeOutMusic();

    setTimeout(() => {

        maleSound.play();

        maleSound.onended = () => {

            window.location.href = "cowok.html";

        };

    },400);

});

// =========================
// FADE IN MUSIC
// =========================

function fadeInMusic(){

    let volume = 0;

    bgMusic.volume = volume;

    const fade = setInterval(() => {

        volume += 0.02;

        if(volume >= 0.25){

            volume = 0.25;

            clearInterval(fade);

        }

        bgMusic.volume = volume;

    },100);

}

// =========================
// FADE OUT MUSIC
// =========================

function fadeOutMusic(){

    let volume = bgMusic.volume;

    const fade = setInterval(() => {

        volume -= 0.02;

        if(volume <= 0){

            volume = 0;

            bgMusic.volume = 0;
            bgMusic.pause();

            clearInterval(fade);

        }

        bgMusic.volume = volume;

    },50);

}

