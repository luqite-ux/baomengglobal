import { PageHero } from '@/components/site/page-hero'
import { ProductCard } from '@/components/site/product-card'
import { getCategories, getProductsByCategory } from '@/lib/products'
export const metadata = { title: 'Products' }
export default function ProductsPage(){return <><PageHero eyebrow="Product range" title="Six product lines. Two focused capabilities." text="Choose stated size ranges for fasteners or send a drawing for precision-machined shafts, flanges and couplings." action={{href:'/contact',label:'Request a quotation'}}/><div className="mx-auto max-w-7xl space-y-20 px-5 py-20 lg:px-8">{getCategories().map(c=><section key={c.slug}><h2 className="display text-4xl">{c.name}</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{c.summary}</p><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{getProductsByCategory(c.slug).map(p=><ProductCard key={p.slug} product={p}/>)}</div></section>)}</div></>}
