/**
 * The check-in plant: a sampaguita in a clay pot that grows a step at each
 * check-in milestone. Drawn in the brand's browns and sages. It never wilts;
 * a missed day changes nothing.
 *
 * Stages: 0 empty pot, 1 seed, 2 sprout, 3 first leaves, 4 growing,
 * 5 first flower, 6 in bloom; `extraBlooms` adds a flower for every
 * 30 days after that.
 */

const BROWN = '#6E5F47';
const SAGE = '#AEC488';
const SAGE_DARK = '#8FA86A';
const LEAF_LIGHT = '#DFE7CF';

// Leaf pairs up the stem, lowest first: height on the stem, size, angle.
const LEAVES = [
  { y: 0.2, size: 15, angle: 38 },
  { y: 0.42, size: 19, angle: 32 },
  { y: 0.62, size: 20, angle: 28 },
  { y: 0.8, size: 16, angle: 24 },
];

// Where flowers sit, as offsets from the top of the stem.
const FLOWERS = [
  { x: 0, y: 0, r: 1 },
  { x: -22, y: 18, r: 0.8 },
  { x: 21, y: 22, r: 0.85 },
  { x: -12, y: 40, r: 0.7 },
  { x: 14, y: 46, r: 0.7 },
  { x: -26, y: 52, r: 0.65 },
  { x: 27, y: 60, r: 0.65 },
  { x: 0, y: 30, r: 0.75 },
];

function Leaf({
  x,
  y,
  size,
  angle,
  side,
}: {
  x: number;
  y: number;
  size: number;
  angle: number;
  side: 1 | -1;
}) {
  const tip = size * 2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${-side * angle} 0 0)`}>
      <path
        d={`M0 0 C ${side * size * 0.5} ${-size * 0.55}, ${side * tip * 0.85} ${-size * 0.45}, ${side * tip} 0 C ${side * tip * 0.85} ${size * 0.45}, ${side * size * 0.5} ${size * 0.55}, 0 0 Z`}
        fill={SAGE}
        stroke={SAGE_DARK}
        strokeWidth="1"
      />
      <path
        d={`M0 0 L ${side * tip * 0.8} 0`}
        stroke={SAGE_DARK}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </g>
  );
}

function Flower({ x, y, r }: { x: number; y: number; r: number }) {
  const petals = Array.from({ length: 6 }, (_, i) => i * 60);
  return (
    <g transform={`translate(${x} ${y}) scale(${r})`}>
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-6.5"
          rx="3.6"
          ry="6.5"
          transform={`rotate(${angle})`}
          fill="#FFFFFF"
          stroke={SAGE_DARK}
          strokeWidth="0.9"
        />
      ))}
      <circle
        cx="0"
        cy="0"
        r="2.6"
        fill="#E9D9A6"
        stroke={SAGE_DARK}
        strokeWidth="0.6"
      />
    </g>
  );
}

export function Sampaguita({
  stage,
  extraBlooms = 0,
  className,
}: {
  stage: number;
  extraBlooms?: number;
  className?: string;
}) {
  // Where the plant meets the soil, at the top of the pot.
  const soilY = 142;
  const centerX = 80;
  // Stem height by stage; stage 1 is a seed just breaking the soil.
  const stemHeights = [0, 10, 34, 62, 86, 96, 104];
  const stem = stemHeights[Math.min(stage, 6)];
  const topY = soilY - stem;
  const leafPairs = [0, 0, 1, 2, 4, 4, 4][Math.min(stage, 6)];
  const flowers =
    stage >= 6
      ? Math.min(3 + extraBlooms, FLOWERS.length)
      : stage === 5
        ? 1
        : 0;

  return (
    <svg
      viewBox="0 0 160 200"
      aria-hidden
      className={className}
      role="presentation"
    >
      {/* Soft ground shadow */}
      <ellipse cx={centerX} cy="192" rx="48" ry="5" fill={LEAF_LIGHT} />

      {/* The clay pot, with the soil showing at the top. */}
      <path
        d={`M${centerX - 36} ${soilY + 9} H ${centerX + 36} L ${centerX + 30} 190 H ${centerX - 30} Z`}
        fill="#EADFD0"
        stroke={BROWN}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x={centerX - 42}
        y={soilY - 2}
        width="84"
        height="12"
        rx="3"
        fill="#E2D3BF"
        stroke={BROWN}
        strokeWidth="2"
      />
      <ellipse cx={centerX} cy={soilY} rx="37" ry="3.5" fill={BROWN} />

      {stage >= 1 && stage < 2 && (
        // The seed, split open with a first shoot.
        <g>
          <ellipse cx={centerX} cy={soilY - 1} rx="5" ry="3.5" fill="#8A7658" />
          <path
            d={`M${centerX} ${soilY - 3} q 1 -6 -1 -10`}
            stroke={SAGE_DARK}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${centerX - 1} ${soilY - 12} c -5 -3 -9 -1 -9 2 c 4 1 7 0 9 -2 Z`}
            fill={SAGE}
            stroke={SAGE_DARK}
            strokeWidth="0.8"
          />
        </g>
      )}

      {stage >= 2 && (
        <path
          d={`M${centerX} ${soilY} C ${centerX - 3} ${soilY - stem * 0.4}, ${centerX + 3} ${soilY - stem * 0.7}, ${centerX} ${topY}`}
          stroke={SAGE_DARK}
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
      )}

      {stage === 2 && (
        // A sprout: two seed leaves at the top.
        <g>
          <Leaf x={centerX} y={topY + 2} size={9} angle={30} side={-1} />
          <Leaf x={centerX} y={topY + 2} size={9} angle={30} side={1} />
        </g>
      )}

      {LEAVES.slice(0, leafPairs).map((leaf, i) => {
        const y = soilY - stem * leaf.y;
        return (
          <g key={i}>
            <Leaf
              x={centerX}
              y={y}
              size={leaf.size}
              angle={leaf.angle}
              side={-1}
            />
            <Leaf
              x={centerX}
              y={y - 6}
              size={leaf.size * 0.95}
              angle={leaf.angle}
              side={1}
            />
          </g>
        );
      })}

      {stage >= 4 && stage < 5 && (
        // A bud at the tip before the first flower.
        <ellipse
          cx={centerX}
          cy={topY - 4}
          rx="3.5"
          ry="6"
          fill="#FFFFFF"
          stroke={SAGE_DARK}
          strokeWidth="0.9"
        />
      )}

      {FLOWERS.slice(0, flowers).map((flower, i) => (
        <Flower
          key={i}
          x={centerX + flower.x}
          y={topY + flower.y}
          r={flower.r}
        />
      ))}
    </svg>
  );
}
