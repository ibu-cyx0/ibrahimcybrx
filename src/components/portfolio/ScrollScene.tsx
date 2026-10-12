import { useEffect, useRef, useState, type ReactNode } from "react";

type ThreeNS = typeof import("three");

// One ring gate per page section: home, about, education, experience,
// certifications, skills, projects, contact
const SECTION_COUNT = 8;

/** Builds the 3D scene on `canvas`. Returns a cleanup function, or null if WebGL is unavailable. */
export function startScene(
  THREE: ThreeNS,
  canvas: HTMLCanvasElement,
  onLost: () => void,
): (() => void) | null {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = window.innerWidth < 768;

  let renderer: InstanceType<ThreeNS["WebGLRenderer"]>;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0); // transparent: your page background shows through

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050a10, small ? 0.045 : 0.034);
  const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 400);

  const disposables: { dispose(): void }[] = [];

  const Z0 = 6; // camera start
  const DEPTH = 170; // how far the camera flies
  const END = Z0 - DEPTH - 60;

  // ---- floor grid ----
  {
    const v: number[] = [];
    const y = -3;
    for (let x = -14; x <= 14; x += 2) v.push(x, y, Z0 + 12, x, y, END);
    for (let z = Z0 + 12; z >= END; z -= 2) v.push(-14, y, z, 14, y, z);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    const m = new THREE.LineBasicMaterial({ color: 0x0f7a52, transparent: true, opacity: 0.42 });
    scene.add(new THREE.LineSegments(g, m));
    disposables.push(g, m);
  }

  // ---- server racks (wireframe) + LEDs ----
  {
    const edges: number[] = [];
    const pos: number[] = [];
    const col: number[] = [];
    const box = (cx: number, cy: number, cz: number, w: number, h: number, d: number) => {
      const x0 = cx - w / 2, x1 = cx + w / 2;
      const y0 = cy - h / 2, y1 = cy + h / 2;
      const z0 = cz - d / 2, z1 = cz + d / 2;
      const P = [
        [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
        [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
      ];
      const E = [
        [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6],
        [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      for (const [a, b] of E) edges.push(...P[a], ...P[b]);
    };
    const step = small ? 4.4 : 3.2;
    for (let z = Z0 + 4; z > END; z -= step) {
      for (const side of [-1, 1]) {
        const w = 1.3, d = 1.8, h = 2 + Math.random() * 4.2;
        const cx = side * (6.2 + Math.random() * 1.4);
        const cy = -3 + h / 2;
        box(cx, cy, z, w, h, d);
        const leds = small ? 3 : 6;
        for (let k = 0; k < leds; k++) {
          pos.push(
            cx - side * (w / 2 + 0.01),
            -3 + 0.3 + Math.random() * (h - 0.4),
            z + (Math.random() - 0.5) * (d - 0.3),
          );
          const r = Math.random();
          if (r < 0.82) col.push(0.0, 1.0, 0.62);
          else if (r < 0.94) col.push(0.21, 0.88, 1.0);
          else col.push(1.0, 0.23, 0.36);
        }
      }
    }
    const g1 = new THREE.BufferGeometry();
    g1.setAttribute("position", new THREE.Float32BufferAttribute(edges, 3));
    const m1 = new THREE.LineBasicMaterial({ color: 0x14a36f, transparent: true, opacity: 0.5 });
    scene.add(new THREE.LineSegments(g1, m1));

    const g2 = new THREE.BufferGeometry();
    g2.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g2.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    const m2 = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(g2, m2));
    disposables.push(g1, m1, g2, m2);
  }

  // ---- ring gates (one per section) ----
  const gates: { a: InstanceType<ThreeNS["Mesh"]>; b: InstanceType<ThreeNS["Mesh"]> }[] = [];
  for (let i = 0; i < SECTION_COUNT; i++) {
    const z = Z0 - (i / (SECTION_COUNT - 1)) * DEPTH - 5;
    const ga = new THREE.TorusGeometry(4.4, 0.035, 8, 72);
    const ma = new THREE.MeshBasicMaterial({
      color: i === SECTION_COUNT - 1 ? 0x36e0ff : 0x00ff9d,
      transparent: true,
      opacity: 0.7,
    });
    const gb = new THREE.TorusGeometry(3.7, 0.02, 8, 72);
    const mb = new THREE.MeshBasicMaterial({ color: 0x36e0ff, transparent: true, opacity: 0.35 });
    const a = new THREE.Mesh(ga, ma);
    const b = new THREE.Mesh(gb, mb);
    a.position.set(0, 0.6, z);
    b.position.set(0, 0.6, z);
    scene.add(a, b);
    gates.push({ a, b });
    disposables.push(ga, ma, gb, mb);
  }

  // ---- data packets ----
  const PN = small ? 110 : 240;
  const SPAN = 190;
  const ppos = new Float32Array(PN * 3);
  const pcol = new Float32Array(PN * 3);
  const pspd = new Float32Array(PN);
  for (let i = 0; i < PN; i++) {
    ppos[i * 3] = (Math.random() - 0.5) * 11;
    ppos[i * 3 + 1] = -2.6 + Math.random() * 6.2;
    ppos[i * 3 + 2] = Z0 + 8 - Math.random() * SPAN;
    pspd[i] = 5 + Math.random() * 9;
    const r = Math.random();
    if (r < 0.1) { pcol[i * 3] = 1; pcol[i * 3 + 1] = 0.23; pcol[i * 3 + 2] = 0.36; }
    else if (r < 0.45) { pcol[i * 3] = 0.21; pcol[i * 3 + 1] = 0.88; pcol[i * 3 + 2] = 1; }
    else { pcol[i * 3] = 0; pcol[i * 3 + 1] = 1; pcol[i * 3 + 2] = 0.62; }
  }
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
  pgeo.setAttribute("color", new THREE.BufferAttribute(pcol, 3));
  const pmat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(pgeo, pmat));
  disposables.push(pgeo, pmat);

  // ---- sizing + input ----
  let lastW = 0;
  const resize = () => {
    if (small && lastW === window.innerWidth) return;
    lastW = window.innerWidth;
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1 ? Math.min(95, 65 + (1 - camera.aspect) * 55) : 65;
    camera.updateProjectionMatrix();
  };
  let mx = 0, my = 0, smx = 0, smy = 0;
  const onMove = (e: PointerEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const lost = (e: Event) => {
    e.preventDefault();
    onLost();
  };
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove, { passive: true });
  canvas.addEventListener("webglcontextlost", lost);
  resize();

  // ---- animation loop ----
  const readScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, window.scrollY / max));
  };
  let cur = readScroll();
  let last = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    const target = readScroll();
    cur += (target - cur) * (reduce ? 1 : Math.min(1, dt * 4.5));
    smx += (mx - smx) * Math.min(1, dt * 3);
    smy += (my - smy) * Math.min(1, dt * 3);

    const camZ = Z0 - cur * DEPTH;
    const sway = reduce ? 0 : Math.sin(cur * 7) * 0.9;
    camera.position.set(
      sway + smx * 0.9,
      0.7 - smy * 0.5 + (reduce ? 0 : Math.sin(cur * 5) * 0.25),
      camZ,
    );
    camera.lookAt(sway * 0.4 + smx * 2.2, 0.3 - smy * 1.1, camZ - 14);

    if (!reduce) {
      const t = now * 0.001;
      gates.forEach((g, i) => {
        g.a.rotation.z = t * 0.25 * (i % 2 ? -1 : 1);
        g.b.rotation.z = -t * 0.4;
        g.b.scale.setScalar(1 + Math.sin(t * 1.6 + i) * 0.03);
      });
      const arr = pgeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PN; i++) {
        let z = arr[i * 3 + 2] + pspd[i] * dt;
        if (z > camZ + 12) {
          z -= SPAN;
          arr[i * 3] = (Math.random() - 0.5) * 11;
          arr[i * 3 + 1] = -2.6 + Math.random() * 6.2;
        }
        arr[i * 3 + 2] = z;
      }
      pgeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("webglcontextlost", lost);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}

/**
 * Drop-in replacement for <MatrixRain />. It only draws the background; it
 * never touches your content. If WebGL is unavailable, `fallback` is shown.
 */
export function ScrollScene({ fallback = null }: { fallback?: ReactNode }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [noGl, setNoGl] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let alive = true;
    let stop = null as (() => void) | null;

    import("three")
      .then((THREE) => {
        if (!alive) return;
        stop = startScene(THREE, canvas, () => setNoGl(true));
        if (!stop) setNoGl(true);
      })
      .catch(() => {
        if (alive) setNoGl(true);
      });

    return () => {
      alive = false;
      stop?.();
    };
  }, []);

  if (noGl) return <>{fallback}</>;

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70 sm:opacity-100"
      />
      {/* soft dark vignette so your text stays easy to read */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(4,8,12,0.55) 0%, rgba(4,8,12,0.22) 65%, rgba(4,8,12,0.05) 100%)",
        }}
      />
    </>
  );
}
