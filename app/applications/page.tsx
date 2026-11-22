import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { getApplications } from '@/lib/content'
import { getPublicProducts } from '@/lib/public-products'

export const metadata = { title: 'Applications', alternates: { canonical: '/applications' } }

export default async function ApplicationsPage() {
  const products = await getPublicProducts()

  return (
    <>
      <PageHero
        eyebrow="Application areas"
        title="Industrial parts matched to the assembly."
        text="Baomeng supplies fasteners and made-to-drawing machined parts for six stated industrial application areas."
      />
      <Reveal>
        <section className="mx-auto grid max-w-7xl gap-x-12 px-5 py-20 md:grid-cols-2 lg:px-8">
          {getApplications().map((application) => {
            const related = products.filter((product) => product.applications.includes(application.slug))
            return (
              <article key={application.slug} className="border-t py-10">
                <h2 className="text-2xl font-semibold">{application.name}</h2>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{application.summary}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {related.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary"
                    >
                      {product.name}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  ))}
                </div>
              </article>
            )
          })}
        </section>
      </Reveal>
    </>
  )
}
