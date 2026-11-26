import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { site } from '@/lib/site'
import { defaultLocale } from '@/lib/i18n'
import './globals.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans-face', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono-face', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Fasteners & Precision-Machined Parts, Taicang`,
    template: `%s | ${site.shortName}`,
  },
  description:
    'Taicang Baomeng Metal Products Co., Ltd. manufactures metal fasteners, precision-machined components and made-to-drawing non-standard metal parts. Send a drawing or sample to request a quote.',
  applicationName: site.shortName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: `${site.shortName} | Fasteners & Precision-Machined Parts`,
    description:
      'Metal fasteners, precision-machined components and made-to-drawing parts from Fuqiao Town, Taicang.',
    url: site.url,
    siteName: site.name,
    type: 'website',
    images: [{ url: '/banner/banner-3.jpg', width: 3840, height: 1600 }],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/brand/baomeng-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#fbf9f4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = [{
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo.src}`,
    email: site.email,
    telephone: site.phoneDisplay,
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressCountry: 'CN' },
  }, { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.shortName, publisher: { '@id': `${site.url}/#organization` } }]
  return (
    <html lang={defaultLocale} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.VERCEL && <Analytics />}
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID || "1dab4e8e-e541-4441-9f04-c20cb7db4e82")}`}
        />
      </body>
    </html>
  )
}
