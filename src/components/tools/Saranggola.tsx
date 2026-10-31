'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Star } from 'lucide-react';
import type { FeelingLang } from '@/lib/feelingPages';
import { analyticsService, type ToolSource } from '@/services/analyticsService';

/**
 * Saranggola: fly a kite from morning to sunset and catch the stars. Hold
 * to lift it, let go to glide. A bird only tangles the string for a moment;
 * nothing ends the flight early. The best catch stays on this phone; only
 * flights started and finished are counted.
 */

const FLIGHT_SECONDS = 60;
const BEST_KEY = 'hopebegins.kiteBest';

const copy = {
  en: {
    label: 'Kite game',
    how: 'Hold to lift the kite. Let go to glide. Catch the stars.',
    tip: 'Try breathing in as it rises and out as it glides.',
    start: 'Fly the kite',
    resume: 'Keep flying',
    pause: 'Pause',
    paused: 'Paused',
    canvas:
      'A kite flying over rice terraces and coconut trees, from morning to sunset.',
    stars: (n: number) => `${n} ${n === 1 ? 'star' : 'stars'}`,
    doneTitle: (n: number) =>
      n === 0 ? 'The sun has set.' : `What a flight. You caught ${n} stars.`,
    newBest: 'Your best on this phone so far.',
    best: (n: number) => `Your best on this phone: ${n} stars.`,
    again: 'Fly again',
    close: 'Close',
  },
  tl: {
    label: 'Larong saranggola',
    how: 'I-hold para tumaas ang saranggola. Bitawan para dumausdos. Hulihin ang mga bituin.',
    tip: 'Subukang mag-inhale habang tumataas at mag-exhale habang bumababa.',
    start: 'Paliparin ang saranggola',
    resume: 'Ituloy ang lipad',
    pause: 'I-pause',
    paused: 'Naka-pause',
    canvas:
      'Saranggolang lumilipad sa ibabaw ng palayan at mga puno ng niyog, mula umaga hanggang paglubog ng araw.',
    stars: (n: number) => `${n} bituin`,
    doneTitle: (n: number) =>
      n === 0
        ? 'Lumubog na ang araw.'
        : `Ang ganda ng lipad. ${n} bituin ang nahuli mo.`,
    newBest: 'Ito na ang pinakamarami mo sa phone na ito.',
    best: (n: number) => `Pinakamarami mo sa phone na ito: ${n} bituin.`,
    again: 'Lipad ulit',
    close: 'Isara',
  },
  fr: {
    label: 'Jeu du cerf-volant',
    how: 'Maintiens appuyé pour faire monter le cerf-volant. Relâche pour planer. Attrape les étoiles.',
    tip: 'Essaie d’inspirer quand il monte et d’expirer quand il plane.',
    start: 'Faire voler le cerf-volant',
    resume: 'Reprendre le vol',
    pause: 'Pause',
    paused: 'En pause',
    canvas:
      'Un cerf-volant au-dessus de rizières en terrasses et de cocotiers, du matin au coucher du soleil.',
    stars: (n: number) => `${n} ${n > 1 ? 'étoiles' : 'étoile'}`,
    doneTitle: (n: number) =>
      n === 0
        ? 'Le soleil s’est couché.'
        : `Quel beau vol. Tu as attrapé ${n} ${n > 1 ? 'étoiles' : 'étoile'}.`,
    newBest: 'Nouveau record sur ce téléphone.',
    best: (n: number) =>
      `Ton record sur ce téléphone : ${n} ${n > 1 ? 'étoiles' : 'étoile'}.`,
    again: 'Rejouer',
    close: 'Fermer',
  },
  de: {
    label: 'Drachenspiel',
    how: 'Halte gedrückt, damit der Drachen steigt. Lass los, damit er gleitet. Fang die Sterne.',
    tip: 'Versuch mal, einzuatmen, während er steigt, und auszuatmen, während er gleitet.',
    start: 'Drachen steigen lassen',
    resume: 'Weiterfliegen',
    pause: 'Pause',
    paused: 'Pausiert',
    canvas:
      'Ein Drachen fliegt über Reisterrassen und Kokospalmen, vom Morgen bis zum Sonnenuntergang.',
    stars: (n: number) => `${n} ${n === 1 ? 'Stern' : 'Sterne'}`,
    doneTitle: (n: number) =>
      n === 0
        ? 'Die Sonne ist untergegangen.'
        : `Was für ein Flug. Du hast ${n} ${n === 1 ? 'Stern' : 'Sterne'} gefangen.`,
    newBest: 'Neuer Rekord auf diesem Handy.',
    best: (n: number) =>
      `Dein Rekord auf diesem Handy: ${n} ${n === 1 ? 'Stern' : 'Sterne'}.`,
    again: 'Noch mal fliegen',
    close: 'Schließen',
  },
  es: {
    label: 'Juego de la cometa',
    how: 'Mantén presionado para que la cometa suba. Suelta para que planee. Atrapa las estrellas.',
    tip: 'Intenta inhalar mientras sube y exhalar mientras planea.',
    start: 'Volar la cometa',
    resume: 'Seguir volando',
    pause: 'Pausar',
    paused: 'En pausa',
    canvas:
      'Una cometa vuela sobre terrazas de arroz y cocoteros, desde la mañana hasta el atardecer.',
    stars: (n: number) => `${n} ${n === 1 ? 'estrella' : 'estrellas'}`,
    doneTitle: (n: number) =>
      n === 0
        ? 'Ya se puso el sol.'
        : `Qué buen vuelo. Atrapaste ${n} ${n === 1 ? 'estrella' : 'estrellas'}.`,
    newBest: 'Es tu nuevo récord en este celular.',
    best: (n: number) =>
      `Tu récord en este celular: ${n} ${n === 1 ? 'estrella' : 'estrellas'}.`,
    again: 'Volar otra vez',
    close: 'Cerrar',
  },
  ko: {
    label: '연날리기 게임',
    how: '누르고 있으면 연이 올라가요. 손을 떼면 천천히 내려와요. 별을 잡아 보세요.',
    tip: '연이 올라갈 때 숨을 들이마시고, 내려올 때 내쉬어 보세요.',
    start: '연 날리기',
    resume: '계속 날리기',
    pause: '일시정지',
    paused: '일시정지됨',
    canvas: '아침부터 해 질 녘까지 계단식 논과 야자수 위를 나는 연.',
    stars: (n: number) => `별 ${n}개`,
    doneTitle: (n: number) =>
      n === 0 ? '해가 졌어요' : `별 ${n}개를 잡은 멋진 비행이었어요`,
    newBest: '이 휴대폰에서 낸 최고 기록이에요.',
    best: (n: number) => `이 휴대폰 최고 기록: 별 ${n}개.`,
    again: '다시 날리기',
    close: '닫기',
  },
};

