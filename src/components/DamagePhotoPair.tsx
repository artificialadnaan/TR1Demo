import type { DamageItem } from '../data/scope';
import { Expand, Image as ImageIcon } from 'lucide-react';

interface DamagePhotoPairProps {
  item: DamageItem;
}

// SVG illustrations stand in for real photos in the demo. When real photos
// are dropped into /public/images/far_01.jpg etc., replace the illustration
// renderer with <img src={item.farPhoto} />.

export default function DamagePhotoPair({ item }: DamagePhotoPairProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PhotoPlaceholder label="Far / Context" item={item} variant="far" />
      <PhotoPlaceholder label="Close / Detail" item={item} variant="close" />
    </div>
  );
}

// Small thumbnail — used in the claim package evidence grid
export function DamageThumbnail({ item }: { item: DamageItem }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
      <DamageIllustration code={item.xactimateCode} variant="close" />
      <div className="absolute top-1.5 left-1.5 font-mono text-[9px] text-white bg-ink-900/90 px-1.5 py-0.5 uppercase tracking-wider z-10">
        #{item.id}
      </div>
      <div className="absolute bottom-1.5 right-1.5 font-mono text-[9px] text-white bg-alert-500/90 px-1.5 py-0.5 uppercase tracking-wider z-10">
        {item.xactimateCode}
      </div>
    </div>
  );
}

