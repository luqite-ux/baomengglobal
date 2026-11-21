import { defaultLocale, type Locale } from '@/lib/i18n'

export type NewsArticle = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  body: string[]
  coverImage?: string
  coverAlt?: string
}

/**
 * Replace the bodies of these functions with a CMS or database query.
 * The list and article routes already handle empty results.
 */
export async function getNewsArticles(_locale: Locale = defaultLocale): Promise<NewsArticle[]> {
  return []
}

export async function getNewsArticle(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<NewsArticle | null> {
  const articles = await getNewsArticles(locale)
  return articles.find((a) => a.slug === slug) ?? null
}
