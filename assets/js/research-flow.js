/* Light writes a greeting, unfolds into a vortex, and settles on a Möbius surface. */
(() => {
  "use strict";
  const root = document.querySelector("[data-research-flow]");
  if (!root || root.dataset.flowInitialized) return;
  const canvas = root.querySelector("canvas");
  const ctx = canvas?.getContext("2d");
  const layer = document.createElement("canvas");
  const ink = layer.getContext("2d");
  const mask = document.createElement("canvas");
  const maskContext = mask.getContext("2d", { willReadFrequently: true });
  if (!ctx || !ink || !maskContext) return;
  const field = root.querySelector(".research-flow__field");
  const toggle = root.querySelector(".research-flow__toggle");
  const toggleLabel = root.querySelector(".research-flow__toggle-label");
  const replay = root.querySelector(".research-flow__replay");
  const caption = root.querySelector(".research-flow__caption");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const timing = {
    emissionStart: 1.1,
    emissionWindow: 0.12,
    flight: 2.4,
    arrivalSweep: 1.55,
    arrivalSpread: 1.4,
    wordComplete: 6.7,
    release: 9.4,
    vortexReady: 13.8,
    gather: 18.85,
    settled: 23.85,
    manifoldHold: 15,
    reset: 0.9,
  };
  const holdEnd = timing.settled + timing.manifoldHold;
  const cycleDuration = holdEnd + timing.reset;
  const word = "Welcome";
  const tau = Math.PI * 2;
  const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
  const ease = (x) => {
    const t = clamp(x);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };
  const mix = (a, b, t) => a + (b - a) * t;
  const rgba = (rgb, alpha) => "rgba(" + rgb + "," + clamp(alpha) + ")";
  const blend = (a, b, t) => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), z: mix(a.z, b.z, t), depth: mix(a.depth, b.depth, t) });
  const palette = ["151,198,255", "186,165,255", "231,183,250", "222,225,255"];
  let width = 1,
    height = 1,
    scale = 1,
    dpr = 1,
    fontSize = 1,
    textFont = "",
    wordWidth = 1;
  let particles = [],
    letterLayout = [],
    ready = false;
  let elapsed = motion.matches ? 26 : 0;
  let visible = true,
    paused = motion.matches,
    raf = null,
    lastTick = null,
    lastDraw = -Infinity;
  let currentPhase = "";
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, amount: 0, target: 0 };
  function randomGenerator() {
    let seed = 71833;
    return () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }
  function phaseAt(t) {
    if (t < timing.emissionStart) return "light";
    if (t < timing.wordComplete) return "writing";
    if (t < timing.release) return "welcome";
    if (t < timing.gather) return "vortex";
    if (t < timing.settled) return "gathering";
    if (t < holdEnd) return "manifold";
    return "reset";
  }
  function sampleWelcome() {
    fontSize = Math.min(width * 0.2, height * 0.32);
    textFont = "300 " + fontSize + "px 'Helvetica Neue', Arial, sans-serif";
    maskContext.font = textFont;
    const measured = maskContext.measureText(word).width;
    if (measured > width * 0.78) {
      fontSize *= (width * 0.78) / measured;
      textFont = "300 " + fontSize + "px 'Helvetica Neue', Arial, sans-serif";
    }
    maskContext.font = textFont;
    wordWidth = maskContext.measureText(word).width;
    letterLayout = Array.from(word, (char, index) => ({
      char,
      index,
      x: maskContext.measureText(word.slice(0, index)).width,
      end: maskContext.measureText(word.slice(0, index + 1)).width,
    }));
    mask.width = Math.ceil(wordWidth + 24);
    mask.height = Math.ceil(fontSize * 1.45 + 24);
    maskContext.clearRect(0, 0, mask.width, mask.height);
    maskContext.font = textFont;
    maskContext.textAlign = "center";
    maskContext.textBaseline = "middle";
    maskContext.fillStyle = "#fff";
    maskContext.fillText(word, mask.width / 2, mask.height / 2);
    let pixels;
    try {
      pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data;
    } catch {
      return [];
    }
    const points = [],
      step = 1;
    const origin = (mask.width - wordWidth) / 2;
    for (let y = 0; y < mask.height; y += step) {
      for (let x = 0; x < mask.width; x += step) {
        if (pixels[(y * mask.width + x) * 4 + 3] <= 96) continue;
        const position = x - origin;
        const found = letterLayout.findIndex((item) => position < item.end);
        const letter = found < 0 ? letterLayout.length - 1 : found;
        points.push({ x: x - mask.width / 2, y: y - mask.height / 2, letter });
      }
    }
    return points;
  }
  function seedScene() {
    const letters = sampleWelcome();
    if (!letters.length) return false;
    const random = randomGenerator();
    const count = width < 600 ? 1200 : 2400;
    particles = Array.from({ length: count }, (_, index) => {
      const point = letters[Math.min(letters.length - 1, Math.floor(((index + 0.5) / count) * letters.length))];
      const across = clamp(point.x / wordWidth + 0.5);
      return {
        index,
        letter: point.letter,
        angle: (across - 0.5) * tau + (random() - 0.5) * 0.18,
        phase: random() * tau,
        radial: 0.78 + random() * 0.3,
        band: random() * 2 - 1,
        speed: 0.85 + random() * 0.25,
        size: 0.45 + random() * 0.95,
        beamX: random() - 0.5,
        beamY: random() - 0.5,
        letterX: point.x + (random() - 0.5) * 0.8,
        letterY: point.y + (random() - 0.5) * 0.8,
        // The whole cohort leaves in one burst; overlapping flight times write left to right.
        launch: timing.emissionStart + random() * timing.emissionWindow,
        flight: timing.flight + across * timing.arrivalSweep + random() * timing.arrivalSpread,
        lift: random(),
        arc: random() * 2 - 1,
        releaseDelay: across * 0.45 + random() * 0.25,
        color: palette[index % 4],
      };
    });
    return true;
  }
  function project(x, y, z, sx, sy) {
    const perspective = 1 / (1 + z * 0.29);
    return {
      x: width * 0.5 + x * sx * perspective + pointer.x * pointer.amount * (12 + z * 3),
      y: height * 0.46 + y * sy * perspective + pointer.y * pointer.amount * (9 + z * 3),
      z,
      depth: clamp(0.6 - z * 0.33),
    };
  }
  function beamPoint(p, t) {
    return {
      x: width * 0.12 + p.beamX * Math.min(24, width * 0.05),
      y: height * 0.51 + p.beamY * 1.8 + Math.sin(t * 4 + p.phase) * 0.4,
      z: 0,
      depth: 1,
    };
  }
  function wordPoint(p, t) {
    return {
      x: width * 0.5 + p.letterX + Math.sin(p.phase + t * 0.7) * 0.3,
      y: height * 0.46 + p.letterY + Math.cos(p.phase + t * 0.6) * 0.3,
      z: 0,
      depth: 0.9,
    };
  }
  function bezierPoint(a, b, c, d, u) {
    const q = 1 - u;
    return {
      x: q * q * q * a.x + 3 * q * q * u * b.x + 3 * q * u * u * c.x + u * u * u * d.x,
      y: q * q * q * a.y + 3 * q * q * u * b.y + 3 * q * u * u * c.y + u * u * u * d.y,
      z: mix(a.z, d.z, u),
      depth: mix(a.depth, d.depth, u),
    };
  }
  function writingPoint(p, t) {
    const age = t - p.launch;
    if (age <= 0) return beamPoint(p, p.launch);
    if (age >= p.flight) return wordPoint(p, t);
    const from = beamPoint(p, p.launch),
      to = wordPoint(p, t);
    const dx = to.x - from.x;
    const c1 = { x: from.x + width * (0.18 + p.lift * 0.16), y: from.y + p.arc * height * 0.52 };
    const c2 = { x: to.x - Math.min(width * 0.12, dx * 0.24), y: to.y + p.arc * height * 0.19 };
    const u = clamp(age / p.flight);
    return bezierPoint(from, c1, c2, to, 1 - (1 - u) ** 2);
  }
  function vortexPoint(p, t, u = 1) {
    const spin = Math.max(0, t - timing.release);
    const theta = p.angle + spin * p.speed * 1.13 - (1 - u) * (p.length || 0.14);
    const r = p.radial + 0.035 * Math.sin(theta * 3 + p.phase);
    const bank = -0.25 + Math.sin(spin * 0.35) * 0.14;
    const x = Math.cos(theta) * r,
      y = Math.sin(theta) * r * 0.86;
    const z = Math.sin(theta + 0.6) * 0.65 + Math.sin(theta * 2 + p.phase) * 0.12 + p.band * 0.08;
    const zoom = 1.03 + 0.13 * Math.sin(clamp((t - timing.vortexReady) / 6.2) * Math.PI);
    return project(x * Math.cos(bank) - y * Math.sin(bank), x * Math.sin(bank) + y * Math.cos(bank), z, width * 0.57 * zoom, height * 0.62 * zoom);
  }
  function unfurlPoint(p, t) {
    const from = wordPoint(p, t),
      to = vortexPoint(p, t);
    const u = ease((t - timing.release - p.releaseDelay) / (timing.vortexReady - timing.release - p.releaseDelay));
    const dx = to.x - from.x,
      dy = to.y - from.y;
    const curl = 0.24 * Math.sin(p.phase * 0.4 + 0.8);
    const c1 = { x: from.x + dx * 0.23 - dy * curl, y: from.y + dy * 0.23 + dx * curl * 0.45 };
    const c2 = { x: to.x - dx * 0.18 - dy * 0.1, y: to.y - dy * 0.18 + dx * 0.1 };
    return bezierPoint(from, c1, c2, to, u);
  }
  function mobiusSurface(theta, band, t) {
    const v = band * 0.34,
      r = 1 + v * Math.cos(theta / 2);
    let x = r * Math.cos(theta),
      y = r * Math.sin(theta),
      z = v * Math.sin(theta / 2);
    const pitch = 0.78 + Math.sin((t - timing.gather) * 0.11) * 0.12;
    const yaw = 0.42 + (t - timing.settled) * 0.085,
      roll = -0.2;
    const y1 = y * Math.cos(pitch) - z * Math.sin(pitch),
      z1 = y * Math.sin(pitch) + z * Math.cos(pitch);
    const x1 = x * Math.cos(yaw) + z1 * Math.sin(yaw);
    z = -x * Math.sin(yaw) + z1 * Math.cos(yaw);
    x = x1 * Math.cos(roll) - y1 * Math.sin(roll);
    y = x1 * Math.sin(roll) + y1 * Math.cos(roll);
    return project(x, y, z, scale, scale);
  }
  function manifoldPoint(p, t, u = 1) {
    const theta = p.angle + (t - timing.gather) * 0.13 - (1 - u) * (p.length || 0.12) * 1.4;
    return mobiusSurface(theta, p.band, t);
  }
  function particlePoint(p, t) {
    if (t < timing.wordComplete) return writingPoint(p, t);
    if (t < timing.release) return wordPoint(p, t);
    if (t < timing.vortexReady) return unfurlPoint(p, t);
    if (t < timing.gather) return vortexPoint(p, t);
    if (t < timing.settled) return blend(vortexPoint(p, t), manifoldPoint(p, t), ease((t - timing.gather) / (timing.settled - timing.gather)));
    if (t < holdEnd) return manifoldPoint(p, t);
    return blend(manifoldPoint(p, t), beamPoint(p, 0), ease((t - holdEnd) / timing.reset));
  }
  function drawLight(t) {
    let strength;
    if (t < timing.emissionStart) strength = 1;
    else if (t < timing.wordComplete) {
      const age = t - timing.emissionStart;
      strength = (1 - ease(age / 0.85)) * (1 + 0.9 * Math.sin(Math.PI * clamp(age / 0.32)));
    } else strength = ease((t - holdEnd) / timing.reset);
    if (strength <= 0) return;
    const cx = width * 0.12,
      cy = height * 0.51;
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.24);
    halo.addColorStop(0, rgba("238,232,255", strength * 0.5));
    halo.addColorStop(0.09, rgba("173,156,255", strength * 0.32));
    halo.addColorStop(0.4, rgba("104,98,216", strength * 0.1));
    halo.addColorStop(1, "rgba(98,87,188,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.shadowBlur = 22;
    ctx.shadowColor = "rgba(192,174,255,.95)";
    ctx.beginPath();
    ctx.moveTo(cx - Math.min(23, width * 0.05), cy);
    ctx.lineTo(cx + Math.min(23, width * 0.05), cy);
    ctx.strokeStyle = rgba("255,248,255", strength);
    ctx.lineWidth = 2.3;
    ctx.stroke();
    ctx.restore();
  }
  function drawFibers(t) {
    const fade = 1 - ease((t - holdEnd) / timing.reset);
    if (t <= timing.release) return;
    if (fade === 0) return;
    const steps = width < 600 ? 32 : 48;
    const paths = particles
      .filter((p) => p.index % (width < 600 ? 18 : 22) === 0 && t > timing.release + p.releaseDelay)
      .map((p) => {
        // Every filament is a selected Welcome particle's actual path, never a second emitter.
        const duration = mix(2.1 + p.lift * 0.7, 0.8, ease((t - timing.gather) / (timing.settled - timing.gather)));
        const start = Math.max(timing.release + p.releaseDelay, t - duration);
        const points = Array.from({ length: steps + 1 }, (_, i) => particlePoint(p, mix(start, t, i / steps)));
        return { p, points, depth: points[Math.floor(steps / 2)].depth };
      })
      .sort((a, b) => a.depth - b.depth);
    for (const { p, points, depth } of paths) {
      const pulse = 0.9 + 0.1 * Math.sin(t * 0.8 + p.phase);
      for (let pass = 0; pass < 3; pass++) {
        const start = pass === 0 ? 0 : pass === 1 ? Math.floor(steps * 0.32) : Math.floor(steps * 0.75);
        ink.beginPath();
        for (let i = start; i < points.length; i++) {
          if (i === start) ink.moveTo(points[i].x, points[i].y);
          else ink.lineTo(points[i].x, points[i].y);
        }
        ink.lineWidth = p.size * (0.6 + depth * 0.65);
        ink.strokeStyle = rgba(p.color, fade * pulse * (0.28 + depth * 0.6) * [0.16, 0.3, 0.68][pass]);
        ink.stroke();
      }
      if (p.index % 6 === 0) {
        ink.beginPath();
        for (let i = Math.floor(steps * 0.72); i < points.length; i++) {
          if (i === Math.floor(steps * 0.72)) ink.moveTo(points[i].x, points[i].y);
          else ink.lineTo(points[i].x, points[i].y);
        }
        ink.strokeStyle = rgba("233,226,255", fade * depth * 0.26);
        ink.lineWidth = 0.28;
        ink.stroke();
      }
    }
    const resolved = ease((t - timing.settled + 3.5) / 3.5) * (1 - ease((t - holdEnd) / timing.reset));
    if (resolved > 0) {
      for (let band = 0; band <= 16; band++) {
        ink.beginPath();
        for (let j = 0; j <= 130; j++) {
          const p = mobiusSurface((j / 130) * tau, (band / 16) * 2 - 1, t);
          if (j === 0) ink.moveTo(p.x, p.y);
          else ink.lineTo(p.x, p.y);
        }
        ink.strokeStyle = rgba(palette[band % 3], resolved * 0.12);
        ink.lineWidth = 0.55;
        ink.stroke();
      }
    }
  }
  function drawParticles(t) {
    const resetFade = 1 - ease((t - holdEnd) / timing.reset);
    const letterCounts = letterLayout.map(() => ({ total: 0, coherent: 0 }));
    for (const p of particles) {
      letterCounts[p.letter].total++;
      if (t < timing.wordComplete && t < p.launch) continue;
      const point = particlePoint(p, t);
      let coherence = 0;
      if (t < timing.vortexReady) {
        const anchor = wordPoint(p, t);
        const distance = Math.hypot(point.x - anchor.x, point.y - anchor.y);
        // Fine points fuse into a continuous stroke, then separate along their own paths.
        coherence = ease((t - p.launch - p.flight + 0.18) / 0.6) * (1 - ease(distance / (fontSize * 0.18)));
      }
      letterCounts[p.letter].coherent += coherence;
      const entering = t < timing.wordComplete;
      const inFlight = entering && t < p.launch + p.flight;
      const alpha = (0.32 + point.depth * 0.6) * resetFade * (entering ? ease((t - p.launch) / 0.1) : 1) * mix(1, 0.44, coherence);
      if (inFlight) {
        ink.beginPath();
        for (let step = 0; step <= 7; step++) {
          const past = writingPoint(p, Math.max(p.launch, t - 0.2 * (1 - step / 7)));
          if (step === 0) ink.moveTo(past.x, past.y);
          else ink.lineTo(past.x, past.y);
        }
        ink.strokeStyle = rgba(p.color, alpha * 0.48);
        ink.lineWidth = p.size * 0.65;
        ink.stroke();
      } else if (t > timing.release && t < timing.settled && p.index % 3 === 0) {
        const past = particlePoint(p, Math.max(timing.release, t - 0.095));
        ink.beginPath();
        ink.moveTo(past.x, past.y);
        ink.lineTo(point.x, point.y);
        ink.strokeStyle = rgba(p.color, alpha * 0.35);
        ink.lineWidth = p.size * 0.6;
        ink.stroke();
      }
      ink.beginPath();
      ink.arc(point.x, point.y, mix(p.size * (0.65 + point.depth * 0.5), 0.2 + p.size * 0.2, coherence), 0, tau);
      ink.fillStyle = rgba(p.color, alpha);
      ink.fill();
    }
    if (t < timing.vortexReady) {
      ink.save();
      ink.font = textFont;
      ink.textAlign = "left";
      ink.textBaseline = "middle";
      for (const letter of letterLayout) {
        const count = letterCounts[letter.index];
        const alpha = (count.coherent / Math.max(1, count.total)) ** 2 * 0.7;
        if (alpha < 0.005) continue;
        const sheen = ink.createLinearGradient(width * 0.5 - wordWidth / 2, 0, width * 0.5 + wordWidth / 2, 0);
        sheen.addColorStop(0, rgba("205,223,255", alpha));
        sheen.addColorStop(0.5, rgba("238,232,255", alpha));
        sheen.addColorStop(1, rgba("227,204,255", alpha));
        ink.fillStyle = sheen;
        ink.fillText(letter.char, width * 0.5 - wordWidth / 2 + letter.x, height * 0.46);
      }
      ink.restore();
    }
  }
  function render() {
    if (!ready) return;
    const t = elapsed % cycleDuration,
      phase = phaseAt(t);
    if (phase !== currentPhase) {
      root.dataset.flowPhase = phase;
      currentPhase = phase;
    }
    caption.style.opacity = String(ease((t - timing.release - 0.15) / 2) * (1 - ease((t - holdEnd) / timing.reset)));
    ctx.clearRect(0, 0, width, height);
    ink.clearRect(0, 0, width, height);
    ink.lineCap = "round";
    ink.lineJoin = "round";
    drawLight(t);
    drawFibers(t);
    drawParticles(t);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.drawImage(layer, 0, 0, width, height);
    ctx.restore();
  }
  function resize() {
    const bounds = field.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    scale = Math.min(width * 0.32, height * 0.43);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const c of [canvas, layer]) {
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
      c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    ready = seedScene();
    if (!ready) return;
    render();
    root.dataset.flowInitialized = "true";
    root.classList.add("is-ready");
    toggle.hidden = false;
    replay.hidden = false;
  }
  function canAnimate() {
    return ready && visible && !document.hidden && !paused;
  }
  function tick(timestamp) {
    raf = null;
    if (!canAnimate()) return;
    const dt = lastTick === null ? 0 : Math.min((timestamp - lastTick) / 1000, 0.06);
    lastTick = timestamp;
    elapsed += dt;
    const damp = 1 - Math.exp(-dt * 3.5);
    pointer.x = mix(pointer.x, pointer.tx, damp);
    pointer.y = mix(pointer.y, pointer.ty, damp);
    pointer.amount = mix(pointer.amount, pointer.target, damp);
    if (timestamp - lastDraw >= 1000 / (width < 600 ? 24 : 30)) {
      render();
      lastDraw = timestamp;
    }
    raf = requestAnimationFrame(tick);
  }
  function syncPlayback() {
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Play animation" : "Pause animation");
    toggleLabel.textContent = paused ? "Play" : "Pause";
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
    lastTick = null;
    lastDraw = -Infinity;
    if (canAnimate()) raf = requestAnimationFrame(tick);
  }
  toggle.addEventListener("click", () => {
    paused = !paused;
    syncPlayback();
  });
  replay.addEventListener("click", () => {
    elapsed = 0;
    paused = false;
    pointer.amount = 0;
    render();
    syncPlayback();
  });
  field.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || paused) return;
    const b = field.getBoundingClientRect();
    pointer.tx = clamp(((event.clientX - b.left) / width - 0.5) * 2, -1, 1);
    pointer.ty = clamp(((event.clientY - b.top) / height - 0.5) * 2, -1, 1);
    pointer.target = 1;
  });
  field.addEventListener("pointerleave", () => {
    pointer.target = 0;
  });
  document.addEventListener("visibilitychange", syncPlayback);
  motion.addEventListener("change", () => {
    paused = motion.matches;
    if (paused) {
      elapsed = 26;
      pointer.amount = 0;
      render();
    }
    syncPlayback();
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }).observe(root);
  if ("ResizeObserver" in window)
    new ResizeObserver(() => {
      resize();
      syncPlayback();
    }).observe(field);
  else
    window.addEventListener("resize", () => {
      resize();
      syncPlayback();
    });
  resize();
  syncPlayback();
})();
