import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'
export function ProductCard({ product }: { product: Product }) { return <Link href={`/products/${product.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[4/3] bg-white"><Image src={product.image} alt={product.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/></div><div className="flex flex-1 flex-col p-6"><p className="eyebrow">{product.sizeLabel}</p><h3 className="mt-3 text-xl font-semibold">{product.name}</h3><p className="mt-3 flex-1 leading-7 text-muted-foreground">{product.summary}</p><span className="mt-5 inline-flex items-center gap-2 font-medium text-primary">View details <ArrowUpRight className="size-4" /></span></div></Link> }
