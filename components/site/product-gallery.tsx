'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ProductGallery({ images, alt, name }: { images: string[]; alt: string; name: string }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
        <Image
          src={images[active]}
          alt={active === 0 ? `${alt} — view 1` : `${name} — view ${active + 1}`}
          fill
          className="object-contain"
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3" aria-label="Product image gallery">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show product image ${index + 1} of ${images.length}`}
              aria-pressed={active === index}
              className={`relative size-20 overflow-hidden rounded-md border bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${active === index ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
            >
              <Image src={src} alt="" fill className="object-contain" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
