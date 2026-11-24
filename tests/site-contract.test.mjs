import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'

const root = new URL('../', import.meta.url)
const routeFiles = [
  'app/page.tsx',
  'app/products/page.tsx',
  'app/products/[slug]/page.tsx',
  'app/applications/page.tsx',
  'app/manufacturing/page.tsx',
  'app/quality/page.tsx',
  'app/about/page.tsx',
  'app/news/page.tsx',
  'app/contact/page.tsx',
]

test('all primary public routes have page modules', () => {
  for (const file of routeFiles) {
    assert.equal(existsSync(new URL(file, root)), true, `${file} is missing`)
  }
})

test('formal identity and task contact details are present', () => {
  const site = readFileSync(new URL('lib/site.ts', root), 'utf8')
  assert.match(site, /Taicang Baomeng Metal Products Co\., Ltd\./)
  assert.match(site, /info@baomengglobal\.com/)
  assert.match(site, /\+86 13671942302/)
})

test('public authored content contains no prohibited service promises', () => {
  const files = ['lib/site.ts', 'lib/products.ts', 'lib/content.ts']
  const prohibited = /warrant(?:y|ies)|guarantee(?:d)?|质保|保修|质量保证/iu
  for (const file of files) {
    const content = readFileSync(new URL(file, root), 'utf8')
    assert.doesNotMatch(content, prohibited, `${file} contains a prohibited promise`)
  }
})

test('public product pages consume tenant-scoped backend data', () => {
  const data = readFileSync(new URL('lib/public-products.ts', root), 'utf8')
  assert.match(data, /NEXT_PUBLIC_TENANT_ID/)
  assert.match(data, /tenant_id=eq\./)
  assert.match(data, /cache\s*:\s*['"]no-store['"]/)
})

test('homepage quality FAQ uses neutral order-specific facts without service promises', () => {
  const data = JSON.parse(readFileSync(new URL('../lib/home-quality-faq.json', import.meta.url), 'utf8'))
  assert.equal(data.items.length, 3)
  assert.deepEqual(data.items.map((item) => item.question), [
    'What should I include in an RFQ?',
    'Can you work from a drawing or sample?',
    'How is inspection scope confirmed?',
  ])
  assert.doesNotMatch(JSON.stringify(data), /warrant(?:y|ies)|guarantee(?:d)?|质保|保修|质量保证/iu)
  assert.match(data.summary, /order requirements/i)
})

test('indexable pages opt into large image previews for search results', () => {
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  assert.match(layout, /['"]max-image-preview['"]:\s*['"]large['"]/)
})

test('legacy favicon requests resolve to the adopted brand icon', () => {
  const config = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')
  assert.match(config, /source:\s*['"]\/favicon\.ico['"]/)
  assert.match(config, /destination:\s*['"]\/icon\.svg['"]/)
})

test('product imagery preserves complete part geometry', () => {
  for (const file of ['components/site/product-card.tsx', 'components/site/product-gallery.tsx']) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    assert.match(source, /object-contain/, `${file} must preserve the complete product`)
    assert.doesNotMatch(source, /object-cover/, `${file} must not hard-crop product geometry`)
  }
  const page = readFileSync(new URL('../app/products/[slug]/page.tsx', import.meta.url), 'utf8')
  assert.match(page, /<ProductGallery/)
})

test('product category links target real sections', () => {
  const footer = readFileSync(new URL('../components/site/site-footer.tsx', import.meta.url), 'utf8')
  const products = readFileSync(new URL('../app/products/page.tsx', import.meta.url), 'utf8')
  assert.match(footer, /href=\{`\/products#\$\{c\.slug\}`\}/)
  assert.match(products, /id=\{c\.slug\}/)
})

test('mobile navigation exposes the contact action once', () => {
  const header = readFileSync(new URL('../components/site/site-header.tsx', import.meta.url), 'utf8')
  assert.match(header, /mobileNav\s*=\s*nav\.filter\(\(item\)\s*=>\s*item\.href\s*!==\s*['"]\/contact['"]\)/)
  assert.match(header, /\{mobileNav\.map/)
})

test('footer does not append punctuation to the legal name', () => {
  const footer = readFileSync(new URL('../components/site/site-footer.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(footer, /\{site\.name\}\./)
})

test('hero transition does not crossfade overlapping copy blocks', () => {
  const hero = readFileSync(new URL('../components/home/hero-carousel.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(hero, /transition-\[opacity,visibility\]/)
  assert.match(
    hero,
    /active\s*\?\s*['"]block['"]\s*:\s*['"]hidden['"]/,
  )
})

test('couplings use the approved white-background product image', () => {
  const products = readFileSync(new URL('../lib/products.ts', import.meta.url), 'utf8')
  assert.equal(existsSync(new URL('../public/products/couplings-white-background.png', import.meta.url)), true)
  assert.match(products, /image:\s*['"]\/products\/couplings-white-background\.png['"]/)
  assert.doesNotMatch(products, /image:\s*['"]\/products\/couplings\.jpg['"]/)
})
