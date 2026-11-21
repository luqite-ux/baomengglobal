import { defaultLocale, pick, type Locale, type LocalizedContent } from '@/lib/i18n'

export type CategorySlug = 'fasteners' | 'precision-machined-parts'
export type ApplicationSlug =
  | 'automotive'
  | 'machinery-equipment'
  | 'electronics-electrical'
  | 'construction'
  | 'petroleum-chemical'
  | 'marine'

export type Category = {
  slug: CategorySlug
  name: string
  summary: string
  image: string
  imageAlt: string
}

export type Product = {
  slug: string
  category: CategorySlug
  name: string
  sizeLabel: string
  summary: string
  description: string
  image: string
  imageAlt: string
  applications: ApplicationSlug[]
  specs: { label: string; value: string }[]
  customization: string[]
}

const categories: LocalizedContent<Category[]> = {
  en: [
    {
      slug: 'fasteners',
      name: 'Fasteners',
      summary:
        'Hex flange self-tapping self-locking bolts, rivets and ball studs in stated size ranges, with drawing- or sample-led customization.',
      image: '/products/hex-flange-bolts.jpg',
      imageAlt: 'Hex flange bolts and hex head bolts laid out on a white background',
    },
    {
      slug: 'precision-machined-parts',
      name: 'Precision-Machined Parts',
      summary:
        'Shafts, flanges and couplings machined to your drawing or sample, from prototype quantities to repeat production.',
      image: '/products/shafts.jpg',
      imageAlt: 'Two machined steel shafts with grooves and a cross hole',
    },
  ],
}

const customization = [
  'Made to your drawing or physical sample',
  'Dimensions, material and finish confirmed in the quotation',
  'Inspection documentation scope agreed at RFQ stage',
]

