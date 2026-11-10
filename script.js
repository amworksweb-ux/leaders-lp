
 // LEADERS ENTERTAINMENT — clean rebuild
 (() => {
    const opening = document.querySelector('.opening');
  
    if (opening) {
      const finish = () => {
        opening.classList.add('is-done');
        setTimeout(() => opening.remove(), 700);
      };
  
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finish();
      } else {
        setTimeout(finish, 1500);
      }
    }
  
    const slides = [...document.querySelectorAll('.hero-slide')];
    const name = document.querySelector('#heroName');
    const category = document.querySelector('#heroCategory');
    const counter = document.querySelector('#heroCounter');
  
    let index = 0;
    let timer;
    const duration = 5000;
  
    function show(next) {
      if (!slides.length) return;
  
      index = (next + slides.length) % slides.length;
  
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
  
      const active = slides[index];
  
      if (name) name.textContent = active.dataset.name || '';
      if (category) category.textContent = active.dataset.category || '';
  
      if (counter) {
        counter.textContent =
          `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      }
    }
  
    function start() {
      clearInterval(timer);
  
      if (
        slides.length > 1 &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        timer = setInterval(() => show(index + 1), duration);
      }
    }
  
    document.querySelector('.hero-prev')?.addEventListener('click', () => {
      show(index - 1);
      start();
    });
  
    document.querySelector('.hero-next')?.addEventListener('click', () => {
      show(index + 1);
      start();
    });
  
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        start();
      }
    });
  
    show(0);
    start();
  
    const fade = document.querySelectorAll('.fade-up');
  
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        }),
        { threshold: 0.08 }
      );
  
      fade.forEach(el => observer.observe(el));
    } else {
      fade.forEach(el => el.classList.add('show'));
    }
  })();
  