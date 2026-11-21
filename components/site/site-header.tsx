'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { getMainNav } from '@/lib/site'
import { getNavLabels } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const nav = getMainNav()
  const quoteLabel = getNavLabels().quote

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between gap-6 px-5 lg:px-10">
        <Logo priority />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav
              .filter((item) => item.href !== '/contact')
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center px-3.5 text-sm font-medium text-foreground/75 transition-colors hover:text-primary',
                      isActive(item.href) &&
                        'text-primary after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-0.5 after:bg-primary',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep sm:inline-flex"
          >
            {quoteLabel}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-border bg-background xl:hidden"
        >
          <ul className="mx-auto max-w-xl px-5 py-4">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-border/70">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'flex min-h-14 items-center justify-between text-xl font-medium tracking-tight',
                    isActive(item.href) && 'text-primary',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                href="/contact"
                className="flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-base font-semibold text-primary-foreground"
              >
                {quoteLabel}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
