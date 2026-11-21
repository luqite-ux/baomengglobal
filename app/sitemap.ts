import type { MetadataRoute } from 'next'
import { getPublicProducts } from '@/lib/public-products'
import { site } from '@/lib/site'
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const products=await getPublicProducts(),paths=['','/products','/applications','/manufacturing','/quality','/about','/news','/contact'];return[...paths.map(path=>({url:`${site.url}${path}`,lastModified:new Date(),changeFrequency:path===''?'weekly' as const:'monthly' as const,priority:path===''?1:.7})),...products.map(({slug})=>({url:`${site.url}/products/${slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.8}))]}
