import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { media, site } from '@/lib/site'

export const metadata = { title: 'About', alternates: { canonical: '/about' } }

const facts = [
  ['Founded', String(site.founded)],
  ['Production area', site.area],
  ['Stated monthly capacity', site.monthlyCapacity],
  ['Stated lead time', site.leadTime],
] as const

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Baomeng"
        title="Metal parts manufacturing from Taicang, China."
        text={`${site.name} was founded in ${site.founded} and operates from Fuqiao Town, Taicang.`}
        action={{ href: '/contact', label: 'Contact the factory' }}
      />
      <Reveal>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <h2 className="display text-4xl">Focused on fasteners and precision-machined components.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The product scope covers hex flange self-tapping self-locking bolts, rivets, ball studs,
              shafts, flanges and couplings. Custom parts are reviewed from customer drawings or
              physical samples.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              The factory serves automotive, machinery, electrical, construction, process-equipment
              and marine applications. Material, finish, inspection scope, quantity and delivery are
              confirmed against each RFQ.
            </p>
            <dl className="mt-10 divide-y border-y">
              {facts.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr]">
                  <dt className="font-medium">{label}</dt>
                  <dd className="text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-96 overflow-hidden rounded-lg">
            <Image
              src={media.factoryEntrance}
              alt="Entrance to Taicang Baomeng Metal Products"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="border-y bg-secondary/55">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold">For standard-range fasteners</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Start with the stated diameter or thread range, then provide length, material, finish
                and quantity for confirmation.
              </p>
              <Link href="/products#fasteners" className="mt-5 inline-flex min-h-11 items-center font-medium text-primary">
                Review fasteners →
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">For made-to-drawing parts</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Send a drawing or sample for shafts, flanges and couplings. Dimensions, tolerances,
                material and finish are reviewed before quotation.
              </p>
              <Link href="/products#precision-machined-parts" className="mt-5 inline-flex min-h-11 items-center font-medium text-primary">
                Review machined parts →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  )
}