type Phase = 'ready' | 'flying' | 'paused' | 'done';

interface World {
  w: number;
  h: number;
  /** Seconds flown. */
  t: number;
  y: number;
  vy: number;
  /** Seconds left of a tangled string after a bird. */
  tangled: number;
  stars: { x: number; y: number; spin: number }[];
  birds: { x: number; y: number; flap: number }[];
  sparks: { x: number; y: number; vx: number; vy: number; life: number }[];
  nextStar: number;
  nextBird: number;
  score: number;
  /** Distance flown, for the moving hills. */
  scroll: number;
  /** Fewer moving parts for people who ask for less motion. */
  calm: boolean;
}

// The sky through the day: [moment, top colour, bottom colour].
const SKY: [number, string, string][] = [
  [0, '#cfe6f2', '#f7f3e3'],
  [0.35, '#a9d1ea', '#eef4f6'],
  [0.65, '#f3d29f', '#fbefd9'],
  [0.85, '#e79c76', '#f6d4a8'],
  [1, '#7d86ab', '#e9b98f'],
];

function hex(color: string) {
  const n = parseInt(color.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, k: number) {
  const [r1, g1, b1] = hex(a);
  const [r2, g2, b2] = hex(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * k);
  return `rgb(${m(r1, r2)}, ${m(g1, g2)}, ${m(b1, b2)})`;
}

function skyAt(f: number): [string, string] {
  for (let i = 1; i < SKY.length; i++) {
    const [at, top, bottom] = SKY[i];
    const [from, top0, bottom0] = SKY[i - 1];
    if (f <= at) {
      const k = (f - from) / (at - from);
      return [mix(top0, top, k), mix(bottom0, bottom, k)];
    }
  }
  return [SKY[SKY.length - 1][1], SKY[SKY.length - 1][2]];
}

function newWorld(w: number, h: number, calm: boolean): World {
  return {
    w,
    h,
    t: 0,
    y: h * 0.45,
    vy: 0,
    tangled: 0,
    stars: [],
    birds: [],
    sparks: [],
    nextStar: 0.6,
    nextBird: 9,
    score: 0,
    scroll: 0,
    calm,
  };
}

const kiteX = (w: number) => Math.max(70, w * 0.28);

function hills(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scroll: number,
  base: number,
  amp: number,
  wave: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w + 8; x += 8) {
    const s = x + scroll;
    const y =
      base +
      amp * Math.sin(s / wave) +
      amp * 0.45 * Math.sin(s / (wave * 0.43) + 1.3);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
}

function coconut(ctx: CanvasRenderingContext2D, x: number, ground: number) {
  ctx.strokeStyle = '#8a7556';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, ground);
  ctx.quadraticCurveTo(x + 8, ground - 30, x + 4, ground - 58);
  ctx.stroke();
  ctx.strokeStyle = '#7f9a5c';
  ctx.lineWidth = 3;
  const top = { x: x + 4, y: ground - 58 };
  for (const [dx, dy] of [
    [-22, 6],
    [-16, -10],
    [0, -16],
    [16, -10],
    [22, 6],
  ]) {
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.quadraticCurveTo(
      top.x + dx * 0.5,
      top.y + dy - 6,
      top.x + dx,
      top.y + dy
    );
    ctx.stroke();
  }
}

