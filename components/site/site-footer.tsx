import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { getMainNav, site } from '@/lib/site'
import { getCategories } from '@/lib/products'

export function SiteFooter() {
  const nav = getMainNav()
  const categories = getCategories()

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.name} manufactures metal fasteners, precision-machined components and made-to-drawing
            non-standard metal parts in Fuqiao Town, Taicang.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-foreground/80 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product categories">
          <h2 className="eyebrow">Products</h2>
          <ul className="mt-4 space-y-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products#${c.slug}`}
                  className="inline-flex min-h-11 items-center text-sm text-foreground/80 hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center text-sm text-foreground/80 hover:text-primary"
              >
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <address className="not-italic">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li className="flex gap-3 py-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>{site.address}</span>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex min-h-11 items-center gap-3 hover:text-primary"
              >
                <Phone className="size-4 shrink-0 text-primary" aria-hidden />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex min-h-11 items-center gap-3 hover:text-primary">
                <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                {site.email}
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p>baomengglobal.com</p>
        </div>
      </div>
    </footer>
  )
}
