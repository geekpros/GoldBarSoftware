import { useId } from "react";
import { cn } from "../utils/cn";

type IconProps = { className?: string };

export function LogoMark({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F9E7B3" />
          <stop offset="0.5" stopColor="#EDBB45" />
          <stop offset="1" stopColor="#B07E1A" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="10" fill="#14110B" stroke="rgba(237,187,69,0.35)" />
      <path d="M12 10.5h16l3.2 6.5H8.8L12 10.5z" fill={`url(#${id}-a)`} />
      <path d="M7.5 20h11l2.6 6H4.9l2.6-6z" fill="#D9A32B" />
      <path d="M21.5 20h11l2.6 6H18.9l2.6-6z" fill="#F2CE6B" />
      <path d="M12 10.5h16l1 2H11l1-2z" fill="#FFF3D6" opacity="0.55" />
    </svg>
  );
}

export const WindowsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
    <path d="M3 5.6l7.6-1.05v7H3V5.6zM11.9 4.35L21 3.1v8.45h-9.1v-7.2zM3 12.85h7.6v7L3 18.8v-5.95zM11.9 12.85H21v8.05l-9.1-1.25v-6.8z" />
  </svg>
);

export const AppleIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
    <path d="M16.37 12.9c-.02-2.02 1.64-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.3 2-1.4 2.44-.36 6.05 1.01 8.03.67.97 1.47 2.05 2.52 2.01 1.01-.04 1.39-.65 2.61-.65s1.56.65 2.63.63c1.09-.02 1.78-.98 2.44-1.95.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.12-.81-2.14-3.22zM14.35 6.46c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.22-.52.6-.97 1.56-.85 2.48.9.07 1.83-.46 2.39-1.14z" />
  </svg>
);

const S = ({ className, children, filled }: IconProps & { children: React.ReactNode; filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("h-5 w-5", className)}
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M4.5 12.5l5 5 10-11" /></S>
);
export const ShieldIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M12 3l7 2.8v5.4c0 4.5-2.9 7.6-7 9.3-4.1-1.7-7-4.8-7-9.3V5.8L12 3z" /><path d="M9 12l2.2 2.2L15.5 9.7" /></S>
);
export const LockIcon = ({ className }: IconProps) => (
  <S className={className}><rect x="5" y="10.5" width="14" height="9.5" rx="2.5" /><path d="M8 10.5V8a4 4 0 018 0v2.5" /><circle cx="12" cy="15.3" r="1.3" fill="currentColor" stroke="none" /></S>
);
export const FolderIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M3 7a2 2 0 012-2h4.2l2 2.2H19a2 2 0 012 2V17a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></S>
);
export const ClockIcon = ({ className }: IconProps) => (
  <S className={className}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></S>
);
export const RefreshIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M20 12a8 8 0 10-2.34 5.66" /><path d="M20 12v5h-5" transform="rotate(180 17.5 14.5)" /></S>
);
export const PlayIcon = ({ className }: IconProps) => (
  <S className={className} filled><path d="M8 5.5v13l11-6.5-11-6.5z" /></S>
);
export const StarIcon = ({ className }: IconProps) => (
  <S className={className} filled><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.44 6.2 20.5l1.1-6.47L2.6 9.45l6.5-.95L12 2.6z" /></S>
);
export const ArrowRightIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></S>
);
export const ChevronDownIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M5 9l7 7 7-7" /></S>
);
export const MenuIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M4 7h16M4 12h16M4 17h16" /></S>
);
export const XIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M6 6l12 12M18 6L6 18" /></S>
);
export const ZapIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" /></S>
);
export const LayersIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3.5 12.5L12 17l8.5-4.5" /><path d="M3.5 16.5L12 21l8.5-4.5" /></S>
);
export const DevicesIcon = ({ className }: IconProps) => (
  <S className={className}><rect x="2.5" y="5" width="13" height="10" rx="1.5" /><path d="M6 18.5h6" /><rect x="16.5" y="8" width="5" height="10.5" rx="1.5" /></S>
);
export const SearchIcon = ({ className }: IconProps) => (
  <S className={className}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></S>
);
export const TrashIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M4.5 6.5h15" /><path d="M8 6.5V5a1.5 1.5 0 011.5-1.5h5A1.5 1.5 0 0116 5v1.5" /><path d="M6.5 6.5l.8 12A2 2 0 009.3 20.5h5.4a2 2 0 002-1.9l.8-12.1" /></S>
);
export const SparklesIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" /><path d="M5 15.5l.7 1.8 1.8.7-1.8.7L5 20.5l-.7-1.8-1.8-.7 1.8-.7.7-1.8z" /></S>
);
export const UndoIcon = ({ className }: IconProps) => (
  <S className={className}><path d="M8 5L4 9l4 4" /><path d="M4 9h10a6 6 0 016 6v1" /></S>
);
export const HeartIcon = ({ className }: IconProps) => (
  <S className={className} filled><path d="M12 20.5s-7.5-4.7-9.3-9.4C1.4 7.7 3.6 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.3 0 5.5 3.2 4.2 6.6-1.8 4.7-9.3 9.4-9.3 9.4z" /></S>
);
export const MailIcon = ({ className }: IconProps) => (
  <S className={className}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></S>
);

export type FileKind = "photo" | "doc" | "sheet" | "video" | "audio" | "zip";

const KIND_STYLE: Record<FileKind, { bg: string; text: string; glyph: React.ReactNode }> = {
  photo: {
    bg: "bg-violeta/15 border-violeta/30",
    text: "text-violeta",
    glyph: <><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M5 17l4.5-4.5 3 3L16 12l3.5 3.5" /></>,
  },
  doc: {
    bg: "bg-azure/15 border-azure/30",
    text: "text-azure",
    glyph: <><path d="M7 3.5h7l4 4V20a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1z" /><path d="M14 3.5V8h4" /><path d="M9 12.5h6M9 16h6" /></>,
  },
  sheet: {
    bg: "bg-jade/15 border-jade/30",
    text: "text-jade",
    glyph: <><rect x="4.5" y="4" width="15" height="16" rx="1.5" /><path d="M4.5 9.5h15M9.5 9.5V20M14.5 9.5V20" /></>,
  },
  video: {
    bg: "bg-rosea/15 border-rosea/30",
    text: "text-rosea",
    glyph: <><rect x="3.5" y="6" width="13" height="12" rx="2" /><path d="M16.5 10.5l4-2.5v8l-4-2.5" /></>,
  },
  audio: {
    bg: "bg-gold-400/15 border-gold-400/30",
    text: "text-gold-300",
    glyph: <><path d="M9 18V6l10-2v11.5" /><circle cx="6.8" cy="18" r="2.3" /><circle cx="16.8" cy="15.5" r="2.3" /></>,
  },
  zip: {
    bg: "bg-sand/15 border-sand/30",
    text: "text-sand",
    glyph: <><path d="M7 3.5h10a1 1 0 011 1V20a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1z" /><path d="M11 3.5v2h2v2h-2v2h2v2h-2" /><rect x="10.5" y="13.5" width="3" height="3.5" rx="0.8" /></>,
  },
};

export function FileTypeIcon({ kind, className }: { kind: FileKind; className?: string }) {
  const s = KIND_STYLE[kind];
  return (
    <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border", s.bg, s.text, className)}>
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {s.glyph}
      </svg>
    </span>
  );
}