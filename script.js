const images = document.querySelectorAll(".hero-image");

let current = 0;

setInterval(() => {

    images[current].classList.remove("active");

    current++;

    if(current >= images.length){

        current = 0;

    }

    images[current].classList.add("active");

},5000);