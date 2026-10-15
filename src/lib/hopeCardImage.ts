/**
 * Draws the Hope Card as a phone-wallpaper image on the visitor's device.
 * Nothing is uploaded; the picture is made in the browser and saved by them.
 */

export interface HopeCardImageContent {
  brand: string;
  title: string;
  subtitle: string;
  sections: { heading: string; lines: string[] }[];
  crisisHeading: string;
  crisisLines: string[];
  footer: string;
}

const WIDTH = 1080;
const HEIGHT = 1920;
const SIDE = 84;
// Leaves room for the clock and notch when used as a wallpaper.
const TOP = 230;
const BOTTOM = 150;

const BROWN = '#6E5F47';
const BACKGROUND = '#FCFDFA';
const CARD = '#FFFFFF';
const SAGE_LIGHT = '#EFF3E7';
const LINE = '#DFE7CF';

function fontFamily(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  return value || fallback;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > width && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

interface Fonts {
  display: string;
  heading: string;
  body: string;
}

/** Lays the card out at a scale; draws only when `draw` is true. Returns the height used. */
function layout(
  ctx: CanvasRenderingContext2D,
  content: HopeCardImageContent,
  fonts: Fonts,
  scale: number,
  draw: boolean
) {
  const inner = WIDTH - SIDE * 2;
  const pad = 44 * scale;
  let y = TOP;

  if (draw) {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = BROWN;
    ctx.textBaseline = 'top';
  }

  const text = (
    value: string,
    font: string,
    size: number,
    x: number,
    width: number,
    gap = 1.35
  ) => {
    ctx.font = font.replace('{size}', `${size}px`);
    const lines = wrap(ctx, value, width);
    lines.forEach((line, i) => {
      if (draw) ctx.fillText(line, x, y + i * size * gap);
    });
    y += lines.length * size * gap;
  };

  text(content.brand, `700 {size} ${fonts.heading}`, 30 * scale, SIDE, inner);
  y += 18 * scale;
  text(
    content.title,
    `400 {size} ${fonts.display}`,
    92 * scale,
    SIDE,
    inner,
    1.1
  );
  y += 12 * scale;
  text(content.subtitle, `400 {size} ${fonts.body}`, 34 * scale, SIDE, inner);
  y += 44 * scale;

  const box = (
    heading: string,
    lines: string[],
    fill: string,
    stroke: string | null
  ) => {
    const startY = y;
    // Measure first, then draw the box behind the text.
    const measureOnly = () => {
      const saved = y;
      y += pad;
      ctx.font = `700 ${38 * scale}px ${fonts.heading}`;
      y += wrap(ctx, heading, inner - pad * 2).length * 38 * scale * 1.3;
      y += 12 * scale;
      ctx.font = `400 ${36 * scale}px ${fonts.body}`;
      for (const line of lines) {
        y += wrap(ctx, line, inner - pad * 2).length * 36 * scale * 1.35;
        y += 8 * scale;
      }
      y += pad;
      const height = y - saved;
      y = saved;
      return height;
    };
    const height = measureOnly();
    if (draw) {
      roundedRect(ctx, SIDE, startY, inner, height, 32 * scale);
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.fillStyle = BROWN;
    }
    y += pad;
    text(
      heading,
      `700 {size} ${fonts.heading}`,
      38 * scale,
      SIDE + pad,
      inner - pad * 2,
      1.3
    );
    y += 12 * scale;
    for (const line of lines) {
      text(
        line,
        `400 {size} ${fonts.body}`,
        36 * scale,
        SIDE + pad,
        inner - pad * 2
      );
      y += 8 * scale;
    }
    y = startY + height + 28 * scale;
  };

  for (const section of content.sections) {
    box(section.heading, section.lines, CARD, LINE);
  }
  box(content.crisisHeading, content.crisisLines, SAGE_LIGHT, null);

  if (draw) {
    ctx.font = `700 ${30 * scale}px ${fonts.heading}`;
    ctx.textAlign = 'center';
    ctx.fillText(content.footer, WIDTH / 2, HEIGHT - BOTTOM + 40);
    ctx.textAlign = 'left';
  }
  return y;
}

export async function drawHopeCard(content: HopeCardImageContent) {
  const fonts: Fonts = {
    display: fontFamily('--font-playfair', 'Georgia, serif'),
    heading: fontFamily('--font-poppins', 'Arial, sans-serif'),
    body: fontFamily('--font-dm-sans', 'Arial, sans-serif'),
  };
  await Promise.all([
    document.fonts.load(`400 92px ${fonts.display}`),
    document.fonts.load(`700 38px ${fonts.heading}`),
    document.fonts.load(`400 36px ${fonts.body}`),
  ]).catch(() => {});

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Shrink the text until everything fits above the footer.
  let scale = 1;
  while (
    scale > 0.55 &&
    layout(ctx, content, fonts, scale, false) > HEIGHT - BOTTOM
  ) {
    scale -= 0.05;
  }
  layout(ctx, content, fonts, scale, true);

  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob), 'image/png')
  );
}
