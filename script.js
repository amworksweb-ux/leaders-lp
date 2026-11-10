
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
  
   
// ========================================
// TALENT — INFINITE CARD DECK
// ========================================

(() => {
    const deck = document.querySelector('#talentDeck');
    if (!deck) return;
  
    const cards = [...deck.querySelectorAll('.deck-card')];
    const counter = document.querySelector('#deckCounter');
    const prev = document.querySelector('.deck-prev');
    const next = document.querySelector('.deck-next');
  
    if (!cards.length) return;
  
    let current = 0;
    let busy = false;
    let startX = null;
    let startY = null;
  
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  
    const animationTime = reduceMotion ? 0 : 550;
  
    function render() {
      cards.forEach((card, i) => {
        const depth = (i - current + cards.length) % cards.length;
  
        card.dataset.depth = String(depth);
        card.setAttribute('aria-hidden', String(depth !== 0));
      });
  
      if (counter) {
        counter.textContent =
          `${String(current + 1).padStart(2, '0')} / ` +
          `${String(cards.length).padStart(2, '0')}`;
      }
      
    }
  
    

    
function change(direction) {
    if (busy || cards.length < 2) return;
  
    busy = true;
  
    if (direction > 0) {
      // 右：現在のカードが右へ飛び出す
      const frontCard = cards[current];
      frontCard.classList.add('is-exiting-right');
  
      setTimeout(() => {
        current = (current + 1) % cards.length;
  
        frontCard.style.transition = 'none';
        frontCard.classList.remove('is-exiting-right');
  
        render();
  
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            frontCard.style.transition = '';
            busy = false;
          });
        });
      }, animationTime);
  
    } else {
      // 左：前のカードが左から戻ってくる
      const previous =
        (current - 1 + cards.length) % cards.length;
  
      const previousCard = cards[previous];
  
      previousCard.style.transition = 'none';
      previousCard.classList.add('is-entering-left');
  
      void previousCard.offsetWidth;
  
      current = previous;
      render();
  
      requestAnimationFrame(() => {
        previousCard.style.transition = '';
  
        requestAnimationFrame(() => {
          previousCard.classList.remove('is-entering-left');
        });
      });
  
      setTimeout(() => {
        previousCard.style.transition = '';
        busy = false;
      }, animationTime + 50);
    }
  }
  
  
  
    next?.addEventListener('click', () => change(1));
    prev?.addEventListener('click', () => change(-1));
  
    // スマホのスワイプ・PCのドラッグ
    deck.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      startX = event.clientX;
      startY = event.clientY;
    });
  
    deck.addEventListener('pointerup', event => {
      if (startX === null) return;
  
      const diffX = event.clientX - startX;
      const diffY = event.clientY - startY;
  
      startX = null;
      startY = null;
  
      if (Math.abs(diffX) > 45 &&
          Math.abs(diffX) > Math.abs(diffY)) {
        change(diffX < 0 ? 1 : -1);
      }
    });
  
    deck.addEventListener('pointercancel', () => {
      startX = null;
      startY = null;
    });
  
    // PCのトラックパッド横スクロール
    deck.addEventListener('wheel', event => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
  
      event.preventDefault();
  
      if (!busy && Math.abs(event.deltaX) > 8) {
        change(event.deltaX > 0 ? 1 : -1);
      }
    }, { passive: false });
  
    // キーボード操作
    deck.setAttribute('tabindex', '0');
    deck.setAttribute('aria-label', '所属タレントのカード一覧');
  
    deck.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        change(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        change(-1);
      }
    });
  
    render();
  })();
  
  