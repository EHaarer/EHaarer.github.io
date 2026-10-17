/* <obj-wireframe src="model.obj" color="#FF4500"> — controls-free interactive wireframe.
   Transparent canvas: coral edges only, so the panel background still inverts in light mode.
   Click-drag to rotate; slow idle auto-spin; inertia on release. Requires global THREE (r128). */
(function () {
  function buildGeometry(txt) {
    const verts = [];
    const idx = [];
    const lines = txt.split('\n');
    for (let n = 0; n < lines.length; n++) {
      const line = lines[n];
      if (line.charCodeAt(0) === 118 && line[1] === ' ') { // 'v '
        const p = line.split(/\s+/);
        verts.push(+p[1], +p[2], +p[3]);
      } else if (line.charCodeAt(0) === 102 && line[1] === ' ') { // 'f '
        const p = line.trim().split(/\s+/);
        const f = [];
        for (let i = 1; i < p.length; i++) {
          let vi = parseInt(p[i].split('/')[0], 10);
          if (vi < 0) vi = verts.length / 3 + vi; else vi = vi - 1;
          f.push(vi);
        }
        for (let i = 1; i < f.length - 1; i++) idx.push(f[0], f[i], f[i + 1]);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    g.setIndex(idx);
    return g;
  }

  class ObjWireframe extends HTMLElement {
    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      const el = this;
      el.style.display = 'block';
      el.style.width = '100%';
      el.style.height = '100%';

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 5000);
      cam.position.set(0, 0, 3.1);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      const cv = renderer.domElement;
      cv.style.width = '100%';
      cv.style.height = '100%';
      cv.style.display = 'block';
      cv.style.cursor = 'grab';
      cv.style.touchAction = 'none';
      el.appendChild(cv);

      const group = new THREE.Group();
      group.rotation.set(-0.25, 0.4, 0);
      scene.add(group);

      const color = el.getAttribute('color') || '#FF4500';
      const src = el.getAttribute('src');
      if (src) {
        fetch(src).then(function (r) { return r.text(); }).then(function (txt) {
          const geo = buildGeometry(txt);
          const edges = new THREE.EdgesGeometry(geo, 1);
          const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.92 });
          const wire = new THREE.LineSegments(edges, mat);
          geo.computeBoundingBox();
          const bb = geo.boundingBox;
          const ctr = new THREE.Vector3(); bb.getCenter(ctr);
          const sz = new THREE.Vector3(); bb.getSize(sz);
          const maxd = Math.max(sz.x, sz.y, sz.z) || 1;
          edges.translate(-ctr.x, -ctr.y, -ctr.z);
          wire.scale.setScalar(1.7 / maxd);
          wire.rotation.x = parseFloat(el.getAttribute('model-rot-x') || '0') || 0;
          wire.rotation.z = parseFloat(el.getAttribute('model-rot-z') || '0') || 0;
          group.add(wire);
          geo.dispose();
        }).catch(function () {});
      }

      let dragging = false, px = 0, py = 0, rvx = 0, rvy = 0;
      const spin = 0.0022;
      cv.addEventListener('pointerdown', function (e) {
        dragging = true; px = e.clientX; py = e.clientY;
        cv.style.cursor = 'grabbing';
        try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      });
      cv.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        const dx = e.clientX - px, dy = e.clientY - py;
        px = e.clientX; py = e.clientY;
        rvy = dx * 0.008; rvx = dy * 0.008;
        group.rotation.y += rvy; group.rotation.x += rvx;
      });
      const end = function () { dragging = false; cv.style.cursor = 'grab'; };
      cv.addEventListener('pointerup', end);
      cv.addEventListener('pointercancel', end);

      function resize() {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        cam.aspect = w / h; cam.updateProjectionMatrix();
      }
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      let raf;
      function tick() {
        raf = requestAnimationFrame(tick);
        if (dragging) {
          // handled in pointermove
        } else {
          group.rotation.x += rvx; group.rotation.y += rvy + spin;
          rvx *= 0.93; rvy *= 0.93;
          if (Math.abs(rvx) < 1e-4) rvx = 0;
          if (Math.abs(rvy) < 1e-4) rvy = 0;
        }
        renderer.render(scene, cam);
      }
      tick();

      el.__dc = { renderer: renderer, scene: scene, cam: cam, group: group };

      this._cleanup = function () {
        cancelAnimationFrame(raf);
        ro.disconnect();
        scene.traverse(function (o) {
          if (o.geometry) o.geometry.dispose();
          if (o.material) o.material.dispose();
        });
        renderer.dispose();
        if (cv.parentNode) cv.parentNode.removeChild(cv);
      };
    }
    disconnectedCallback() {
      this._booted = false;
      if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    }
  }

  if (!customElements.get('obj-wireframe')) customElements.define('obj-wireframe', ObjWireframe);
})();
