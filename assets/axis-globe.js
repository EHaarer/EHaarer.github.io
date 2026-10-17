/* <axis-globe src="snapshot.json" basemap="earth.json"> — a frozen frame of the Axis Mundi
   air and orbital picture as solid 3D geometry: dot-matrix Earth, every aircraft as a small
   airliner oriented along its track, low-orbit satellites coloured by category.
   Drag to orbit (on touch screens horizontal drags orbit, vertical swipes keep scrolling);
   slow idle spin; inertia on release; pauses while scrolled out of view. Requires THREE (r128). */
(function () {
  const DEG = Math.PI / 180;
  const FOV = 36;
  const FIT = 1.32; // world radius (Earth = 1) kept inside the frame: globe plus low-orbit shell
  const AIR_COLORS = ['#e8edf2', '#ffb547', '#7d8590', '#ff4d4f']; // airborne · military · on ground · emergency
  const SAT_COLORS = {
    stations: '#ffffff', navigation: '#7dd3fc', weather: '#93c5fd', 'earth-obs': '#86efac', science: '#c4b5fd',
    military: '#fca5a5', 'geo-comms': '#fde68a', comms: '#fdba74', amateur: '#f9a8d4', other: '#9ca3af',
  };
  const EXAGGERATE_ALT = 6; // aircraft altitude is ~0.2% of Earth's radius; lift it so planes float above the map

  // lat/lon on a y-up sphere; lon 0 faces +x, east is to the right when the point faces the camera
  function toXYZ(lat, lon, r, out) {
    const p = lat * DEG, l = lon * DEG, c = Math.cos(p);
    return out.set(r * c * Math.cos(l), r * Math.sin(p), -r * c * Math.sin(l));
  }

  // Low-poly airliner: nose +y, up +z, length and span 1. Flat-shaded, drawn double-sided.
  function airlinerGeometry() {
    const P = [];
    const tri = (a, b, c) => P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    const quad = (a, b, c, d) => { tri(a, b, c); tri(a, c, d); };
    const ring = (y, w, h) => [[w, y, 0], [0, y, h], [-w, y, 0], [0, y, -h]];
    const nose = [0, 0.5, 0], tail = [0, -0.5, 0.03];
    const A = ring(0.36, 0.05, 0.05), B = ring(-0.3, 0.045, 0.045);
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      tri(nose, A[j], A[i]);
      quad(A[i], A[j], B[j], B[i]);
      tri(B[i], B[j], tail);
    }
    quad([0.04, 0.14, 0], [0.5, -0.1, 0], [0.5, -0.17, 0], [0.04, -0.1, 0]); // wings, swept
    quad([-0.04, 0.14, 0], [-0.04, -0.1, 0], [-0.5, -0.17, 0], [-0.5, -0.1, 0]);
    quad([0.03, -0.33, 0.01], [0.2, -0.44, 0.01], [0.2, -0.48, 0.01], [0.03, -0.45, 0.01]); // tailplane
    quad([-0.03, -0.33, 0.01], [-0.03, -0.45, 0.01], [-0.2, -0.48, 0.01], [-0.2, -0.44, 0.01]);
    tri([0, -0.3, 0.04], [0, -0.47, 0.2], [0, -0.5, 0.04]); // fin
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    g.computeVertexNormals();
    return g;
  }

  function lineSegments(polylines, r) {
    const out = [];
    const a = new THREE.Vector3(), b = new THREE.Vector3();
    for (const line of polylines) {
      for (let i = 0; i + 3 < line.length; i += 2) {
        toXYZ(line[i + 1], line[i], r, a);
        toXYZ(line[i + 3], line[i + 2], r, b);
        out.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(out, 3));
    return g;
  }

  function graticule(stepDeg) {
    const lines = [];
    for (let lat = -75; lat <= 75; lat += stepDeg) {
      const l = [];
      for (let lon = -180; lon <= 180; lon += 2) l.push(lon, lat);
      lines.push(l);
    }
    for (let lon = -180; lon < 180; lon += stepDeg) {
      const l = [];
      for (let lat = -80; lat <= 80; lat += 2) l.push(lon, lat);
      lines.push(l);
    }
    return lines;
  }

  function labelSprite(text) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const px = 44;
    ctx.font = '700 ' + px + 'px "JetBrains Mono", ui-monospace, monospace';
    c.width = Math.ceil(ctx.measureText(text).width) + 16;
    c.height = px + 16;
    ctx.font = '700 ' + px + 'px "JetBrains Mono", ui-monospace, monospace';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.strokeText(text, 8, c.height / 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, 8, c.height / 2);
    const tex = new THREE.CanvasTexture(c);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, sizeAttenuation: false, transparent: true }));
    s.center.set(-0.35, 0.5);
    s.userData.aspect = c.width / c.height;
    return s;
  }

  class AxisGlobe extends HTMLElement {
    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      const el = this;
      el.style.display = 'block';
      el.style.width = '100%';
      el.style.height = '100%';

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const pr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pr);
      renderer.setClearColor(0x000000, 0);
      const cv = renderer.domElement;
      cv.style.cssText = 'width:100%;height:100%;display:block;cursor:grab;touch-action:pan-y';
      el.appendChild(cv);

      scene.add(new THREE.AmbientLight(0xffffff, 0.62));
      const sun = new THREE.DirectionalLight(0xffffff, 0.75);
      sun.position.set(-1.2, 1.4, 2.4);
      scene.add(sun);

      // the globe turns inside `globe`; the camera and lights stay put
      const globe = new THREE.Group();
      globe.rotation.set(0.5, -0.87, 0); // open on the North Atlantic, as in the app's hero view
      scene.add(globe);

      globe.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 96, 64),
        new THREE.MeshPhongMaterial({ color: 0x0d1117, emissive: 0x05070a, specular: 0x1b222b, shininess: 14 })
      ));

      // limb outline: the silhouette circle never moves because only the globe rotates
      function limbGeometry(d) {
        const pts = [], z = 1 / d, rr = Math.sqrt(1 - z * z); // silhouette of a unit sphere seen from distance d
        for (let i = 0; i < 160; i++) {
          const a = (i / 160) * Math.PI * 2;
          pts.push(new THREE.Vector3(rr * Math.cos(a), rr * Math.sin(a), z));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
      }
      const limb = new THREE.LineLoop(
        limbGeometry(4),
        new THREE.LineBasicMaterial({ color: 0xa3adb8, transparent: true, opacity: 0.55, depthWrite: false })
      );
      scene.add(limb);

      const legend = document.createElement('div');
      legend.style.cssText = 'position:absolute;left:0;right:0;bottom:0;z-index:2;pointer-events:none;padding:16px 10px 8px;' +
        'background:linear-gradient(to top,rgba(7,8,10,0.92) 60%,rgba(7,8,10,0));' +
        'font-family:var(--font-mono),ui-monospace,monospace;font-size:8.5px;line-height:1.75;letter-spacing:0.12em;' +
        'text-transform:uppercase;color:var(--text-faint,#6b6b66)';
      el.appendChild(legend);

      const labels = [];
      const tmp = new THREE.Vector3();

      const basemap = el.getAttribute('basemap');
      if (basemap) {
        fetch(basemap).then(function (r) { return r.json(); }).then(function (earth) {
          const dots = new Float32Array(earth.dots.length / 2 * 3);
          for (let i = 0, j = 0; i < earth.dots.length; i += 2, j += 3) {
            toXYZ(earth.dots[i], earth.dots[i + 1], 1.0015, tmp);
            dots[j] = tmp.x; dots[j + 1] = tmp.y; dots[j + 2] = tmp.z;
          }
          const dg = new THREE.BufferGeometry();
          dg.setAttribute('position', new THREE.BufferAttribute(dots, 3));
          globe.add(new THREE.Points(dg, new THREE.PointsMaterial({
            color: 0x8b949e, size: 1.7 * pr, sizeAttenuation: false, transparent: true, opacity: 0.6, depthWrite: false,
          })));
          const line = function (data, r, color, opacity) {
            globe.add(new THREE.LineSegments(lineSegments(data, r),
              new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: opacity, depthWrite: false })));
          };
          line(graticule(15), 1.001, 0x6e7681, 0.22);
          line(earth.borders, 1.002, 0x6e7681, 0.5);
          line(earth.coast, 1.002, 0xa3adb8, 0.8);
        }).catch(function () {});
      }

      const src = el.getAttribute('src');
      if (src) {
        fetch(src).then(function (r) { return r.json(); }).then(function (snap) {
          const m = new THREE.Matrix4(), s = new THREE.Vector3(), up = new THREE.Vector3();
          const north = new THREE.Vector3(), east = new THREE.Vector3();
          const fwd = new THREE.Vector3(), right = new THREE.Vector3();
          const col = new THREE.Color();

          // aircraft: [lat, lon, altitude hm, track deg, tone] × n
          const air = snap.air, nAir = air.length / 5;
          const planes = new THREE.InstancedMesh(airlinerGeometry(),
            new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide }), nAir);
          let nMil = 0;
          for (let i = 0; i < nAir; i++) {
            const lat = air[i * 5], lon = air[i * 5 + 1], alt = air[i * 5 + 2] * 100, trk = air[i * 5 + 3] * DEG;
            const tone = air[i * 5 + 4];
            if (tone === 1) nMil++;
            const p = lat * DEG, l = lon * DEG;
            up.set(Math.cos(p) * Math.cos(l), Math.sin(p), -Math.cos(p) * Math.sin(l));
            east.set(-Math.sin(l), 0, -Math.cos(l));
            north.set(-Math.sin(p) * Math.cos(l), Math.cos(p), Math.sin(p) * Math.sin(l));
            fwd.copy(north).multiplyScalar(Math.cos(trk)).addScaledVector(east, Math.sin(trk));
            right.copy(east).multiplyScalar(Math.cos(trk)).addScaledVector(north, -Math.sin(trk));
            const k = tone === 2 ? 0.024 : 0.034;
            m.makeBasis(right.multiplyScalar(k), fwd.multiplyScalar(k), up.clone().multiplyScalar(k));
            m.setPosition(up.multiplyScalar(1.004 + (alt / 6371000) * EXAGGERATE_ALT));
            planes.setMatrixAt(i, m);
            planes.setColorAt(i, col.set(AIR_COLORS[tone] || AIR_COLORS[0]));
          }
          planes.instanceMatrix.needsUpdate = true;
          if (planes.instanceColor) planes.instanceColor.needsUpdate = true;
          planes.frustumCulled = false;
          globe.add(planes);

          // satellites: [lat, lon, altitude km, category index] × n
          const sat = snap.sat, nSat = sat.length / 4, cats = snap.satCats || [];
          const sats = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0),
            new THREE.MeshBasicMaterial({ color: 0xffffff }), nSat);
          for (let i = 0; i < nSat; i++) {
            const cat = cats[sat[i * 4 + 3]] || 'other';
            toXYZ(sat[i * 4], sat[i * 4 + 1], 1 + sat[i * 4 + 2] / 6371, tmp);
            const k = cat === 'stations' ? 0.016 : 0.0075;
            m.makeScale(k, k, k);
            m.setPosition(tmp);
            sats.setMatrixAt(i, m);
            sats.setColorAt(i, col.set(SAT_COLORS[cat] || SAT_COLORS.other));
          }
          sats.instanceMatrix.needsUpdate = true;
          if (sats.instanceColor) sats.instanceColor.needsUpdate = true;
          sats.frustumCulled = false;
          globe.add(sats);

          (snap.labels || []).forEach(function (lb) {
            const sp = labelSprite(lb.t);
            toXYZ(lb.lat, lb.lon, 1 + lb.alt / 6371, sp.position);
            globe.add(sp);
            labels.push(sp);
          });
          sizeLabels();

          const at = new Date(snap.at);
          const fmt = function (n) { return n.toLocaleString('en-US'); };
          const sw = function (c, round) {
            return '<span style="display:inline-block;width:6px;height:6px;margin-right:5px;vertical-align:1px;background:' + c +
              (round ? ';border-radius:50%' : '') + '"></span>';
          };
          legend.innerHTML =
            '<div>' + sw(AIR_COLORS[0]) + fmt(nAir - nMil) + ' aircraft &nbsp;' + sw(AIR_COLORS[1]) + fmt(nMil) +
            ' military &nbsp;' + sw('#86efac', true) + fmt(nSat) + ' satellites · LEO</div>' +
            '<div>Frozen ' + at.toISOString().slice(0, 16).replace('T', ' ') + 'Z · ADS-B: adsb.lol (ODbL) · orbits: CelesTrak · map: Natural Earth</div>';
          resize(); // the legend's height changes the framing
        }).catch(function () {});
      }

      let dragging = false, px = 0, py = 0, rvx = 0, rvy = 0;
      const spin = 0.0011;
      cv.addEventListener('pointerdown', function (e) {
        dragging = true; px = e.clientX; py = e.clientY; rvx = rvy = 0;
        cv.style.cursor = 'grabbing';
        try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      });
      cv.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        const dx = e.clientX - px, dy = e.clientY - py;
        px = e.clientX; py = e.clientY;
        rvy = dx * 0.006; rvx = dy * 0.006;
        turn(rvx, rvy);
      });
      const end = function () { dragging = false; cv.style.cursor = 'grab'; };
      cv.addEventListener('pointerup', end);
      cv.addEventListener('pointercancel', end);

      function turn(dx, dy) {
        globe.rotation.y += dy;
        globe.rotation.x = Math.max(-1.25, Math.min(1.25, globe.rotation.x + dx)); // keep the poles from flipping over
      }

      function sizeLabels() {
        const h = el.clientHeight || 1;
        const k = (2 * Math.tan((FOV / 2) * DEG) * 13) / h; // 13 CSS px tall
        labels.forEach(function (sp) { sp.scale.set(k * sp.userData.aspect, k, 1); });
      }

      function resize() {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        // frame the globe in the band between the figure labels (top) and the legend (bottom)
        const top = 24, bottom = Math.min(legend.offsetHeight, h * 0.3);
        const band = Math.max(h - top - bottom, h * 0.5);
        const d = FIT / (Math.tan((FOV / 2) * DEG) * Math.min(band / h, w / h));
        cam.position.set(0, 0, d);
        cam.lookAt(0, 0, 0);
        cam.setViewOffset(w, h, 0, (bottom - top) / 2, w, h);
        cam.updateProjectionMatrix();
        limb.geometry.dispose();
        limb.geometry = limbGeometry(d);
        sizeLabels();
        if (!running) renderer.render(scene, cam);
      }
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let raf = 0, running = false;
      function tick() {
        raf = requestAnimationFrame(tick);
        if (!dragging) {
          turn(rvx, rvy + spin);
          rvx *= 0.93; rvy *= 0.93;
          if (Math.abs(rvx) < 1e-4) rvx = 0;
          if (Math.abs(rvy) < 1e-4) rvy = 0;
        }
        renderer.render(scene, cam);
      }
      function start() { if (!running) { running = true; tick(); } }
      function stop() { running = false; cancelAnimationFrame(raf); }
      // only animate while on screen: every project panel is open at once
      const io = new IntersectionObserver(function (entries) {
        if (entries[entries.length - 1].isIntersecting) start(); else stop();
      }, { rootMargin: '120px' });
      io.observe(el);
      resize();

      el.__dc = { renderer: renderer, scene: scene, cam: cam, group: globe };

      this._cleanup = function () {
        stop();
        ro.disconnect();
        io.disconnect();
        scene.traverse(function (o) {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (o.material.map) o.material.map.dispose();
            o.material.dispose();
          }
        });
        renderer.dispose();
        if (cv.parentNode) cv.parentNode.removeChild(cv);
        if (legend.parentNode) legend.parentNode.removeChild(legend);
      };
    }
    disconnectedCallback() {
      this._booted = false;
      if (this._cleanup) { this._cleanup(); this._cleanup = null; }
    }
  }

  if (!customElements.get('axis-globe')) customElements.define('axis-globe', AxisGlobe);
})();
