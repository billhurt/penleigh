/* Penleigh International — shared behaviour for every page. Loaded with `defer`. */
(function () {
  // Mobile menu
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.nav-mobile-menu');
  if (hamburger && mobileMenu) {
    var setMenu = function (open) {
      mobileMenu.classList.toggle('open', open);
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
    };
    hamburger.addEventListener('click', function () { setMenu(!mobileMenu.classList.contains('open')); });
    mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }

  // Logo strip: clone the list once so the -50% loop is seamless.
  // Clones keep the onerror handler, so a missing file hides in both copies and the halves stay equal.
  var track = document.querySelector('.logo-track');
  var list = track && track.querySelector('.logo-list');
  if (list) {
    var clone = list.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('img').forEach(function (img) { img.alt = ''; });
    track.appendChild(clone);
  }

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // Cookie consent + Google Analytics (loads only after consent)
  var KEY = 'pi_cookie_consent';
  var banner = document.getElementById('cookie-banner');
  if (banner) {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
    var loadGtag = function () {
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-S7HWTWMBGB';
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date()); gtag('config', 'G-S7HWTWMBGB');
    };
    if (stored === 'accepted') { loadGtag(); banner.classList.add('hidden'); }
    else if (stored === 'declined') { banner.classList.add('hidden'); }
    document.getElementById('cookie-accept').addEventListener('click', function () { save('accepted'); banner.classList.add('hidden'); loadGtag(); });
    document.getElementById('cookie-decline').addEventListener('click', function () { save('declined'); banner.classList.add('hidden'); });
  }
})();