function starPath(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 ? r * 0.45 : r;
    ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
  }
  ctx.closePath();
}

function draw(ctx: CanvasRenderingContext2D, world: World, time: number) {
  const { w, h } = world;
  const f = Math.min(1, world.t / FLIGHT_SECONDS);
  const [top, bottom] = skyAt(f);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, top);
  sky.addColorStop(1, bottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // The sun crosses the sky and sets behind the hills.
  const sunX = w * (0.15 + 0.7 * f);
  const sunY = h * (0.22 + 0.55 * f * f);
  ctx.fillStyle = f > 0.75 ? '#f4a66c' : '#f9dc8a';
  ctx.beginPath();
  ctx.arc(sunX, sunY, Math.max(16, h * 0.07), 0, Math.PI * 2);
  ctx.fill();

  const scroll = world.calm ? 0 : world.scroll;
  hills(ctx, w, h, scroll * 0.2, h * 0.7, h * 0.05, 140, '#dfe7cf');
  hills(ctx, w, h, scroll * 0.5, h * 0.8, h * 0.035, 90, '#c6d6ac');
  // Rice terraces: stepped bands on the nearest hill.
  hills(ctx, w, h, scroll, h * 0.88, h * 0.02, 70, '#aec488');
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 1;
  for (let band = 0; band < 3; band++) {
    ctx.beginPath();
    for (let x = 0; x <= w + 8; x += 8) {
      const s = x + scroll;
      const y = h * (0.91 + band * 0.03) + h * 0.012 * Math.sin(s / 70);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  const gap = 260;
  const offset = scroll % gap;
  for (let x = -offset + 40; x < w + 40; x += gap) {
    coconut(ctx, x, h * 0.9);
  }

  // Stars to catch.
  for (const star of world.stars) {
    ctx.save();
    ctx.translate(star.x, star.y);
    ctx.rotate(star.spin);
    starPath(ctx, 10);
    ctx.fillStyle = '#f4c152';
    ctx.fill();
    ctx.strokeStyle = '#e3a93a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  // Birds.
  ctx.strokeStyle = '#6e5f47';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  for (const bird of world.birds) {
    const lift = Math.sin(bird.flap) * 5;
    ctx.beginPath();
    ctx.moveTo(bird.x - 11, bird.y - lift);
    ctx.quadraticCurveTo(bird.x - 5, bird.y - 7, bird.x, bird.y);
    ctx.quadraticCurveTo(bird.x + 5, bird.y - 7, bird.x + 11, bird.y - lift);
    ctx.stroke();
  }

  // The string, from a child's hand somewhere below the hill.
  const kx = kiteX(w);
  const ky = world.y;
  ctx.strokeStyle = 'rgba(110,95,71,0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(kx, ky + 8);
  ctx.quadraticCurveTo(kx * 0.5, h * 0.95, -10, h + 10);
  ctx.stroke();

  // The kite, tilting with the wind.
  const sway = world.calm ? 0 : Math.sin(time * 2.2) * 0.05;
  const wobble =
    world.tangled > 0 ? Math.sin(time * 30) * 0.25 * world.tangled : 0;
  const angle = Math.max(-0.35, Math.min(0.35, world.vy / 600)) + sway + wobble;
  ctx.save();
  ctx.translate(kx, ky);
  ctx.rotate(angle);
  // Tail with little bows.
  ctx.strokeStyle = '#6e5f47';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 30);
  const wave = world.calm ? 0 : time * 6;
  for (let i = 1; i <= 5; i++) {
    ctx.lineTo(-i * 9, 30 + i * 9 + Math.sin(wave + i) * 4);
  }
  ctx.stroke();
  for (let i = 2; i <= 5; i += 1.5) {
    const bx = -i * 9;
    const by = 30 + i * 9 + Math.sin(wave + i) * 4;
    ctx.fillStyle = i % 3 < 1.5 ? '#d9644a' : '#f4c152';
    ctx.beginPath();
    ctx.moveTo(bx - 5, by - 4);
    ctx.lineTo(bx + 5, by + 4);
    ctx.lineTo(bx + 5, by - 4);
    ctx.lineTo(bx - 5, by + 4);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = '#d9644a';
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(-18, 0);
  ctx.lineTo(0, 30);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f4c152';
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(18, 0);
  ctx.lineTo(0, 30);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(0, 30);
  ctx.moveTo(-18, 0);
  ctx.lineTo(18, 0);
  ctx.stroke();
  ctx.restore();

  // Sparkles where a star was caught.
  for (const spark of world.sparks) {
    ctx.fillStyle = `rgba(244,193,82,${Math.max(0, spark.life * 2)})`;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function step(world: World, dt: number, holding: boolean) {
  const { w, h } = world;
  world.t += dt;
  world.scroll += dt * 60;
  world.tangled = Math.max(0, world.tangled - dt);

  // Hold to lift, let go to glide down slowly. A tangled string lifts less.
  const lift = world.tangled > 0 ? 260 : 560;
  world.vy += (holding ? -lift : 320) * dt;
  world.vy = Math.max(-240, Math.min(170, world.vy));
  world.y += world.vy * dt;
  const top = 34;
  const bottom = h * 0.78;
  if (world.y < top) {
    world.y = top;
    world.vy = 0;
  }
  if (world.y > bottom) {
    world.y = bottom;
    world.vy = 0;
  }

  const speed = world.calm ? 90 : 140;
  const ending = world.t > FLIGHT_SECONDS - 2;
  world.nextStar -= dt;
  if (world.nextStar <= 0 && !ending) {
    world.stars.push({
      x: w + 20,
      y: h * (0.12 + Math.random() * 0.6),
      spin: Math.random() * Math.PI,
    });
    world.nextStar = 0.8 + Math.random() * 0.6;
  }
  world.nextBird -= dt;
  if (world.nextBird <= 0 && !ending) {
    world.birds.push({
      x: w + 20,
      y: h * (0.15 + Math.random() * 0.5),
      flap: 0,
    });
    world.nextBird = 5 + Math.random() * 3;
  }

  const kx = kiteX(w);
  let caught = false;
  world.stars = world.stars.filter((star) => {
    star.x -= speed * dt;
    star.spin += dt * 1.5;
    if (Math.hypot(star.x - kx, star.y - world.y) < 26) {
      world.score += 1;
      caught = true;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        world.sparks.push({
          x: star.x,
          y: star.y,
          vx: Math.cos(a) * 60,
          vy: Math.sin(a) * 60,
          life: 0.45,
        });
      }
      return false;
    }
    return star.x > -20;
  });
  world.birds = world.birds.filter((bird) => {
    bird.x -= (speed + 40) * dt;
    bird.flap += dt * 9;
    bird.y += Math.sin(bird.flap / 3) * 0.4;
    if (Math.hypot(bird.x - kx, bird.y - world.y) < 22) {
      world.tangled = 1.2;
      return false;
    }
    return bird.x > -20;
  });
  world.sparks = world.sparks.filter((spark) => {
    spark.x += spark.vx * dt;
    spark.y += spark.vy * dt;
    spark.life -= dt;
    return spark.life > 0;
  });
  return caught;
}

function readBest() {
  try {
    const value = Number(localStorage.getItem(BEST_KEY));
    return Number.isFinite(value) && value > 0 && value < 1000 ? value : 0;
  } catch {
    return 0;
  }
}

const startClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

export function Saranggola({
  lang,
  source,
  onClose,
  autoFocus = true,
}: {
  lang: FeelingLang;
  /** Where it was opened, so the dashboard can count flights per stage. */
  source: ToolSource;
  /** Shows a Close button, for the game opened inside another page. */
  onClose?: () => void;
  /** Move focus to the game when it appears (off when it is the page). */
  autoFocus?: boolean;
}) {
  const t = copy[lang];
  const [phase, setPhase] = useState<Phase>('ready');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<{ best: number; isBest: boolean }>();
  const boxRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const worldRef = useRef<World | null>(null);
  const holding = useRef(false);

  useEffect(() => {
    if (!autoFocus) return;
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
  }, [autoFocus]);

  useEffect(() => {
    if (phase === 'done') doneRef.current?.focus({ preventScroll: true });
  }, [phase]);

  // Keep the canvas sharp at its size, and draw the still scene.
  useEffect(() => {
    const canvas = canvasRef.current;
    const area = areaRef.current;
    if (!canvas || !area) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fit = () => {
      const { width, height } = area.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const world = worldRef.current;
      if (world) {
        world.w = width;
        world.h = height;
        world.y = Math.min(world.y, height * 0.78);
      } else {
        worldRef.current = newWorld(width, height, calm);
      }
      draw(ctx, worldRef.current!, performance.now() / 1000);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  // The flight itself.
  useEffect(() => {
    if (phase !== 'flying') return;
    const ctx = canvasRef.current?.getContext('2d');
    const world = worldRef.current;
    if (!ctx || !world) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (step(world, dt, holding.current)) setScore(world.score);
      draw(ctx, world, now / 1000);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, world.t / FLIGHT_SECONDS)})`;
      }
      if (world.t >= FLIGHT_SECONDS) {
        holding.current = false;
        analyticsService.recordClick(`tool_kite_done_${source}`);
        const before = readBest();
        if (world.score > before) {
          try {
            localStorage.setItem(BEST_KEY, String(world.score));
          } catch {
            // Storage blocked: the best just isn't kept.
          }
        }
        setResult({
          best: Math.max(before, world.score),
          isBest: before > 0 && world.score > before,
        });
        setPhase('done');
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Switching apps pauses the flight.
    const pauseWhenHidden = () => {
      if (document.hidden) setPhase('paused');
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, [phase, source]);

  const start = () => {
    const area = areaRef.current?.getBoundingClientRect();
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    worldRef.current = newWorld(area?.width ?? 320, area?.height ?? 240, calm);
    holding.current = false;
    analyticsService.recordClick(`tool_kite_start_${source}`);
    setScore(0);
    setResult(undefined);
    setPhase('flying');
    boxRef.current?.focus({ preventScroll: true });
  };

  const hold = (on: boolean) => {
    holding.current = on && phase === 'flying';
  };

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      onKeyDown={(event) => {
        if (event.key === ' ' || event.key === 'ArrowUp') {
          if (phase !== 'flying') return;
          event.preventDefault();
          hold(true);
        }
      }}
      onKeyUp={(event) => {
        if (event.key === ' ' || event.key === 'ArrowUp') hold(false);
      }}
      className="rounded-2xl bg-[#EFF3E7] p-3 text-[#6E5F47] focus:outline-none sm:p-4 hb-panel-in"
    >
      <div
        ref={areaRef}
        onPointerDown={(event) => {
          if (phase !== 'flying') return;
          event.currentTarget.setPointerCapture(event.pointerId);
          hold(true);
        }}
        onPointerUp={() => hold(false)}
        onPointerCancel={() => hold(false)}
        onLostPointerCapture={() => hold(false)}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-xl sm:aspect-[16/9]"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t.canvas}
          className="block h-full w-full"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-white/40">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-[#6E5F47]/60"
          />
        </div>
        {phase !== 'ready' && (
          <p className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 font-poppins text-sm font-bold tabular-nums">
            <Star className="h-4 w-4 fill-[#F4C152] text-[#E3A93A]" />
            {score}
          </p>
        )}
        {phase === 'flying' && (
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setPhase('paused')}
            aria-label={t.pause}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            <Pause className="h-4 w-4" />
          </button>
        )}
        {(phase === 'ready' || phase === 'paused') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/55 p-4 text-center">
            {phase === 'ready' ? (
              <>
                <p className="max-w-xs font-poppins font-bold">{t.how}</p>
                <button type="button" onClick={start} className={startClass}>
                  <Play className="h-4 w-4" />
                  {t.start}
                </button>
                <p className="max-w-xs text-sm">{t.tip}</p>
              </>
            ) : (
              <>
                <p className="font-poppins font-bold">{t.paused}</p>
                <button
                  type="button"
                  onClick={() => setPhase('flying')}
                  className={startClass}
                >
                  <Play className="h-4 w-4" />
                  {t.resume}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {phase === 'done' ? t.doneTitle(score) : ''}
      </p>

      {phase === 'done' ? (
        <div className="mt-4 text-center hb-step-in">
          <p
            ref={doneRef}
            tabIndex={-1}
            className="font-poppins text-lg font-bold focus:outline-none"
          >
            {t.doneTitle(score)}
          </p>
          {result?.isBest ? (
            <p className="mt-1">{t.newBest}</p>
          ) : result && result.best > score ? (
            <p className="mt-1">{t.best(result.best)}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={start} className={startClass}>
              {t.again}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className={secondaryClass}
              >
                {t.close}
              </button>
            )}
          </div>
        </div>
      ) : (
        onClose && (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
            >
              {t.close}
            </button>
          </div>
        )
      )}
    </div>
  );
}
