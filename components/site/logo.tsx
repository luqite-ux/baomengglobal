import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} - Home`}
      className={cn('inline-flex min-h-11 items-center', className)}
    >
      <Image
        src={site.logo.src}
        width={site.logo.width}
        height={site.logo.height}
        alt={`${site.shortName} - Fasteners & Precision Parts`}
        priority={priority}
        sizes="64px"
        className="h-12 w-auto object-contain"
      />
    </Link>
  )
}
