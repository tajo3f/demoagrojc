
(() => {
  'use strict';
  window.__agroMotionReady = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-progress span');
  const backTop = document.querySelector('[data-back-top]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const year = document.querySelector('[data-year]');

  if (year) year.textContent = new Date().getFullYear();

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (backTop) backTop.classList.toggle('visible', y > 620);

    if (progress) {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
    }

    if (!reduced) {
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const frame = el.closest('.parallax-frame');
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translateY(${offset * -22}px) scale(1.05)`;
      });
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
      document.body.style.overflow = open ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }

  const tilt = document.querySelector('[data-tilt]');
  if (tilt && !reduced && window.matchMedia('(pointer:fine)').matches) {
    const reset = () => { tilt.style.transform = ''; };
    tilt.addEventListener('pointermove', (event) => {
      const rect = tilt.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `perspective(1000px) rotateX(${py * -2.5}deg) rotateY(${px * 3}deg) translateY(-2px)`;
    });
    tilt.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && tilt) tilt.style.transform = '';
  });
})();
