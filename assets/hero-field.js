/* <hero-field color="#FF4500"> — FIG.01 on the hero: topographic contour lines over a slowly drifting
   noise surface, every fourth line brighter. The surface is sampled on a grid sized from the box's own
   width and height, so the figure fills the space at any screen size. Canvas 2D, crisp on high-DPI
   screens; ~30 fps (the drift is slow); paused off-screen; a single still frame under
   prefers-reduced-motion. The pointer raises a soft hill that the lines flow around. */
(function () {
  'use strict';
  const CELL = 9;          // sampling grid in px; marching squares runs over its cells
  const LEVELS = 16;       // isolines across the noise's practical range
  const SCALE = 1 / 170;   // one noise unit ≈ 170 px, so features stay the same size on any screen
  const DRIFT = 0.05;      // noise units per second along the third axis
  const FRAME_MS = 1000 / 30;

  function parseColor(s) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(s).trim());
    const n = m ? parseInt(m[1], 16) : 0xff4500;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  // seeded 3D gradient noise: hashed gradients at lattice corners, quintic blend
  function gradientNoise(seed) {
    const G = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1], [1, 1, 0], [0, -1, 1], [-1, 1, 0], [0, -1, -1]];
    function g(xi, yi, zi, dx, dy, dz) {
      let h = Math.imul(xi, 0x27d4eb2d) ^ Math.imul(yi, 0x165667b1) ^ Math.imul(zi, 0x9e3779b1) ^ seed;
      h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
      h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
      const v = G[(h ^ (h >>> 16)) & 15];
      return v[0] * dx + v[1] * dy + v[2] * dz;
    }
    const ease = (u) => u * u * u * (u * (u * 6 - 15) + 10);
    const mix = (a, b, u) => a + (b - a) * u;
    return function (x, y, z) {
      const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
      const dx = x - xi, dy = y - yi, dz = z - zi, u = ease(dx), v = ease(dy), w = ease(dz);
      return mix(
        mix(mix(g(xi, yi, zi, dx, dy, dz), g(xi + 1, yi, zi, dx - 1, dy, dz), u),
          mix(g(xi, yi + 1, zi, dx, dy - 1, dz), g(xi + 1, yi + 1, zi, dx - 1, dy - 1, dz), u), v),
        mix(mix(g(xi, yi, zi + 1, dx, dy, dz - 1), g(xi + 1, yi, zi + 1, dx - 1, dy, dz - 1), u),
          mix(g(xi, yi + 1, zi + 1, dx, dy - 1, dz - 1), g(xi + 1, yi + 1, zi + 1, dx - 1, dy - 1, dz - 1), u), v),
        w);
    };
  }

  class HeroField extends HTMLElement {
    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      const el = this;
      el.style.display = 'block';
      el.style.width = '100%';
      el.style.height = '100%';
      const cv = document.createElement('canvas');
      cv.style.cssText = 'display:block;width:100%;height:100%';
      el.appendChild(cv);
      const ctx = cv.getContext('2d');
      const rgb = parseColor(el.getAttribute('color') || '#FF4500').join(',');
      const minorStyle = 'rgba(' + rgb + ',0.3)', majorStyle = 'rgba(' + rgb + ',0.85)';
      const noise = gradientNoise(7);
      const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

      let W = 0, H = 0, cols = 0, rows = 0, F = null, t = 0;
      let ptr = null, pw = 0, px = 0, py = 0;

      function draw(dt) {
        t += dt;
        // ease the pointer hill in and out, and let it trail the cursor slightly
        pw += ((ptr ? 1 : 0) - pw) * Math.min(1, dt * 2.5);
        if (ptr) { px += (ptr[0] - px) * Math.min(1, dt * 5); py += (ptr[1] - py) * Math.min(1, dt * 5); }
        const z = t * DRIFT, bump = 0.5 * pw, br2 = Math.pow(Math.min(W, H) * 0.15, 2);
        for (let r = 0, i = 0; r < rows; r++) for (let c = 0; c < cols; c++, i++) {
          const x = c * CELL, y = r * CELL;
          let v = 0.75 * noise(x * SCALE, y * SCALE, z) + 0.25 * noise(x * SCALE * 2.3, y * SCALE * 2.3, z * 1.6 + 11);
          if (bump > 0.005) { const dx = x - px, dy = y - py; v += bump * Math.exp(-(dx * dx + dy * dy) / br2); }
          F[i] = v;
        }
        const minor = new Path2D(), major = new Path2D();
        for (let k = 0; k < LEVELS; k++) {
          const lv = -0.62 + (1.24 * (k + 0.5)) / LEVELS, P = k % 4 === 1 ? major : minor;
          for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
            const i = r * cols + c, a = F[i], b = F[i + 1], q = F[i + cols + 1], d = F[i + cols];
            const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (q > lv ? 2 : 0) | (d > lv ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            // marching squares: where the level crosses each edge of the cell
            const x = c * CELL, y = r * CELL, xr = x + CELL, yb = y + CELL;
            const tx = x + (CELL * (lv - a)) / (b - a), ry = y + (CELL * (lv - b)) / (q - b);
            const bx = x + (CELL * (lv - d)) / (q - d), ly = y + (CELL * (lv - a)) / (d - a);
            switch (idx) {
              case 1: case 14: P.moveTo(x, ly); P.lineTo(bx, yb); break;
              case 2: case 13: P.moveTo(bx, yb); P.lineTo(xr, ry); break;
              case 3: case 12: P.moveTo(x, ly); P.lineTo(xr, ry); break;
              case 4: case 11: P.moveTo(tx, y); P.lineTo(xr, ry); break;
              case 6: case 9: P.moveTo(tx, y); P.lineTo(bx, yb); break;
              case 7: case 8: P.moveTo(x, ly); P.lineTo(tx, y); break;
              case 5: P.moveTo(x, ly); P.lineTo(tx, y); P.moveTo(bx, yb); P.lineTo(xr, ry); break;
              case 10: P.moveTo(tx, y); P.lineTo(xr, ry); P.moveTo(x, ly); P.lineTo(bx, yb); break;
            }
          }
        }
        ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 1;
        ctx.strokeStyle = minorStyle; ctx.stroke(minor);
        ctx.strokeStyle = majorStyle; ctx.stroke(major);
      }

      function resize() {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = w; H = h;
        cols = Math.ceil(w / CELL) + 1; rows = Math.ceil(h / CELL) + 1;
        F = new Float32Array(cols * rows);
        cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(0); // paint at once (and this is the only frame under reduced motion)
      }

      let raf = 0, running = false, last = 0;
      function tick(now) {
        raf = requestAnimationFrame(tick);
        if (last && now - last < FRAME_MS) return;
        const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        if (W) draw(dt);
      }
      function start() { if (!running && !still) { running = true; last = 0; raf = requestAnimationFrame(tick); } }
      function stop() { running = false; cancelAnimationFrame(raf); }

      const ro = new ResizeObserver(resize);
      ro.observe(el);
      const io = new IntersectionObserver(function (es) { if (es[es.length - 1].isIntersecting) start(); else stop(); });
      io.observe(el);
      const onMove = function (e) {
        const r = cv.getBoundingClientRect();
        ptr = [e.clientX - r.left, e.clientY - r.top];
        if (pw < 0.01) { px = ptr[0]; py = ptr[1]; }
      };
      const onLeave = function () { ptr = null; };
      cv.addEventListener('pointermove', onMove);
      cv.addEventListener('pointerleave', onLeave);
      cv.addEventListener('pointercancel', onLeave);

      el.__dc = { frame: draw };
      this._cleanup = function () {
        stop(); ro.disconnect(); io.disconnect();
        if (cv.parentNode) cv.parentNode.removeChild(cv);
      };
    }
    disconnectedCallback() {
      this._booted = false;
      if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    }
  }

  if (!customElements.get('hero-field')) customElements.define('hero-field', HeroField);
})();
