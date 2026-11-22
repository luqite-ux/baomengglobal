'use client'

import { useEffect, useRef, useState } from 'react'
import { formatCount, interpolateCount } from '@/lib/count-up'

type CountUpMetricProps = {
  value: number
  decimals?: number
  rangeStart?: number
  suffix?: string
  label: string
}

const DURATION = 1200

export function CountUpMetric({
  value,
  decimals = 0,
  rangeStart,
  suffix = '',
  label,
}: CountUpMetricProps) {
  const elementRef = useRef<HTMLElement>(null)
  const frameRef = useRef<number | null>(null)
  const hasAnimated = useRef(false)
  const [currentValue, setCurrentValue] = useState(value)
  const [currentStart, setCurrentStart] = useState(rangeStart)

  const finalText = `${rangeStart === undefined ? '' : `${formatCount(rangeStart, decimals)}–`}${formatCount(value, decimals)}${suffix}`
  const visibleText = `${currentStart === undefined ? '' : `${formatCount(currentStart, decimals)}–`}${formatCount(currentValue, decimals)}${suffix}`

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        observer.disconnect()
        setCurrentValue(0)
        if (rangeStart !== undefined) setCurrentStart(0)

        const startedAt = performance.now()
        const tick = (now: number) => {
          const linearProgress = Math.min(1, (now - startedAt) / DURATION)
          const easedProgress = 1 - (1 - linearProgress) ** 3
          setCurrentValue(interpolateCount(value, easedProgress, decimals))
          if (rangeStart !== undefined) {
            setCurrentStart(interpolateCount(rangeStart, easedProgress, decimals))
          }
          if (linearProgress < 1) frameRef.current = requestAnimationFrame(tick)
        }
        frameRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [decimals, rangeStart, value])

  return (
    <strong
      ref={elementRef}
      aria-label={`${label}: ${finalText}`}
      className="block text-2xl tabular-nums text-primary lg:text-3xl"
    >
      <span aria-hidden="true">{visibleText}</span>
    </strong>
  )
}
