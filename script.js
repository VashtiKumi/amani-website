if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

function initAnimations() {
  document.querySelectorAll('.fade-in').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  document.querySelectorAll('.slide-in-left').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 0.9,
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  document.querySelectorAll('.slide-in-right').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 0.9,
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  document.querySelectorAll('.scale-in').forEach(el => {
    gsap.fromTo(el, { opacity: 0, scale: 0.95 }, {
      opacity: 1, scale: 1, duration: 0.8,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}

document.addEventListener('click', function (e) {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href === "#" || href === "") return;
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    const navLinks = document.getElementById('navLinks');
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      const mobileBtn = document.getElementById('mobileBtn');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.getElementById('navLinks');
if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    const isOpen = navLinks.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });


  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    const svg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
         <rect width='100%' height='100%' fill='#f3f4f6'/>
         <text x='50%' y='50%' font-size='20' fill='#9ca3af' dominant-baseline='middle' text-anchor='middle'>Image not found</text>
       </svg>`
    );
    img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
    img.style.objectFit = 'cover';
  });
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('fade-out');

    setTimeout(() => {
      if (loader) loader.style.display = 'none';
      const main = document.getElementById('mainContent');
      if (main) {
        main.classList.add('visible'); 
        if (typeof gsap !== 'undefined') {
          initAnimations();
        }
      }
      document.body.style.overflow = 'auto';
    }, 1000);
  }, 10000); 
});

(function createLoaderBubbles(){
  const container = document.querySelector('.loader-bubbles');
  if (!container) return;
  const bubbleCount = 14;
  for (let i = 0; i < bubbleCount; i++) {
    const b = document.createElement('div');
    b.className = 'loader-bubble';
    const size = 8 + Math.round(Math.random() * 38); // px
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${5 + Math.random() * 90}%`;
    b.style.background = `rgba(255,255,255, ${0.08 + Math.random() * 0.25})`;
    const delay = Math.random() * 2;
    const duration = 8 + Math.random() * 8;
    b.style.animationDuration = `${duration}s`;
    b.style.animationDelay = `${delay}s`;
    container.appendChild(b);
  }
})();

(function heroSlider(){
  const slides = document.querySelectorAll('.hero-slider .hero-slide');
  if (!slides.length) return;
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 3000);
})();

(function cofoundersSlider(){
  const slides = document.querySelectorAll('.cf-slide');
  if (!slides.length) return;
  let i = 0;
  const next = () => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  };
  const prev = () => {
    slides[i].classList.remove('active');
    i = (i - 1 + slides.length) % slides.length;
    slides[i].classList.add('active');
  };

  slides[0].classList.add('active');

  const interval = setInterval(next, 4200);

  const btnNext = document.querySelector('.cf-next');
  const btnPrev = document.querySelector('.cf-prev');
  if (btnNext) btnNext.addEventListener('click', () => { next(); clearInterval(interval); });
  if (btnPrev) btnPrev.addEventListener('click', () => { prev(); clearInterval(interval); });

  const container = document.querySelector('.cofounders-slider');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(interval));
  }
})();
