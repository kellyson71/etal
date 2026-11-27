import type { CSSProperties } from 'react';
import { appQr } from '@/data/app-qr';
import { site } from '@/data/site';

const QUIET = 2;
const SIZE = appQr.length + QUIET * 2;

const rows = Array.from({ length: SIZE }, (_, y) => {
  let d = '';
  let run = 0;
  for (let x = 0; x <= SIZE; x++) {
    const light = x < SIZE && appQr[y - QUIET]?.[x - QUIET] !== '#';
    if (light) run++;
    else if (run) {
      d += `M${x - run} ${y}h${run}v1h-${run}z`;
      run = 0;
    }
  }
  return d;
});

const hex = 'M0-15 13-7.5V7.5L0 15-13 7.5V-7.5Z';

function Mark() {
  return (
    <svg className="badge__mark" viewBox="1 -3 44 78" aria-hidden="true">
      <g transform="translate(16 36)">
        <path d={hex} fill="#d6332c" />
        <path d="M-5-7h10v2.8h-6.8v2.8h5.4v2.8h-5.4v2.8h6.8V7H-5Z" fill="#fff" />
      </g>
      <g transform="translate(30 13)">
        <path d={hex} fill="#65b32e" />
        <path d="M0-7a4.6 4.6 0 0 1 2.7 8.3V3h-5.4V1.3A4.6 4.6 0 0 1 0-7ZM-2 5.2h4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g transform="translate(30 59)">
        <path d={hex} fill="#65b32e" />
        <rect x="-6.5" y="-5" width="13" height="9" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.8" />
        <path d="M-1.6-2.8V1.8L2.4-.5Z" fill="#fff" />
        <path d="M-3 6.5h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function QrLeds({ id }: { id: string }) {
  return (
    <svg className="badge__qr" viewBox={`0 0 ${SIZE} ${SIZE}`} shapeRendering="crispEdges" aria-hidden="true">
      <defs>
        <pattern id={`${id}-off`} width="1" height="1" patternUnits="userSpaceOnUse">
          <rect className="badge__qr-off" x="0.18" y="0.18" width="0.64" height="0.64" />
        </pattern>
      </defs>
      <rect width={SIZE} height={SIZE} fill={`url(#${id}-off)`} />
      {rows.map((d, y) => (
        <path className="badge__qr-row" key={y} d={d} style={{ '--r': String(y) } as CSSProperties} />
      ))}
    </svg>
  );
}

export function BadgeFace({ id }: { id: string }) {
  return (
    <div className="badge__face">
      <i className="badge__slot" />
      <div className="badge__head">
        <span className="badge__ed">IFRN · Pau dos Ferros</span>
        <span className="badge__brand">
          <Mark />
          <b>etal</b>
        </span>
        <i className="badge__holo" />
      </div>
      <span className="badge__photo">
        <span className="badge__av">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8.5" r="4" />
            <path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" />
          </svg>
        </span>
      </span>
      <div className="badge__body">
        <b className="badge__name">Seu nome</b>
        <span className="badge__sub">SUAP ou visitante</span>
        <span className="badge__screen">
          <QrLeds id={id} />
        </span>
      </div>
      <div className="badge__role">
        <b>Credencial</b>
        <span>{site.dates.short}</span>
      </div>
      <i className="badge__sheen" />
    </div>
  );
}
