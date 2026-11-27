import type { CSSProperties } from 'react';
import Image from 'next/image';

const screens = [
  { src: '/app/inicio.webp', alt: 'Início do app, com o crachá e a próxima atividade' },
  { src: '/app/programacao.webp', alt: 'Programação do dia no app' },
  { src: '/app/mapa.webp', alt: 'Mapa do campus em 3D no app' },
  { src: '/app/cracha.webp', alt: 'Crachá com o QR no app' },
];

export function AppPhone() {
  return (
    <div className="phone">
      <i className="phone__key phone__key--vol" />
      <i className="phone__key phone__key--power" />
      <div className="phone__screen">
        <div className="phone__bar">
          <span>12:40</span>
          <span className="phone__icons">
            <svg viewBox="0 0 16 12">
              <path d="M1 11h2V8H1zM5 11h2V6H5zM9 11h2V3.5H9zM13 11h2V1h-2z" />
            </svg>
            <svg viewBox="0 0 16 12">
              <path d="M8 11.2 5.6 8.6a3.4 3.4 0 0 1 4.8 0zM3.4 6.4a6.5 6.5 0 0 1 9.2 0l-1.1 1.1a5 5 0 0 0-7 0zM1.2 4.2a9.6 9.6 0 0 1 13.6 0l-1.1 1.1a8 8 0 0 0-11.4 0z" />
            </svg>
            <svg viewBox="0 0 24 12">
              <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="2.5" y="2.5" width="12.5" height="7" rx="1.5" />
              <rect x="21.5" y="4" width="1.8" height="4" rx="0.9" />
            </svg>
          </span>
        </div>
        <i className="phone__camera" />
        <div className="phone__shots">
          {screens.map((s, i) => (
            <Image
              className="phone__shot"
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={720}
              height={1512}
              sizes="(max-width: 767px) 160px, 270px"
              style={{ '--i': String(i) } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
