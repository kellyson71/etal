'use client';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

export function AppDock() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const watched = [...['inicio', 'app', 'inscricao'].map((id) => document.getElementById(id)), document.querySelector('footer')].filter(
      (el): el is HTMLElement => !!el,
    );
    const inView = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
      setShown(inView.size === 0);
    });
    watched.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <a className="dock" href={site.app.url} target="_blank" rel="noopener noreferrer" data-shown={shown} inert={!shown}>
      <span className="dock__badge" aria-hidden="true" />
      <span>Abrir o {site.app.name}</span>
      <span className="sr-only"> (abre em nova aba)</span>
      <span className="dock__go" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
