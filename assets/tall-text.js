/* Sub-headings marked .eh-tallb are stretched 1.3x vertically with a CSS transform, which doesn't move the
   content below them. This gives each one a bottom margin equal to the extra 30% of its current height, and
   keeps it right as the text re-wraps at different widths or the web fonts finish loading. */
(function () {
  'use strict';
  const STRETCH = 1.3;
  function fit(el) {
    const h = el.offsetHeight; // layout height, unaffected by the transform
    if (h) el.style.marginBottom = ((STRETCH - 1) * h).toFixed(1) + 'px';
  }
  const ro = new ResizeObserver(function (entries) { for (const e of entries) fit(e.target); });
  function scan() {
    document.querySelectorAll('.eh-tallb').forEach(function (el) {
      if (!el.__tall) { el.__tall = true; ro.observe(el); }
      fit(el);
    });
  }
  // the page template renders after load and re-renders project panels, so watch for new headings
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scan);
  window.addEventListener('load', scan);
  scan();
})();