const products: LocalizedContent<Product[]> = {
  en: [
    {
      slug: 'hex-flange-self-tapping-self-locking-bolts',
      category: 'fasteners',
      name: 'Hex Flange Self-Tapping Self-Locking Bolts',
      sizeLabel: 'M6–M12',
      summary: 'Hex flange bolts in the M6–M12 range, made for self-tapping and self-locking joints.',
      description:
        'A hex flange head spreads clamping load, and the self-tapping, self-locking design suits joints that must stay tight. Supplied in the M6–M12 range, with lengths, thread details and finish confirmed against your drawing.',
      image: '/products/hex-flange-bolts.jpg',
      imageAlt: 'Hex flange bolts, hex head bolts and T-head bolts, some with a coloured thread-locking patch',
      applications: ['automotive', 'machinery-equipment', 'construction'],
      specs: [
        { label: 'Type', value: 'Hex flange, self-tapping, self-locking' },
        { label: 'Size range', value: 'M6–M12' },
        { label: 'Length, material, finish', value: 'Per drawing or sample' },
        { label: 'Quantity', value: 'MOQ confirmed per specification' },
      ],
      customization,
    },
    {
      slug: 'rivets',
      category: 'fasteners',
      name: 'Rivets',
      sizeLabel: 'Φ3–Φ12',
      summary: 'Rivets in diameters from Φ3 to Φ12, produced to your drawing or sample.',
      description:
        'Rivets for permanent joints, supplied in diameters from Φ3 to Φ12. Head style, length and material are set by your drawing, so the part matches your assembly rather than a catalogue approximation.',
      image: '/products/rivets.jpg',
      imageAlt: 'Group of stepped brass-coloured rivets and pins of different diameters',
      applications: ['machinery-equipment', 'electronics-electrical', 'construction'],
      specs: [
        { label: 'Type', value: 'Rivets' },
        { label: 'Diameter range', value: 'Φ3–Φ12' },
        { label: 'Head style, length, material', value: 'Per drawing or sample' },
        { label: 'Quantity', value: 'MOQ confirmed per specification' },
      ],
      customization,
    },
    {
      slug: 'ball-studs',
      category: 'fasteners',
      name: 'Ball Studs',
      sizeLabel: 'Φ6–Φ12',
      summary: 'Ball studs in sizes from Φ6 to Φ12 for pivoting and linkage connections.',
      description:
        'Ball studs for pivot and linkage joints, supplied from Φ6 to Φ12. Stud form, thread and shoulder details are made to your drawing, with sample matching available.',
      image: '/products/ball-studs.jpg',
      imageAlt: 'Ball studs with hex collars and threaded or plain shanks arranged in groups',
      applications: ['automotive', 'machinery-equipment'],
      specs: [
        { label: 'Type', value: 'Ball studs' },
        { label: 'Size range', value: 'Φ6–Φ12' },
        { label: 'Stud form, thread, material', value: 'Per drawing or sample' },
        { label: 'Quantity', value: 'MOQ confirmed per specification' },
      ],
      customization,
    },
    {
      slug: 'shafts',
      category: 'precision-machined-parts',
      name: 'Precision-Machined Shafts',
      sizeLabel: 'Made to drawing',
      summary: 'Shafts machined to your drawing, with grooves, flats and cross holes as specified.',
      description:
        'Shafts machined from your drawing or sample, including features such as shoulders, grooves, flats and cross holes. Dimensions and tolerances are reviewed before quotation.',
      image: '/products/shafts.jpg',
      imageAlt: 'Two machined steel shafts, one with a flat end and a cross hole',
      applications: ['machinery-equipment', 'automotive', 'marine'],
      specs: [
        { label: 'Type', value: 'Precision-machined shafts' },
        { label: 'Dimensions, tolerances', value: 'Per drawing' },
        { label: 'Material, finish', value: 'Specified with RFQ' },
        { label: 'Quantity', value: 'MOQ confirmed per drawing' },
      ],
      customization,
    },
    {
      slug: 'flanges',
      category: 'precision-machined-parts',
      name: 'Precision-Machined Flanges',
      sizeLabel: 'Made to drawing',
      summary: 'Flanges and plate-style machined parts made to your drawing.',
      description:
        'Machined flanges and plate-style parts with bores, recesses and edge notches, produced from your drawing. Share the drawing and quantity to receive a quotation.',
      image: '/products/flanges.jpg',
      imageAlt: 'Rectangular machined steel flange plate with a large stepped circular bore',
      applications: ['machinery-equipment', 'petroleum-chemical', 'marine'],
      specs: [
        { label: 'Type', value: 'Precision-machined flanges' },
        { label: 'Dimensions, tolerances', value: 'Per drawing' },
        { label: 'Material, finish', value: 'Specified with RFQ' },
        { label: 'Quantity', value: 'MOQ confirmed per drawing' },
      ],
      customization,
    },
    {
      slug: 'couplings',
      category: 'precision-machined-parts',
      name: 'Precision-Machined Couplings',
      sizeLabel: 'Made to drawing',
      summary: 'Couplings and sleeves with keyways and claw profiles machined to your drawing.',
      description:
        'Couplings, jaw profiles and keyed sleeves machined from your drawing or sample. Bore, keyway and profile details are confirmed against your specification before production.',
      image: '/products/couplings.jpg',
      imageAlt: 'Black keyed sleeves surrounding a polished steel jaw coupling',
      applications: ['machinery-equipment', 'petroleum-chemical', 'marine'],
      specs: [
        { label: 'Type', value: 'Precision-machined couplings' },
        { label: 'Bore, keyway, profile', value: 'Per drawing' },
        { label: 'Material, finish', value: 'Specified with RFQ' },
        { label: 'Quantity', value: 'MOQ confirmed per drawing' },
      ],
      customization,
    },
  ],
}

export function getCategories(locale: Locale = defaultLocale) {
  return pick(categories, locale)
}

export function getProducts(locale: Locale = defaultLocale) {
  return pick(products, locale)
}

export function getProduct(slug: string, locale: Locale = defaultLocale) {
  return getProducts(locale).find((p) => p.slug === slug)
}

export function getProductsByCategory(category: CategorySlug, locale: Locale = defaultLocale) {
  return getProducts(locale).filter((p) => p.category === category)
}

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return value === 'fasteners' || value === 'precision-machined-parts'
}
