/* buzzza.app shared behavior. Loaded by every page, deferred: nothing here is
   needed to paint, and the .rise rules only hide content once .js is set. */
(function () {
  document.documentElement.classList.add('js');

  // Reveal on scroll. The class is set on the root before anything else so a
  // browser with JS disabled never hides a section it cannot then reveal.
  var reveal = function (el) { el.classList.add('in'); };
  var risers = document.querySelectorAll('.rise');
  if (!('IntersectionObserver' in window)) {
    risers.forEach(reveal);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    risers.forEach(function (el) { io.observe(el); });
  }

  // A hairline under the sticky nav, once the page has actually moved.
  var nav = document.querySelector('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
