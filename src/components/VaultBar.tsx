import { useId } from "react";
import { useReducedMotion } from "../hooks";

/**
 * The GoldBar vault ingot — drawn entirely in code (no image files).
 * Isometric gold bar with engraved folder mark, purity stamp, circuit
 * traces, a travelling sheen, and drifting gold dust.
 */
export default function VaultBar() {
  const id = useId();
  const reduced = useReducedMotion();

  const TOP = "205,265 555,220 645,305 295,350";
  const FRONT = "295,350 645,305 672,398 310,448";
  const LEFT = "205,265 295,350 310,448 188,358";

  const dust: { x: number; y: number; r: number; d: number; dur: number }[] = [
    { x: 150, y: 300, r: 2.4, d: 0, dur: 5.2 },
    { x: 250, y: 180, r: 1.8, d: 1.4, dur: 6 },
    { x: 420, y: 150, r: 2.8, d: 2.6, dur: 5.6 },
    { x: 590, y: 190, r: 1.6, d: 0.8, dur: 6.4 },
    { x: 690, y: 300, r: 2.2, d: 3.4, dur: 5 },
    { x: 660, y: 440, r: 1.8, d: 1.9, dur: 6.8 },
    { x: 130, y: 430, r: 2, d: 4.2, dur: 5.8 },
    { x: 480, y: 520, r: 2.4, d: 2.2, dur: 6.2 },
  ];

  return (
    <svg
      viewBox="0 0 800 620"
      className="relative w-full"
      role="img"
      aria-label="A polished gold ingot engraved with a folder icon — the GoldBar vault"
      data-vault-art
    >
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6DC" />
          <stop offset="0.35" stopColor="#F5DA8F" />
          <stop offset="0.68" stopColor="#EDBB45" />
          <stop offset="1" stopColor="#C8922A" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9BA4F" />
          <stop offset="0.45" stopColor="#C08B20" />
          <stop offset="1" stopColor="#8A5A12" />
        </linearGradient>
        <linearGradient id={`${id}-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9A6A16" />
          <stop offset="1" stopColor="#55380A" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(237,187,69,0.5)" />
          <stop offset="0.6" stopColor="rgba(217,163,43,0.16)" />
          <stop offset="1" stopColor="rgba(217,163,43,0)" />
        </radialGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.5" stopColor="rgba(255,250,230,0.55)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id={`${id}-refl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(217,163,43,0.35)" />
          <stop offset="1" stopColor="rgba(217,163,43,0)" />
        </linearGradient>
        <clipPath id={`${id}-clip-top`}>
          <polygon points={TOP} />
        </clipPath>
      </defs>

      {/* ambient halo + grounding */}
      <ellipse cx="420" cy="330" rx="340" ry="230" fill={`url(#${id}-glow)`} opacity="0.5" />
      <ellipse cx="430" cy="482" rx="265" ry="42" fill={`url(#${id}-glow)`} opacity="0.7" />
      <ellipse cx="430" cy="474" rx="215" ry="26" fill="#000" opacity="0.5" />
      <polygon points="310,458 672,408 658,472 324,518" fill={`url(#${id}-refl)`} opacity="0.35" />

      {/* drifting gold dust */}
      {!reduced &&
        dust.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#F2CE6B"
            className="dust"
            style={{ animationDelay: `${p.d}s`, animationDuration: `${p.dur}s` }}
          />
        ))}

      <g className="floaty-slow">
        {/* faces */}
        <polygon points={LEFT} fill={`url(#${id}-left)`} />
        <polygon points={FRONT} fill={`url(#${id}-front)`} />
        <polygon points={TOP} fill={`url(#${id}-top)`} />

        {/* engraved top face, mapped onto its plane */}
        <g transform="matrix(3.5,-0.45,0.9,0.85,205,265)">
          <rect x="6" y="9" width="88" height="82" fill="none" stroke="#7A4E0E" strokeWidth="0.9" opacity="0.5" />
          <rect x="8" y="11.4" width="88" height="82" fill="none" stroke="#FFF3D6" strokeWidth="0.6" opacity="0.3" />

          {/* circuit traces */}
          <g stroke="#8A5A12" strokeWidth="0.8" fill="none" opacity="0.55">
            <polyline points="11,16 24,16 30,22" />
            <polyline points="89,16 76,16 70,22" />
            <polyline points="11,84 22,84 28,78" />
            <polyline points="89,84 78,84 72,78" />
          </g>
          <g fill="#8A5A12" opacity="0.6">
            <circle cx="30" cy="22" r="1.3" />
            <circle cx="70" cy="22" r="1.3" />
            <circle cx="28" cy="78" r="1.3" />
            <circle cx="72" cy="78" r="1.3" />
          </g>

          {/* embossed folder mark */}
          <path
            d="M38 27 h9 l4 5 h13 a2 2 0 0 1 2 2 v15 a2 2 0 0 1 -2 2 H38 a2 2 0 0 1 -2 -2 V29 a2 2 0 0 1 2 -2 z"
            fill="none" stroke="#FFF3D6" strokeWidth="1.5" opacity="0.35" transform="translate(0.5,0.8)"
          />
          <path
            d="M38 27 h9 l4 5 h13 a2 2 0 0 1 2 2 v15 a2 2 0 0 1 -2 2 H38 a2 2 0 0 1 -2 -2 V29 a2 2 0 0 1 2 -2 z"
            fill="rgba(122,78,14,0.18)" stroke="#7A4E0E" strokeWidth="1.5" opacity="0.85"
          />

          {/* purity stamps */}
          <text x="51" y="67" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="3" fill="#7A4E0E" opacity="0.85">
            GOLDBAR
          </text>
          <text x="51" y="78" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="4.6" fontWeight="600" letterSpacing="1.6" fill="#7A4E0E" opacity="0.65">
            999.9 · FINE FILES
          </text>
        </g>

        {/* front-face security stamp */}
        <g transform="matrix(3.5,-0.45,0.15,0.98,295,350)">
          <text x="50" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="4" fill="#5C3B0B" opacity="0.6">
            AES-256
          </text>
          <text x="50.4" y="58.8" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="4" fill="#F9E7B3" opacity="0.18">
            AES-256
          </text>
        </g>

        {/* light-catching edges */}
        <path d="M205 265 L555 220" stroke="#FFF6DC" strokeWidth="2.2" opacity="0.85" fill="none" />
        <path d="M555 220 L645 305" stroke="#FFEFC4" strokeWidth="1.6" opacity="0.6" fill="none" />
        <path d="M295 350 L645 305" stroke="#F9E7B3" strokeWidth="1.1" opacity="0.5" fill="none" />
        <path d="M205 265 L295 350" stroke="#F5DA8F" strokeWidth="1" opacity="0.4" fill="none" />

        {/* travelling sheen across the top face */}
        {!reduced && (
          <g clipPath={`url(#${id}-clip-top)`}>
            <g transform="skewX(-18)">
              <g>
                <rect x="0" y="140" width="130" height="340" fill={`url(#${id}-sheen)`} />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="-380 0; 980 0"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          </g>
        )}
      </g>
    </svg>
  );
}