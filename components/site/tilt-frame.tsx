'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Pointer-driven perspective tilt with an edge-light highlight. Fine pointers only; no continuous motion. */
export function TiltFrame({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const enabled = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !enabled()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg)`
    el.style.setProperty('--lx', `${x * 100}%`)
    el.style.setProperty('--ly', `${y * 100}%`)
    el.style.setProperty('--light', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.setProperty('--light', '0')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('relative transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--light, 0)',
          background:
            'radial-gradient(circle at var(--lx, 50%) var(--ly, 50%), oklch(1 0 0 / 0.55), transparent 55%)',
          mixBlendMode: 'soft-light',
        }}
      />
    </div>
  )
}
