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
