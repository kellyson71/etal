'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { onScroll, prefersReducedMotion } from '@/engine';
import { BadgeFace } from './BadgeFace';

const STRAP = 'ETAL · CONNECT · '.repeat(8);
const PULL = 80;
const HOLD = 140;

export function AppBadge({ url, children }: { url: string; children?: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const left = useRef<SVGPathElement>(null);
  const right = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = stage.current;
    const box = card.current;
    const strapL = left.current;
    const strapR = right.current;
    if (!el || !box || !strapL || !strapR) return;
    const still = prefersReducedMotion();

    const s = { x: 0, y: 0, a: 0, vx: 0, vy: 0, va: 0, tx: 0, ty: 0, k: 170, c: 13 };
    let cx = 0;
    let rest = 0;
    let scale = 1;
    let spread = 56;
    let raf = 0;
    let last = 0;
    let visible = false;
    let armedAt = 0;
    let touched = false;
    let tugs = 0;
    let drag: { x: number; y: number; mode: 'pull' | 'scroll' | null } | null = null;

    const measure = () => {
      const css = getComputedStyle(el);
      cx = box.offsetLeft + box.offsetWidth / 2;
      rest = parseFloat(css.getPropertyValue('--L')) || 140;
      scale = parseFloat(css.getPropertyValue('--bs')) || 1;
      spread = 56 * scale;
    };

    const render = () => {
      box.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.a}rad) scale(${scale})`;
      const ex = cx + s.x;
      const ey = rest + s.y - 20 * scale;
      strapL.setAttribute('d', `M${cx - spread} -4L${ex - 3 * scale} ${ey}`);
      strapR.setAttribute('d', `M${cx + spread} -4L${ex + 3 * scale} ${ey}`);
    };

    const arm = (on: boolean) => {
      if (on && !armedAt) armedAt = performance.now();
      if (!on) armedAt = 0;
      el.classList.toggle('is-armed', on);
    };

    const frame = (t: number) => {
      const dt = Math.min(0.032, (t - (last || t)) / 1000 || 0.016);
      last = t;
      const ax = s.k * (s.tx - s.x) - s.c * s.vx;
      const ay = s.k * (s.ty - s.y) - s.c * s.vy;
      s.vx += ax * dt;
      s.vy += ay * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const aa = -58 * s.a - 3.6 * s.va + ax * 0.0011;
      s.va += aa * dt;
      s.a = Math.max(-0.7, Math.min(0.7, s.a + s.va * dt));
      render();
      const calm =
        !drag &&
        Math.abs(s.x - s.tx) + Math.abs(s.y - s.ty) < 0.3 &&
        Math.abs(s.vx) + Math.abs(s.vy) < 2 &&
        Math.abs(s.a) + Math.abs(s.va) < 0.002;
      if (calm) {
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const drop = () => {
      s.y = -(rest + 520 * scale);
      s.x = 0;
      s.vx = 0;
      s.vy = 0;
      s.va = 1.4;
      s.tx = 0;
      s.ty = 0;
      s.k = 170;
      s.c = 13;
      wake();
    };

    const open = () => {
      const w = window.open(url, '_blank');
      if (w) w.opener = null;
      else location.href = url;
      s.k = 90;
      s.c = 8;
      s.ty = innerHeight;
      wake();
      window.setTimeout(() => {
        arm(false);
        if (still) {
          s.y = 0;
          s.ty = 0;
          render();
        } else drop();
      }, 900);
    };

    const move = (dx: number, dy: number) => {
      s.tx = 90 * Math.tanh(dx / 220);
      s.ty = dy > 0 ? 125 * (1 - Math.exp(-dy / 200)) : Math.max(-30, dy * 0.2);
      arm(s.ty > PULL);
      wake();
    };
    const release = () => {
      const ready = armedAt && performance.now() - armedAt > HOLD;
      drag = null;
      el.classList.remove('is-dragging');
      s.k = 170;
      s.c = 13;
      if (ready) return open();
      arm(false);
      s.tx = 0;
      s.ty = 0;
      wake();
    };
    const start = (x: number, y: number, mode: 'pull' | null) => {
      drag = { x, y, mode };
      touched = true;
      s.k = 520;
      s.c = 40;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      e.preventDefault();
      box.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
      start(e.clientX, e.clientY, 'pull');
    };
    const onPointerMove = (e: PointerEvent) => {
      if (drag && e.pointerType !== 'touch') {
        move(e.clientX - drag.x, e.clientY - drag.y);
        return;
      }
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tilt', (((e.clientX - r.left) / r.width - 0.5) * 0.6).toFixed(3));
    };
    const onPointerUp = (e: PointerEvent) => {
      if (drag && e.pointerType !== 'touch') release();
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (e.touches.length !== 1 || !t) return;
      start(t.clientX, t.clientY, null);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!drag || !t) return;
      const dx = t.clientX - drag.x;
      const dy = t.clientY - drag.y;
      if (!drag.mode) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        drag.mode = dy > 0 && dy > Math.abs(dx) ? 'pull' : 'scroll';
        if (drag.mode === 'pull') el.classList.add('is-dragging');
      }
      if (drag.mode !== 'pull') return;
      e.preventDefault();
      move(dx, dy);
    };
    const onTouchEnd = () => {
      if (!drag) return;
      if (drag.mode === 'pull') release();
      else {
        drag = null;
        s.k = 170;
        s.c = 13;
      }
    };

    measure();
    render();
    const resize = new ResizeObserver(() => {
      measure();
      render();
    });
    resize.observe(el);

    box.addEventListener('pointerdown', onPointerDown);
    box.addEventListener('pointermove', onPointerMove);
    box.addEventListener('pointerup', onPointerUp);
    box.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('pointermove', onPointerMove);
    box.addEventListener('touchstart', onTouchStart, { passive: true });
    box.addEventListener('touchmove', onTouchMove, { passive: false });
    box.addEventListener('touchend', onTouchEnd);
    box.addEventListener('touchcancel', onTouchEnd);

    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (!visible || el.classList.contains('is-on')) return;
        el.classList.add('is-on');
        if (still) {
          el.classList.add('is-lit');
          return;
        }
        drop();
        window.setTimeout(() => el.classList.add('is-lit'), 650);
        tugs = window.setInterval(() => {
          if (touched) return window.clearInterval(tugs);
          if (!visible || drag) return;
          s.vy += 240;
          s.va += 0.25;
          wake();
        }, 5200);
      },
      { threshold: 0.35 },
    );
    seen.observe(el);

    const offScroll = still
      ? () => {}
      : onScroll(({ velocity }) => {
          if (!visible || drag || !el.classList.contains('is-on')) return;
          s.va += Math.max(-1, Math.min(1, velocity * 0.03)) * 0.05;
          wake();
        });

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(tugs);
      resize.disconnect();
      seen.disconnect();
      offScroll();
      box.removeEventListener('pointerdown', onPointerDown);
      box.removeEventListener('pointermove', onPointerMove);
      box.removeEventListener('pointerup', onPointerUp);
      box.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('pointermove', onPointerMove);
      box.removeEventListener('touchstart', onTouchStart);
      box.removeEventListener('touchmove', onTouchMove);
      box.removeEventListener('touchend', onTouchEnd);
      box.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [url]);

  return (
    <div className="app-badge" ref={stage} aria-hidden="true">
      {children}
      <svg className="app-badge__strap">
        <path ref={left} id="strap-l" />
        <path ref={right} id="strap-r" />
        <text dominantBaseline="central">
          <textPath href="#strap-l">{STRAP}</textPath>
        </text>
        <text dominantBaseline="central">
          <textPath href="#strap-r">{STRAP}</textPath>
        </text>
      </svg>
      <div className="badge" ref={card}>
        <svg className="badge__clip" viewBox="0 0 40 44">
          <circle cx="20" cy="7" r="5.2" fill="none" stroke="#98a2b3" strokeWidth="2.8" />
          <rect x="13" y="11" width="14" height="15" rx="3.5" fill="#c4cbd7" />
          <rect x="15.5" y="13" width="3.5" height="11" rx="1.75" fill="#eef1f6" />
          <rect x="4" y="27" width="32" height="12" rx="3.5" fill="rgba(255,255,255,.6)" stroke="rgba(110,125,150,.55)" />
        </svg>
        <BadgeFace id="app-qr" />
      </div>
    </div>
  );
}
