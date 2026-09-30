/* Entrada al hacer scroll, compartida por los 10 bocetos.
   IntersectionObserver y no listener de scroll: sin reflows continuos. */
(function () {
  var el = document.querySelectorAll('.rv');
  if (!el.length) return;
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.prototype.forEach.call(el, function (n) { n.classList.add('on'); });
    return;
  }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  Array.prototype.forEach.call(el, function (n) { io.observe(n); });
})();
