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
let isSliding = false;

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


/* 次の自動再生を予約 */
function startHeroTimer() {

    clearTimeout(heroTimer);

    heroTimer = setTimeout(() => {

        if (!isSliding) {
            showHeroSlide(heroIndex + 1);
        }

    }, displayTime);
}


/* 指定した画像へ移動 */
function showHeroSlide(index) {

    if (!heroTrack || isSliding) {
        return;
    }

    isSliding = true;
    heroIndex = index;

    heroTrack.style.transition =
        `transform ${slideSpeed}ms cubic-bezier(.76,0,.24,1)`;

    heroTrack.style.transform =
        `translate3d(-${heroIndex * 100}%, 0, 0)`;

    updateHeroCount();
}


/* スライド終了 */
if (heroTrack) {

    heroTrack.addEventListener("transitionend", (event) => {

        if (event.propertyName !== "transform") {
            return;
        }

        /* 4枚目＝1枚目のコピー */
        if (heroIndex === heroSlides.length - 1) {

            heroTrack.style.transition = "none";

            heroIndex = 0;

            heroTrack.style.transform =
                "translate3d(0, 0, 0)";

            updateHeroCount();
        }

        isSliding = false;

        startHeroTimer();
    });

}


/* → 次へ */
if (nextButton) {

    nextButton.addEventListener("click", () => {

        /* スライド中は連打を無視 */
        if (isSliding) {
            nextButton.blur();
            return;
        }

        clearTimeout(heroTimer);

        showHeroSlide(heroIndex + 1);

        /* スマホで押された状態を残さない */
        nextButton.blur();
    });

}


/* ← 前へ */
if (prevButton) {

    prevButton.addEventListener("click", () => {

        /* スライド中は連打を無視 */
        if (isSliding) {
            prevButton.blur();
            return;
        }

        clearTimeout(heroTimer);

        if (heroIndex === 0) {
            showHeroSlide(2);
        } else {
            showHeroSlide(heroIndex - 1);
        }

        /* スマホで押された状態を残さない */
        prevButton.blur();
    });

}


/* 自動再生開始 */
if (heroTrack && heroSlides.length > 0) {

    updateHeroCount();

    startHeroTimer();
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