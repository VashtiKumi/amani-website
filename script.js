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
