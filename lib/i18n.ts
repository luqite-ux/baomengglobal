export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export type LocalizedContent<T> = Partial<Record<Locale, T>> & Record<typeof defaultLocale, T>

/** Pick content for a locale and fall back to the default locale. Add new locales to `locales` and to each content map. */
export function pick<T>(content: LocalizedContent<T>, locale: Locale = defaultLocale): T {
  return content[locale] ?? content[defaultLocale]
}

const navigation = {
  en: {
    home: 'Home',
    products: 'Products',
    applications: 'Applications',
    manufacturing: 'Manufacturing',
    quality: 'Quality',
    about: 'About Us',
    news: 'News',
    contact: 'Contact',
    quote: 'Request a Quote',
  },
} satisfies LocalizedContent<Record<string, string>>

export function getNavLabels(locale: Locale = defaultLocale) {
  return pick(navigation, locale)
}
