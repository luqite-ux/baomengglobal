'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Delay in ms, applied through a CSS variable. */
  delay?: number
  /** Animate descendants only (no opacity/translate on the wrapper). */
  plain?: boolean
}

/**
 * Hides content only when it starts below the fold, then reveals it when the
 * element actually intersects the viewport. Content is visible without JavaScript.
 */
export function Reveal({ children, as, className, delay = 0, plain = false }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) {
      el.dataset.reveal = 'shown'
      return
    }
    el.dataset.reveal = 'hidden'
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = 'shown'
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...(plain ? { 'data-reveal-plain': '' } : {})}
    >
      {children}
    </Tag>
  )
}
