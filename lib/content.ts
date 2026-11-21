import { defaultLocale, pick, type Locale, type LocalizedContent } from '@/lib/i18n'
import type { ApplicationSlug } from '@/lib/products'

export type ApplicationInfo = {
  slug: ApplicationSlug
  name: string
  summary: string
}

const applications: LocalizedContent<ApplicationInfo[]> = {
  en: [
    {
      slug: 'automotive',
      name: 'Automotive',
      summary: 'Flange bolts, ball studs and machined shafts for vehicle assemblies that need repeatable parts.',
    },
    {
      slug: 'machinery-equipment',
      name: 'Machinery & Equipment',
      summary: 'Fasteners, shafts, flanges and couplings for machine builds and equipment maintenance.',
    },
    {
      slug: 'electronics-electrical',
      name: 'Electronics & Electrical',
      summary: 'Small-diameter rivets and pins for electrical and electronic assemblies.',
    },
    {
      slug: 'construction',
      name: 'Construction',
      summary: 'Bolts and rivets for structural and building-related fixing.',
    },
    {
      slug: 'petroleum-chemical',
      name: 'Petroleum & Chemical',
      summary: 'Machined flanges and couplings for process equipment, made to your drawing.',
    },
    {
      slug: 'marine',
      name: 'Marine',
      summary: 'Shafts, flanges and couplings machined for marine equipment requirements.',
    },
  ],
}

export type FaqItem = { q: string; a: string }

const faq: LocalizedContent<FaqItem[]> = {
  en: [
    {
      q: 'What specifications do you supply?',
      a: 'Fasteners are supplied as M6–M12 hex flange self-tapping self-locking bolts, Φ3–Φ12 rivets and Φ6–Φ12 ball studs. Shafts, flanges and couplings are machined to your drawing.',
    },
    {
      q: 'Can you make parts to my drawing or sample?',
      a: 'Yes. Customization is drawing- or sample-led. Send a drawing, a sample photo or both with your quantity, and we will review it for a quotation.',
    },
    {
      q: 'What is your minimum order quantity?',
      a: 'The stated MOQ is 30,000 pieces for fasteners and 500 pieces for precision-machined parts. Final quantity requirements are confirmed against the specific drawing or sample.',
    },
    {
      q: 'How long does a sample take?',
      a: 'The stated sample time is 40–60 days for fasteners and 7–10 days for precision-machined parts, subject to confirmation after the drawing or sample is reviewed.',
    },
    {
      q: 'What is the production lead time?',
      a: 'Our stated lead time is 15–60 days, depending on the part, quantity and finishing requirements.',
    },
    {
      q: 'Can I get progress updates during production?',
      a: 'Tell us in your enquiry how you would like to follow progress, and we will arrange updates for your order.',
    },
    {
      q: 'How is quality controlled?',
      a: 'Parts are checked against your drawing during production and before shipment. ISO 9001 is stated in our company information. Inspection scope is agreed with you at quotation stage.',
    },
    {
      q: 'Can you provide technical or inspection reports, or accept third-party inspection?',
      a: 'State the documents you need, or your third-party inspection requirement, in your RFQ so they can be confirmed with the quotation.',
    },
    {
      q: 'Which industries use your parts?',
      a: 'Our parts are used in automotive, machinery and equipment, electronics and electrical, construction, petroleum and chemical, and marine applications.',
    },
  ],
}

export function getApplications(locale: Locale = defaultLocale) {
  return pick(applications, locale)
}

export function getFaq(locale: Locale = defaultLocale) {
  return pick(faq, locale)
}

export type ProcessStep = { title: string; text: string }

const process: LocalizedContent<ProcessStep[]> = {
  en: [
    { title: 'Drawing or sample', text: 'Send a drawing, a sample or both with your quantity and requirements.' },
    { title: 'Review & quotation', text: 'We review dimensions, material and finish, then confirm MOQ and lead time.' },
    { title: 'Forming & machining', text: 'Fasteners and precision parts are produced to your specification.' },
    { title: 'Inspection', text: 'Parts are checked against the drawing, with documentation as agreed.' },
    { title: 'Delivery', text: 'Packed and shipped within the confirmed 15–60 day lead time.' },
  ],
}

export function getProcess(locale: Locale = defaultLocale) {
  return pick(process, locale)
}
