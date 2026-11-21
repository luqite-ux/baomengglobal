import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/products', '/applications', '/manufacturing', '/quality', '/about', '/news', '/contact']
  return [
    ...paths.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .7 })),
    ...getProducts().map(({ slug }) => ({ url: `${site.url}/products/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .8 })),
  ]
}