function PhotoPlaceholder({
  label,
  item,
  variant,
}: {
  label: string;
  item: DamageItem;
  variant: 'far' | 'close';
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink-800 group">
      <DamageIllustration code={item.xactimateCode} variant={variant} />

      <div className="absolute top-3 left-3 bg-ink-900/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur flex items-center gap-1.5 z-10">
        <ImageIcon className="w-3 h-3" />
        {label}
      </div>

      <div className="absolute top-3 right-14 bg-alert-500/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur z-10">
        {item.xactimateCode}
      </div>

      <div className="absolute bottom-3 left-3 bg-ink-900/70 backdrop-blur px-2 py-0.5 font-mono text-[10px] text-white/90 uppercase tracking-wider z-10">
        @ {formatTime(variant === 'far' ? item.startTime : item.startTime + Math.floor((item.endTime - item.startTime) * 0.6))}
      </div>

      <button className="absolute top-3 right-3 w-7 h-7 bg-ink-900/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Expand className="w-3.5 h-3.5 text-white" />
      </button>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

function DamageIllustration({ code, variant }: { code: string; variant: 'far' | 'close' }) {
  const uid = `${code}-${variant}`.replace(/\s+/g, '');

  const sky = (
    <>
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fb5cc" />
          <stop offset="100%" stopColor="#d4dde5" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky-${uid})`} />
    </>
  );

  switch (code) {
    case 'RFG 300S':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {sky}
          <polygon points="0,180 400,120 400,300 0,300" fill="#44444a" />
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="0" y1={180 + i * 10} x2="400" y2={120 + i * 12} stroke="#2a2a30" strokeWidth="1" />
          ))}
          <g opacity={variant === 'close' ? 0.85 : 0.6}>
            {Array.from({ length: variant === 'close' ? 42 : 24 }).map((_, i) => {
              const x = (i * 41) % 360 + 30;
              const y = (i * 31) % 100 + 190;
              return <circle key={i} cx={x} cy={y} r={variant === 'close' ? 6 + (i % 3) * 2 : 3} fill="#928878" opacity={0.5 + (i % 4) * 0.15} />;
            })}
          </g>
          <circle cx={variant === 'far' ? 200 : 180} cy={variant === 'far' ? 210 : 180} r={variant === 'close' ? 55 : 45} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'RFG RIDGC':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {sky}
          <polygon points="0,250 200,130 400,250 400,300 0,300" fill="#44444a" />
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 20 + i * 38;
            const lifted = variant === 'close' ? i >= 3 && i <= 6 : i === 4 || i === 5;
            return (
              <rect
                key={i}
                x={x}
                y={lifted ? 113 : 123}
                width="36"
                height="18"
                fill="#34343a"
                stroke="#1a1a20"
                strokeWidth="1"
                transform={lifted ? `rotate(${i % 2 === 0 ? -10 : 7} ${x + 18} 125)` : ''}
              />
            );
          })}
          <circle cx={variant === 'far' ? 200 : 210} cy={variant === 'far' ? 135 : 112} r={variant === 'close' ? 55 : 40} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'RFG FLCH-C':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {sky}
          <polygon points="0,240 400,180 400,300 0,300" fill="#564638" />
          <rect x="160" y="40" width="100" height="200" fill="#9a5a3a" />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h-${i}`} x1="160" y1={40 + i * 20} x2="260" y2={40 + i * 20} stroke="#6a3a1a" strokeWidth="1" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`v-${i}`} x1={175 + i * 12} y1="40" x2={175 + i * 12} y2="240" stroke="#6a3a1a" strokeWidth="0.5" />
          ))}
          {/* Pulled-away flashing */}
          <path
            d={variant === 'close'
              ? "M155,235 L155,150 L138,128 L144,118 L156,142 L167,136"
              : "M155,235 L155,170 L148,164"}
            stroke="#b0b0b0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Water stain */}
          <path d="M150,240 L148,300 L170,300 L165,240 Z" fill="#1a0a04" opacity="0.5" />
          <circle cx={variant === 'far' ? 158 : 148} cy={variant === 'far' ? 160 : 135} r={variant === 'close' ? 50 : 32} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'GTR ALUM':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {sky}
          <rect x="0" y="100" width="400" height="30" fill="#b8a890" />
          <path
            d={variant === 'close'
              ? "M0,130 L60,132 L80,141 L120,131 L160,143 L200,133 L250,145 L290,130 L330,144 L400,132 L400,170 L0,170 Z"
              : "M0,130 L120,134 L180,140 L240,134 L320,141 L400,132 L400,170 L0,170 Z"}
            fill="#d0d0d0"
            stroke="#707070"
            strokeWidth="1.5"
          />
          <rect x="0" y="180" width="400" height="120" fill="#d8cfc0" />
          {Array.from({ length: variant === 'close' ? 16 : 7 }).map((_, i) => {
            const x = 30 + i * (variant === 'close' ? 24 : 55);
            return <circle key={i} cx={x} cy={145} r={variant === 'close' ? 5 : 3} fill="#505050" opacity="0.8" />;
          })}
          <circle cx={variant === 'far' ? 200 : 180} cy={145} r={variant === 'close' ? 50 : 80} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'GTR DWN':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <rect x="0" y="0" width="400" height="300" fill="#d8cfc0" />
          <rect x="185" y="30" width="30" height="240" fill="#c8c8c8" stroke="#707070" strokeWidth="1" />
          <path
            d={variant === 'close'
              ? "M185,145 L193,140 L203,143 L215,145 L215,185 L203,183 L193,187 L185,185 Z"
              : "M185,160 L200,156 L215,160 L215,175 L200,172 L185,175 Z"}
            fill="#707070"
          />
          <rect x="0" y="10" width="400" height="22" fill="#d0d0d0" stroke="#707070" strokeWidth="1" />
          {/* Gutter elbow */}
          <path d="M185,30 L215,30 L215,50 L195,60 L185,50 Z" fill="#c8c8c8" stroke="#707070" strokeWidth="1" />
          <circle cx={200} cy={variant === 'close' ? 163 : 166} r={variant === 'close' ? 45 : 30} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'WDW SCR':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#b89a6a" />
          <rect x="60" y="40" width="280" height="220" fill="#f5f5f5" stroke="#4a3a20" strokeWidth="8" />
          <line x1="200" y1="40" x2="200" y2="260" stroke="#4a3a20" strokeWidth="5" />
          <line x1="60" y1="150" x2="340" y2="150" stroke="#4a3a20" strokeWidth="5" />
          {/* Mesh */}
          {Array.from({ length: 35 }).map((_, i) => (
            <line key={`hm-${i}`} x1="65" y1={45 + i * 6} x2="335" y2={45 + i * 6} stroke="#555" strokeWidth="0.4" opacity="0.6" />
          ))}
          {Array.from({ length: 45 }).map((_, i) => (
            <line key={`vm-${i}`} x1={65 + i * 6} y1="45" x2={65 + i * 6} y2="255" stroke="#555" strokeWidth="0.4" opacity="0.6" />
          ))}
          {/* Tear */}
          <path
            d={variant === 'close' ? "M130,75 L170,95 L155,130 L185,150 L155,170 L125,120 Z" : "M130,85 L175,135 L150,165 L110,125 Z"}
            fill="rgba(245, 245, 245, 0.6)"
            stroke="#1a1a1a"
            strokeWidth="2.5"
          />
          <circle cx={variant === 'close' ? 155 : 150} cy={variant === 'close' ? 125 : 130} r={variant === 'close' ? 55 : 45} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'SDG VINL':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#e8e0d0" />
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i}>
              <line x1="0" y1={i * 18} x2="400" y2={i * 18} stroke="#b8a890" strokeWidth="2" />
              <line x1="0" y1={i * 18 + 2} x2="400" y2={i * 18 + 2} stroke="#fff" strokeWidth="0.5" opacity="0.7" />
            </g>
          ))}
          {/* Hail dimples */}
          <g opacity={variant === 'close' ? 0.8 : 0.55}>
            {Array.from({ length: variant === 'close' ? 55 : 35 }).map((_, i) => {
              const x = (i * 37) % 360 + 20;
              const y = (i * 53) % 200 + 50;
              return <ellipse key={i} cx={x} cy={y} rx={variant === 'close' ? 4 : 2.5} ry={variant === 'close' ? 2.5 : 1.8} fill="#3a2a1e" />;
            })}
          </g>
          <circle cx={variant === 'far' ? 200 : 180} cy={variant === 'far' ? 150 : 140} r={variant === 'close' ? 70 : 90} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'HVC FINR':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#b8a890" />
          <rect x="0" y="240" width="400" height="60" fill="#7a7a6a" />
          <rect x="80" y="80" width="240" height="180" fill="#4a4a4e" stroke="#1a1a1e" strokeWidth="2" />
          <circle cx="200" cy="170" r="72" fill="#2a2a2e" stroke="#0a0a0e" strokeWidth="2" />
          <circle cx="200" cy="170" r="8" fill="#8a8a8e" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path
              key={a}
              d={`M 200 170 L ${200 + 60 * Math.cos((a * Math.PI) / 180)} ${170 + 60 * Math.sin((a * Math.PI) / 180)}`}
              stroke="#5a5a5e"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.8"
            />
          ))}
          {/* Crushed fins */}
          {Array.from({ length: variant === 'close' ? 20 : 14 }).map((_, i) => {
            const y = 90 + i * (variant === 'close' ? 9 : 13);
            const crushX = 105 + (i % 5) * 25;
            return (
              <polyline
                key={i}
                points={`85,${y} ${crushX},${y} ${crushX + 20},${y + 3} ${crushX + 40},${y - 1} 315,${y}`}
                stroke="#7a7a7e"
                strokeWidth="0.6"
                fill="none"
              />
            );
          })}
          <circle cx={variant === 'close' ? 145 : 200} cy="170" r={variant === 'close' ? 55 : 80} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'AWN ALUM':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {sky}
          <rect x="0" y="0" width="400" height="150" fill="#c8bfb0" />
          <polygon points="0,140 400,160 400,182 0,162" fill="#b8b8b8" stroke="#707070" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x={i * 50} y={142 + i * 2.5} width="48" height="20" fill={i % 2 === 0 ? "#c8c8c8" : "#b8b8b8"} stroke="#707070" strokeWidth="0.5" />
              {variant === 'close' && (
                <>
                  <ellipse cx={i * 50 + 15} cy={150 + i * 2.5} rx="6" ry="2.5" fill="#707070" opacity="0.6" />
                  <ellipse cx={i * 50 + 35} cy={153 + i * 2.5} rx="5" ry="2" fill="#707070" opacity="0.6" />
                </>
              )}
              {variant === 'far' && i % 3 === 0 && (
                <ellipse cx={i * 50 + 25} cy={150 + i * 2.5} rx="10" ry="3" fill="#707070" opacity="0.5" />
              )}
            </g>
          ))}
          <rect x="50" y="160" width="8" height="130" fill="#707070" />
          <rect x="342" y="160" width="8" height="130" fill="#707070" />
          <rect x="0" y="270" width="400" height="30" fill="#7a7a6a" />
          <circle cx={200} cy={155} r={variant === 'close' ? 70 : 110} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'GDR PAN':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#b89a6a" />
          <rect x="60" y="40" width="280" height="240" fill="#e8e8e8" stroke="#1a1a1e" strokeWidth="3" />
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={i} x1="60" y1={100 + i * 45} x2="340" y2={100 + i * 45} stroke="#707070" strokeWidth="2" />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x={80 + i * 65} y="55" width="50" height="30" fill="#3a5a6a" stroke="#707070" strokeWidth="1" />
          ))}
          {/* Dents — subtle */}
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              cx={120 + i * 80}
              cy={180 + (i % 2) * 40}
              rx={variant === 'close' ? 10 : 5}
              ry={variant === 'close' ? 6 : 3}
              fill="#a8a8a8"
              opacity="0.7"
            />
          ))}
          <circle cx={200} cy={200} r={variant === 'close' ? 75 : 90} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    case 'GTR GRD':
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {sky}
          <rect x="0" y="100" width="400" height="30" fill="#b8a890" />
          <rect x="0" y="130" width="400" height="40" fill="#c8c8c8" stroke="#707070" strokeWidth="1" />
          {/* Mesh pattern */}
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={`h-${i}`} x1={i * 10} y1="128" x2={i * 10 + 4} y2="148" stroke="#5a5a5a" strokeWidth="0.8" />
          ))}
          {/* Bent guard section */}
          <path
            d={variant === 'close' ? "M120,130 Q150,120 180,138 L180,148 Q150,135 120,145 Z" : "M140,130 Q200,120 260,138 L260,148 Q200,135 140,145 Z"}
            fill="#8a8a8a"
            stroke="#2a2a2a"
            strokeWidth="1"
            opacity="0.9"
          />
          <rect x="0" y="170" width="400" height="130" fill="#d8cfc0" />
          <circle cx={variant === 'far' ? 200 : 180} cy={138} r={variant === 'close' ? 55 : 85} stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.9" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#6a6a6e" />
          <circle cx="200" cy="150" r="50" stroke="#ef4444" strokeWidth="3" fill="none" />
        </svg>
      );
  }
}

function formatTime(s: number) {
  const mm = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}
