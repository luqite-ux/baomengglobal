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
  companyGallery: [
    { src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/baomengglobal/company/02d2a1de8f404704c21b869a.jpg', alt: 'Baomeng office work area' },
    { src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/baomengglobal/company/1ed014e23eacae5e0809423c.jpg', alt: 'CNC machining area at Baomeng' },
    { src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/baomengglobal/company/d4fd6af4a7a1cdb653ec5cc4.jpg', alt: 'Metal forming workshop at Baomeng' },
    { src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/baomengglobal/company/61897464836dd0dd67400b0d.jpg', alt: 'Production equipment in Baomeng workshop' },
    { src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/baomengglobal/company/b666a9860f55a965224963ad.jpg', alt: 'Operator at metal forming equipment' },
    { src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/baomengglobal/company/27b1ed7de354072f294cc8cc.jpg', alt: 'Metal cutting and material storage area' },
  ],
} as const
