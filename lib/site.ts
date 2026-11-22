import { getNavLabels, type Locale, defaultLocale } from '@/lib/i18n'

export const site = {
  name: 'Taicang Baomeng Metal Products Co., Ltd.',
  shortName: 'BAOMENG METAL',
  url: 'https://baomengglobal.com',
  founded: 2006,
  phoneDisplay: '+86 13671942302',
  phoneHref: 'tel:+8613671942302',
  email: 'info@baomengglobal.com',
  emailHref: 'mailto:info@baomengglobal.com',
  address: 'Fuqiao Town, Taicang, Jiangsu, China',
  area: '2,000 m²',
  areaSqm: 2000,
  monthlyCapacity: '1.2 million pieces',
  monthlyCapacityMillions: 1.2,
  maxMonthlyOrder: '500,000 pieces',
  leadTime: '15–60 days',
  leadTimeDays: [15, 60] as const,
  logo: { src: '/brand/baomeng-logo.png', width: 705, height: 620 },
} as const

export function getMainNav(locale: Locale = defaultLocale) {
  const t = getNavLabels(locale)
  return [
    { href: '/', label: t.home },
    { href: '/products', label: t.products },
    { href: '/applications', label: t.applications },
    { href: '/manufacturing', label: t.manufacturing },
    { href: '/quality', label: t.quality },
    { href: '/about', label: t.about },
    { href: '/news', label: t.news },
    { href: '/contact', label: t.contact },
  ]
}

export const media = {
  banners: [
    '/banner/banner-1.jpg',
    '/banner/banner-2.jpg',
    '/banner/banner-3.jpg',
  ],
  factoryEntrance: '/factory/factory-entrance.jpg',
  factoryWorkshop: '/factory/factory-workshop.jpg',
} as const
