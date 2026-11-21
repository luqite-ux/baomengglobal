import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('contact form mounts one independent image CAPTCHA and submits required buyer fields', () => {
  const source = read('components/inquiry-form.tsx')
  for (const field of ['name', 'email', 'company', 'phone', 'product', 'quantity', 'message']) assert.match(source, new RegExp(field))
  assert.match(source, /InquiryCaptchaField/)
  assert.match(source, /\/api\/inquiries/)
  const captcha = read('components/inquiry-captcha-field.tsx')
  for (const field of ['captchaScope', 'captchaToken', 'captchaAnswer']) assert.match(captcha, new RegExp(field))
})

test('inquiry route atomically verifies CAPTCHA before the only inquiry insert and notification', () => {
  const source = read('app/api/inquiries/route.ts')
  const verify = source.indexOf('verifyCaptchaSubmission')
  const guard = source.indexOf('if (!captcha.ok)')
  const insert = source.indexOf("from('inquiries').insert")
  const notify = source.indexOf('/api/inquiries/notify')
  assert.ok(verify >= 0 && guard > verify && insert > guard)
  assert.ok(notify === -1 || notify > insert)
  assert.equal((source.match(/from\('inquiries'\)\.insert/g) ?? []).length, 1)
})
