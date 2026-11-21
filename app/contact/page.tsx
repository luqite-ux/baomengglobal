import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { site } from '@/lib/site'
import { InquiryForm } from '@/components/inquiry-form'
export const metadata={title:'Contact'}
export default function ContactPage(){return <><PageHero eyebrow="Contact" title="Send your drawing and quantity for review." text="Include the part, dimensions, material, finish, quantity and required schedule. Baomeng will review the request before quotation."/><section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><h2 className="display text-4xl">Talk to Baomeng</h2><div className="mt-8 space-y-5">{[[Mail,site.email,site.emailHref],[Phone,site.phoneDisplay,site.phoneHref],[MapPin,site.address,'']].map(([Icon,label,href])=><div key={String(label)} className="flex items-start gap-4 rounded-lg border p-5"><Icon className="mt-1 size-5 text-primary"/><div>{href?<a className="font-medium hover:text-primary" href={String(href)}>{String(label)}</a>:<span className="font-medium">{String(label)}</span>}</div></div>)}</div></div><InquiryForm/></section></>}
