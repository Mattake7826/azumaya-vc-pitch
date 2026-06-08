/* =========================================================
   Azumaya Recovery Pod — main.js
   - Nav background change on scroll
   - Mobile drawer toggle
   - Scroll reveal via IntersectionObserver
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Nav: background change on scroll ---------- */
  var nav = document.querySelector('.nav');
  // Privacy page uses a permanently solid nav; skip the scroll toggle there.
  var isSolidNav = nav && nav.classList.contains('nav--solid');

  function onScroll() {
    if (!nav || isSolidNav) return;
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var drawer = document.querySelector('.nav__drawer');

  function closeDrawer() {
    if (!toggle || !drawer) return;
    toggle.classList.remove('is-open');
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close when a drawer link is tapped
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Close drawer if resized up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeDrawer();
    });
  }

  /* ---------- Button press feedback (soft "pop") ---------- */
  var buttons = document.querySelectorAll('.btn');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.remove('btn--press');
      // Force reflow so the animation restarts on every press.
      void btn.offsetWidth;
      btn.classList.add('btn--press');
    });

    btn.addEventListener('animationend', function (e) {
      // btnPop runs on the button itself; clear once it finishes.
      if (e.animationName === 'btnPop') {
        btn.classList.remove('btn--press');
      }
    });
  });

  /* ---------- Lightbox (location images) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var locationTags = document.querySelectorAll('.locations__tag');
  var lastFocused = null;

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', caption);
    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-visible');
    // Next frame so the opacity/scale transition runs.
    requestAnimationFrame(function () {
      lightbox.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-visible')) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    var done = function () {
      lightbox.classList.remove('is-visible');
      lightboxImg.setAttribute('src', '');
      lightbox.removeEventListener('transitionend', done);
    };
    lightbox.addEventListener('transitionend', done);
    // Fallback in case transitionend doesn't fire (reduced motion).
    setTimeout(done, 400);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  if (lightbox && locationTags.length) {
    locationTags.forEach(function (tag) {
      tag.addEventListener('click', function () {
        openLightbox(tag.getAttribute('data-img'), tag.getAttribute('data-caption') || '');
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Click on the dark backdrop (outside the figure) closes.
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
