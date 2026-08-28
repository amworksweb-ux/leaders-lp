/* =========================
   OPENING
========================= */

const opening = document.querySelector(".opening");

if (opening) {

    setTimeout(() => {

        opening.style.transition =
            "transform .8s cubic-bezier(.76,0,.24,1), opacity .8s ease";

        opening.style.transform = "translateY(-100%)";
        opening.style.opacity = "0";

    }, 3400);

    setTimeout(() => {

        opening.remove();

    }, 4300);

}


/* =========================
   HERO SLIDER
========================= */

const heroTrack = document.querySelector(".hero-track");
const heroSlides = document.querySelectorAll(".hero-slide");
const nextButton = document.querySelector(".hero-next");
const prevButton = document.querySelector(".hero-prev");
const heroCurrent = document.querySelector(".hero-current");

let heroIndex = 0;
let heroTimer;

const displayTime = 2200;
const slideSpeed = 700;


/* 数字表示 */
function updateHeroCount() {

    let number = heroIndex + 1;

    if (number > 3) {
        number = 1;
    }

    if (heroCurrent) {
        heroCurrent.textContent =
            String(number).padStart(2, "0");
    }
}


/* 指定した画像へ移動 */
function showHeroSlide(index) {

    heroIndex = index;

    heroTrack.style.transition =
        `transform ${slideSpeed}ms cubic-bezier(.76,0,.24,1)`;

    heroTrack.style.transform =
        `translate3d(-${heroIndex * 100}%, 0, 0)`;

    updateHeroCount();
}


/* 自動で次へ */
function moveHero() {

    clearTimeout(heroTimer);

    showHeroSlide(heroIndex + 1);
}


/* スライドが終わったら */
if (heroTrack) {

    heroTrack.addEventListener("transitionend", () => {

        /* 4枚目は1枚目のコピー */
        if (heroIndex === heroSlides.length - 1) {

            heroTrack.style.transition = "none";

            heroIndex = 0;

            heroTrack.style.transform =
                "translate3d(0,0,0)";

            updateHeroCount();
        }

        clearTimeout(heroTimer);

        heroTimer = setTimeout(moveHero, displayTime);
    });

}


/* → 次へ */
if (nextButton) {

    nextButton.addEventListener("click", () => {

        clearTimeout(heroTimer);

        showHeroSlide(heroIndex + 1);
    });

}


/* ← 前へ */
if (prevButton) {

    prevButton.addEventListener("click", () => {

        clearTimeout(heroTimer);

        if (heroIndex === 0) {
            showHeroSlide(2);
        } else {
            showHeroSlide(heroIndex - 1);
        }

    });

}


/* 自動再生開始 */
if (heroTrack && heroSlides.length > 0) {

    updateHeroCount();

    heroTimer = setTimeout(moveHero, displayTime);
}


/* =========================
   SCROLL FADE
========================= */

const fadeItems = document.querySelectorAll(".fade-up");

if (fadeItems.length > 0) {

    const fadeObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.12
    });

    fadeItems.forEach((item) => {
        fadeObserver.observe(item);
    });

}