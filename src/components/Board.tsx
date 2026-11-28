'use client';
import { gsap } from 'gsap';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { days, schedule, type DayId } from '@/data/site';
import { onScroll, prefersReducedMotion, scrollToTarget } from '@/engine';

const DIGITS = '0123456789';

/** Scoreboard flip: the digits of each time run through random numbers before settling. */
function flip(panel: HTMLElement) {
  const times = [...panel.querySelectorAll<HTMLElement>('[data-flip]')];
  const tl = gsap.timeline();
  times.forEach((el, i) => {
    const final = el.dataset.flip ?? '';
    const o = { p: 0 };
    tl.to(o, {
      p: 1,
      duration: 0.5,
      ease: 'none',
      onUpdate: () => {
        const settled = Math.floor(o.p * final.length);
        el.textContent = [...final].map((c, k) => (k < settled || !DIGITS.includes(c) ? c : DIGITS[(Math.random() * 10) | 0])).join('');
      },
      onComplete: () => { el.textContent = final; },
    }, i * 0.03);
  });
  tl.from(panel.querySelectorAll('.board__title'), { autoAlpha: 0, x: -12, duration: 0.6, stagger: 0.04, ease: 'expo.out' }, 0.1);
  return tl;
}

/**
 * Both days on one board: the day tabs stay pinned while you scroll and the active one follows the list
 * under them, so finishing Thursday turns the board to Friday, with the scoreboard flip. A tab jumps to its day.
 */
export function Board() {
  const [active, setActive] = useState<DayId>(days[0]?.id ?? 'qui');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const bar = useRef<HTMLDivElement | null>(null);
  const panels = useRef<Partial<Record<DayId, HTMLDivElement | null>>>({});
  const first = useRef(true);

  // The day whose list is under the pinned tabs is the active one.
  useEffect(() => {
    const spy = () => {
      const edge = (bar.current?.getBoundingClientRect().bottom ?? 0) + 2;
      let current = days[0]?.id;
      for (const day of days) {
        const panel = panels.current[day.id];
        if (panel && panel.getBoundingClientRect().top <= edge) current = day.id;
      }
      if (current) setActive(current);
    };
    spy();
    const off = onScroll(spy);
    addEventListener('scroll', spy, { passive: true });
    addEventListener('resize', spy);
    return () => {
      off();
      removeEventListener('scroll', spy);
      removeEventListener('resize', spy);
    };
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const panel = panels.current[active];
    if (!panel || prefersReducedMotion()) return;
    const tl = flip(panel);
    return () => { tl.progress(1).kill(); };
  }, [active]);

  const go = (id: DayId) => {
    const panel = panels.current[id];
    if (!panel) return;
    const pinned = bar.current?.offsetHeight ?? 0;
    scrollToTarget(panel.getBoundingClientRect().top + scrollY - pinned + 1);
  };

  // Arrow keys move between days.
  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + days.length) % days.length;
    const day = days[next];
    if (!day) return;
    go(day.id);
    tabs.current[next]?.focus();
  };

  const index = Math.max(0, days.findIndex((d) => d.id === active));

  return (
    <div className="board">
      <div className="board__tabs" ref={bar} aria-label="Dias do evento" style={{ '--i': index, '--n': days.length } as CSSProperties}>
        {days.map((day, i) => (
          <button
            key={day.id}
            ref={(el) => { tabs.current[i] = el; }}
            className="board__tab"
            type="button"
            aria-current={active === day.id ? 'true' : undefined}
            aria-controls={`painel-${day.id}`}
            onClick={() => go(day.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="board__tab-day led">
              {day.weekday.slice(0, 3)} {Number(day.isoDate.slice(8))}
            </span>
            <span className="board__tab-date">{day.date}</span>
            <span className="board__tab-hint" aria-hidden="true">
              Clique e saiba mais <span className="board__tab-arrow">→</span>
            </span>
          </button>
        ))}
        <span className="board__bar" aria-hidden="true" />
      </div>
      {days.map((day) => (
        <div
          key={day.id}
          ref={(el) => { panels.current[day.id] = el; }}
          className={`board__panel${active === day.id ? ' is-active' : ''}`}
          id={`painel-${day.id}`}
          aria-label={`${day.weekday}, ${day.date}`}
        >
          <p className="board__summary">
            <span className="board__summary-day led">
              {day.weekday.slice(0, 3)} {Number(day.isoDate.slice(8))}
            </span>
            <span>{day.summary}</span>
          </p>
          <ol>
            {schedule
              .filter((s) => s.day === day.id)
              .map((s) => (
                <li className={`board__row${s.pause ? ' board__row--pause' : ''}`} key={`${s.start}-${s.title}`}>
                  <time className="board__time led" dateTime={`${day.isoDate}T${s.start}`} data-flip={s.start}>
                    {s.start}
                  </time>
                  <time className="board__time board__time--end led" dateTime={`${day.isoDate}T${s.end}`} data-flip={s.end}>
                    <span className="sr-only">até </span>
                    {s.end}
                  </time>
                  {s.href ? (
                    <a className="board__title board__link" href={s.href}>
                      {s.title}
                    </a>
                  ) : (
                    <span className="board__title">{s.title}</span>
                  )}
                </li>
              ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
