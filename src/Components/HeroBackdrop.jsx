import React, { useRef, useEffect } from "react";

/* ── HeroBackdrop ───────────────────────────────────────────────────────────
   A dependency-free 3D "semantic constellation" rendered on <canvas>.
   The vertices are the actual stack and projects from this page — laid out on
   a Fibonacci sphere like an embedding space (a nod to RepoAI's vector
   search), wired to their nearest neighbours, with data pulses streaming
   along the edges (a nod to the Spark log-pipeline work). Real perspective
   projection, slow rotation, eased cursor parallax. Reads the live --accent
   token so it tracks the theme, and freezes to a single static frame when
   the user prefers reduced motion. Purely decorative → aria-hidden +
   pointer-events:none; the hero text sits above it on its own layer. */

// The constellation's stars: what's actually on this page. Order matters —
// the Fibonacci lattice spreads consecutive entries far apart, so related
// labels don't clump.
const LABELS = [
  "REPOAI", "REACT", "SPARK", "TYPESCRIPT", "K8S", "CODIFICA",
  "POSTGRES", "MCP", "NODE", "AWS·S3", "PYTHON", "CREATORSFIU",
  "DOCKER", "PRISMA", "JAVA", "TAILWIND",
];

// Fibonacci sphere — near-uniform distribution of n points on a unit sphere.
function fibSphere(n, jitter = 0) {
  const pts = [];
  const ga = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = ga * i + jitter * Math.sin(i * 12.9898) * 0.5;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  return pts;
}

const NODES = fibSphere(LABELS.length);

// Background "dust" — unlabeled points at a slightly larger radius that give
// the sphere volume without competing with the labels.
const DUST = fibSphere(42, 1).map((v) => v.map((c) => c * 1.18));

// Wire each node to its 2 nearest neighbours (deduped).
const EDGES = (() => {
  const seen = new Set();
  const out = [];
  for (let i = 0; i < NODES.length; i++) {
    const near = NODES.map((v, j) => ({
      j,
      d: j === i ? Infinity : Math.hypot(v[0] - NODES[i][0], v[1] - NODES[i][1], v[2] - NODES[i][2]),
    }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of near) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push([Math.min(i, j), Math.max(i, j)]);
      }
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

    let w = 0, h = 0, radius = 0, cx = 0, cy = 0, alpha = 1, wide = true;
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
      wide = w > 720;
      // Anchor to the right of the (left-aligned) hero copy on wide layouts;
      // centre it and dial the intensity down where it sits behind the text.
      cx = wide ? w * 0.76 : w * 0.5;
      cy = h * 0.5;
      radius = wide ? h * 0.36 : Math.min(w, h) * 0.32;
      alpha = wide ? 1 : 0.4;
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

    // Data pulses that travel node → node along the wires.
    const pulses = Array.from({ length: 5 }, (_, i) => ({
      edge: Math.floor((i / 5) * EDGES.length),
      t: (i * 0.37) % 1,
      speed: 0.0022 + (i % 3) * 0.0009,
      dir: i % 2 ? 1 : -1,
    }));

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
        scale: persp,
      };
    };

    const draw = (t) => {
      eased.x += (mouse.x - eased.x) * 0.05;
      eased.y += (mouse.y - eased.y) * 0.05;

      const ay = t * 0.00011 + eased.x * 0.5;
      const ax = t * 0.00006 + eased.y * -0.4 + 0.3;

      ctx.clearRect(0, 0, w, h);

      // soft accent glow anchoring the constellation — the outer stop must hit
      // zero before the nearest canvas edge or the clip shows as a hard rect
      const glowR = Math.max(radius, Math.min(cx, w - cx, cy, h - cy));
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      g.addColorStop(0, rgba(0.1 * alpha));
      g.addColorStop(1, rgba(0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // dust layer — faint depth cues behind everything
      for (const v of DUST) {
        const p = project(v, ax, ay);
        ctx.fillStyle = rgba((0.06 + p.depth * 0.16) * alpha);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 0.7 + p.depth * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      const pts = NODES.map((v) => project(v, ax, ay));

      // edges — nearer edges are brighter/thicker
      ctx.lineCap = "round";
      for (const [a, b] of EDGES) {
        const d = (pts[a].depth + pts[b].depth) / 2;
        ctx.strokeStyle = rgba((0.06 + d * 0.26) * alpha);
        ctx.lineWidth = 0.5 + d * 0.9;
        ctx.beginPath();
        ctx.moveTo(pts[a].sx, pts[a].sy);
        ctx.lineTo(pts[b].sx, pts[b].sy);
        ctx.stroke();
      }

      // pulses — packets streaming along the wires, with a short comet tail
      if (!reduced) {
        for (const pu of pulses) {
          pu.t += pu.speed * pu.dir * (16.7);
          if (pu.t > 1 || pu.t < 0) {
            pu.edge = Math.floor(Math.random() * EDGES.length);
            pu.dir *= -1;
            pu.t = pu.dir > 0 ? 0 : 1;
          }
          const [a, b] = EDGES[pu.edge];
          const lerp = (k) => ({
            x: pts[a].sx + (pts[b].sx - pts[a].sx) * k,
            y: pts[a].sy + (pts[b].sy - pts[a].sy) * k,
          });
          const d = pts[a].depth + (pts[b].depth - pts[a].depth) * pu.t;
          const head = lerp(pu.t);
          const tail = lerp(Math.max(0, Math.min(1, pu.t - pu.dir * 0.12)));
          const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
          grad.addColorStop(0, rgba(0));
          grad.addColorStop(1, rgba((0.25 + d * 0.55) * alpha));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1 + d * 1.2;
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(head.x, head.y);
          ctx.stroke();
          ctx.fillStyle = rgba((0.4 + d * 0.6) * alpha);
          ctx.beginPath();
          ctx.arc(head.x, head.y, 1 + d * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes + labels — drawn far→near so near ones sit on top
      const order = pts.map((_, i) => i).sort((i, j) => pts[i].depth - pts[j].depth);
      for (const i of order) {
        const p = pts[i];
        const r = 1.3 + p.depth * 2.2;
        ctx.shadowBlur = 6 + p.depth * 10;
        ctx.shadowColor = rgba(0.7 * alpha);
        ctx.fillStyle = rgba((0.3 + p.depth * 0.65) * alpha);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // labels only on the front hemisphere, and only on wide layouts where
        // the sphere sits clear of the hero copy
        if (wide && p.depth > 0.52) {
          const la = ((p.depth - 0.52) / 0.48) * 0.8 * alpha;
          const size = 7 + p.depth * 3.5;
          ctx.font = `500 ${size}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.fillStyle = rgba(la);
          ctx.textBaseline = "middle";
          // flip the label to whichever side of the node points outward
          const rightSide = p.sx >= cx;
          ctx.textAlign = rightSide ? "left" : "right";
          ctx.fillText(LABELS[i], p.sx + (rightSide ? r + 5 : -r - 5), p.sy);
        }
      }

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
