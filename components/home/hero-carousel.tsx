'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

type Slide = {
  src: string
  alt: string
  eyebrow: string
  title: string
  body: string
  side: 'left' | 'right'
  cropClass: string
  primary: { href: string; label: string }
  secondary: { href: string; label: string }
}

const slides: Slide[] = [
  {
    src: '/banner/banner-1.jpg',
    alt: 'Modern industrial factory building with blue glass facade and a clean access road',
    eyebrow: 'Fasteners & precision parts',
    title: 'Engineered fasteners and precision parts.',
    body: 'M6–M12 hex flange bolts, Φ3–Φ12 rivets, Φ6–Φ12 ball studs, plus shafts, flanges and couplings, manufactured in Taicang since 2006.',
    side: 'left',
    cropClass: 'object-[82%_50%] lg:object-center',
    primary: { href: '/products', label: 'Explore products' },
    secondary: { href: '/contact', label: 'Request a Quote' },
  },
  {
    src: '/banner/banner-2.jpg',
    alt: 'Machining line with CNC lathes, robot arms and a conveyor of flange parts',
    eyebrow: 'Drawing to production',
    title: 'From drawing to repeatable production.',
    body: 'Send a drawing or sample. We review it, confirm MOQ and lead time, then make it with a stated capacity of 1.2 million pieces per month.',
    side: 'right',
    cropClass: 'object-[24%_50%] lg:object-center',
    primary: { href: '/manufacturing', label: 'See manufacturing' },
    secondary: { href: '/contact', label: 'Send a drawing' },
  },
  {
    src: '/banner/banner-3.jpg',
    alt: 'Bolts, shafts, flanges and gears arranged on a metal plate over technical drawings',
    eyebrow: 'Breadth and customization',
    title: 'Product breadth, made to your specification.',
    body: 'Standard-range fasteners and non-standard metal parts under one roof, customized to your drawing or sample.',
    side: 'left',
    cropClass: 'object-[76%_50%] lg:object-center',
    primary: { href: '/products', label: 'Browse the range' },
    secondary: { href: '/contact', label: 'Request a Quote' },
  },
]

const INTERVAL = 7000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [held, setHeld] = useState(false)
  const [reduced, setReduced] = useState(false)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const playing = !userPaused && !reduced
  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [])

  useEffect(() => {
    if (!playing || held) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => window.clearTimeout(id)
  }, [index, playing, held])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured manufacturing highlights"
      className="relative isolate w-full min-w-0 overflow-hidden bg-brand-deep text-primary-foreground"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return
        const dx = e.changedTouches[0].clientX - touchStart.current
        touchStart.current = null
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="grid min-w-0 touch-pan-y" aria-live={playing ? 'off' : 'polite'}>
        {slides.map((slide, i) => {
          const active = i === index
          const Heading = i === 0 ? 'h1' : 'h2'
          return (
            <article
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!active}
              className={cn(
                'col-start-1 row-start-1 flex min-w-0 flex-col transition-[opacity,visibility] duration-500 lg:relative lg:block lg:min-h-[clamp(560px,41vw,720px)]',
                active ? 'visible opacity-100' : 'invisible opacity-0',
              )}
            >
              <div className="relative h-72 overflow-hidden sm:h-80 lg:absolute lg:inset-0 lg:h-auto">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  quality={80}
                  sizes="100vw"
                  className={cn('object-cover', slide.cropClass, active && 'hero-depth-active')}
                />
                <div
                  aria-hidden
                  className={cn(
                    'absolute inset-0 hidden lg:block',
                    slide.side === 'left'
                      ? 'bg-gradient-to-r from-brand-deep/70 via-brand-deep/20 to-transparent'
                      : 'bg-gradient-to-l from-brand-deep/70 via-brand-deep/20 to-transparent',
                  )}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-deep to-transparent lg:hidden"
                />
              </div>

              <div className="relative z-10 mx-auto box-border w-screen min-w-0 max-w-[100vw] px-5 pb-4 pt-6 lg:flex lg:h-full lg:min-h-[inherit] lg:w-full lg:max-w-[88rem] lg:items-center lg:px-10 lg:pb-20 lg:pt-0">
                <div
                  key={active ? `on-${i}` : `off-${i}`}
                  className={cn(
                    'min-w-0 max-w-xl lg:max-w-[34rem]',
                    active && 'hero-copy',
                    slide.side === 'right' && 'lg:ml-auto',
                  )}
                >
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    {slide.eyebrow}
                  </p>
                  <Heading className="display mt-4 break-words text-[2.25rem] text-white sm:text-5xl lg:text-[4rem]">
                    {slide.title}
                  </Heading>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 lg:text-lg">{slide.body}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={slide.primary.href}
                      tabIndex={active ? 0 : -1}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-semibold text-brand-deep transition-colors hover:bg-accent"
                    >
                      {slide.primary.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      tabIndex={active ? 0 : -1}
                      className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/60 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="relative z-20 px-5 pb-6 pt-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-10 lg:pb-7 lg:pt-0">
        <div className="mx-auto flex max-w-[88rem] items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/50 bg-brand-deep/60 text-white backdrop-blur hover:bg-white hover:text-brand-deep"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/50 bg-brand-deep/60 text-white backdrop-blur hover:bg-white hover:text-brand-deep"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={playing ? 'Pause automatic slide rotation' : 'Start automatic slide rotation'}
            aria-pressed={!playing}
            disabled={reduced}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/50 bg-brand-deep/60 text-white backdrop-blur hover:bg-white hover:text-brand-deep disabled:opacity-50"
          >
            {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          </button>

          <div className="ml-3 flex items-center" role="group" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="group inline-flex h-11 w-9 items-center justify-center"
              >
                <span
                  className={cn(
                    'block h-1 rounded-full bg-white transition-all duration-300',
                    i === index ? 'w-8 opacity-100' : 'w-5 opacity-50 group-hover:opacity-80',
                  )}
                />
              </button>
            ))}
          </div>
          <p className="ml-auto font-mono text-xs tabular-nums text-white/80" aria-hidden>
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  )
}
