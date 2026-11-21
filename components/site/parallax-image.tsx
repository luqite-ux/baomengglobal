'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  objectPosition?: string
}

/** Shallow scroll parallax. Disabled on small screens and with reduced motion. */
export function ParallaxImage({ src, alt, sizes, className, imageClassName, objectPosition }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return
    const desktop = window.matchMedia('(min-width: 1024px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!desktop.matches || reduced.matches) return

    let raf = 0
    let visible = false
    const update = () => {
      raf = 0
      const r = frame.getBoundingClientRect()
      const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      inner.style.transform = `translate3d(0, ${Math.max(-1, Math.min(1, progress)) * -22}px, 0) scale(1.1)`
    }
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) onScroll()
    })
    io.observe(frame)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={frameRef} className={cn('relative overflow-hidden', className)}>
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading="lazy"
          className={cn('object-cover', imageClassName)}
          style={{ objectPosition }}
        />
      </div>
    </div>
  )
}
