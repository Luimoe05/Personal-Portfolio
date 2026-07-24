import React, { useRef, useEffect } from "react";

/* ── HeroBackdrop ───────────────────────────────────────────────────────────
   A dependency-free 3D wireframe "network sphere" rendered on <canvas>.
   Real perspective projection of an icosahedron: vertices glow, edges fade by
   depth, the whole thing rotates slowly and eases toward the cursor for a
   subtle parallax tilt. Reads the live --accent token so it tracks the theme,
   and freezes to a single static frame when the user prefers reduced motion.
   Purely decorative → aria-hidden + pointer-events:none; the hero text sits
   above it on its own stacking layer. */

// Icosahedron: 12 vertices built from the golden ratio, then edges are every
// pair of vertices sharing the shortest (edge-length) separation.
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const norm = Math.hypot(1, PHI);
const VERTS = RAW.map(([x, y, z]) => [x / norm, y / norm, z / norm]);

const EDGES = (() => {
  const out = [];
  const target = 2 / norm; // icosahedron edge length after normalising
  for (let i = 0; i < VERTS.length; i++) {
    for (let j = i + 1; j < VERTS.length; j++) {
      const dx = VERTS[i][0] - VERTS[j][0];
      const dy = VERTS[i][1] - VERTS[j][1];
      const dz = VERTS[i][2] - VERTS[j][2];
      if (Math.abs(Math.hypot(dx, dy, dz) - target) < 0.01) out.push([i, j]);
    }
  }
  return out;
})();

// Resolve the current --accent token to a concrete [r,g,b]. The token is oklch
// and modern Chrome hands it back as an oklch() string, so we let a throwaway
// canvas do the colour-space conversion for us (works for rgb()/oklch()/etc).
function readAccent() {
  const probe = document.createElement("span");
  probe.style.cssText = "color:var(--accent);position:absolute;opacity:0";
  document.body.appendChild(probe);
  const col = getComputedStyle(probe).color;
  probe.remove();
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const cctx = c.getContext("2d");
    cctx.fillStyle = col;
    cctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = cctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  } catch {
    return [110, 231, 183]; // emerald fallback
  }
}

export default function HeroBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rgb = readAccent();
    const rgba = (a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    // Re-read the accent whenever the theme toggle rewrites the root tokens.
    const themeObserver = new MutationObserver(() => (rgb = readAccent()));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    let w = 0, h = 0, radius = 0, cx = 0, cy = 0, alpha = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = w > 720;
      // Anchor to the right of the (left-aligned) hero copy on wide layouts;
      // centre it and dial the intensity down where it sits behind the text.
      cx = wide ? w * 0.76 : w * 0.5;
      cy = h * 0.5;
      radius = wide ? h * 0.4 : Math.min(w, h) * 0.34;
      alpha = wide ? 1 : 0.45;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    // Cursor parallax — normalised offset from the viewport centre, eased.
    const mouse = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onPointer = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const project = (v, ax, ay) => {
      // rotate around Y then X (rotation cosines/sines — distinct from the
      // cx/cy screen-centre coordinates in the outer scope)
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      let x = v[0] * cosY - v[2] * sinY;
      let z = v[0] * sinY + v[2] * cosY;
      let y = v[1] * cosX - z * sinX;
      z = v[1] * sinX + z * cosX;
      const cam = 3.2;                     // push the object away from the lens
      const persp = 2.6 / (cam + z);       // focal length / depth
      return {
        sx: cx + x * radius * persp,
        sy: cy + y * radius * persp,
        depth: (z + 1) / 2,                // 0 (far) → 1 (near)
      };
    };

    const draw = (t) => {
      eased.x += (mouse.x - eased.x) * 0.05;
      eased.y += (mouse.y - eased.y) * 0.05;

      const ay = t * 0.00013 + eased.x * 0.5;
      const ax = t * 0.00007 + eased.y * -0.4 + 0.35;

      ctx.clearRect(0, 0, w, h);

      // soft accent glow anchoring the sphere
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.4);
      g.addColorStop(0, rgba(0.1 * alpha));
      g.addColorStop(1, rgba(0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const pts = VERTS.map((v) => project(v, ax, ay));

      // edges — nearer edges are brighter/thicker
      ctx.lineCap = "round";
      for (const [a, b] of EDGES) {
        const d = (pts[a].depth + pts[b].depth) / 2;
        ctx.strokeStyle = rgba((0.08 + d * 0.32) * alpha);
        ctx.lineWidth = 0.5 + d * 1.1;
        ctx.beginPath();
        ctx.moveTo(pts[a].sx, pts[a].sy);
        ctx.lineTo(pts[b].sx, pts[b].sy);
        ctx.stroke();
      }

      // vertices — glowing nodes, drawn far→near so near ones sit on top
      const order = pts.map((p, i) => i).sort((i, j) => pts[i].depth - pts[j].depth);
      for (const i of order) {
        const p = pts[i];
        const r = 1.4 + p.depth * 2.6;
        ctx.shadowBlur = 8 + p.depth * 10;
        ctx.shadowColor = rgba(0.7 * alpha);
        ctx.fillStyle = rgba((0.35 + p.depth * 0.6) * alpha);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    let raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
