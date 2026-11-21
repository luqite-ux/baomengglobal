import { NextResponse } from 'next/server'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { getAdminSupabase } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!tenantId || !secret) return NextResponse.json({ error: 'Inquiry service unavailable' }, { status: 503 })
  let body: Record<string, unknown>
  try { body = await request.json() as Record<string, unknown> } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
  const read = (key: string) => String(body[key] ?? '').trim()
  if (!read('name') || !read('email') || !read('message') || !read('product') || !read('quantity')) return NextResponse.json({ error: 'Required details are missing' }, { status: 400 })
  let captcha
  try {
    captcha = await verifyCaptchaSubmission({ secret, ...createSupabaseCaptchaContextFromEnv(), scope: read('captchaScope'), token: read('captchaToken'), answer: read('captchaAnswer') })
  } catch { return NextResponse.json({ error: 'Verification service unavailable' }, { status: 503 }) }
  if (!captcha.ok) return NextResponse.json({ error: 'Verification code is incorrect or expired', captchaCode: captcha.code }, { status: 400 })
  const details = [`Product: ${read('product')}`, `Quantity: ${read('quantity')}`, read('country') && `Country / region: ${read('country')}`, read('message')].filter(Boolean).join('\n')
  const { data, error } = await getAdminSupabase().from('inquiries').insert({ tenant_id: tenantId, name: read('name'), email: read('email'), phone: read('phone'), company: read('company'), subject: `RFQ: ${read('product')}`, message: details, status: 'unread' }).select('id').single()
  if (error) return NextResponse.json({ error: 'Unable to save inquiry' }, { status: 500 })
  const adminUrl = (process.env.HUANQIU_ADMIN_URL ?? process.env.NEXT_PUBLIC_ADMIN_URL)?.replace(/\/$/, '')
  const notifySecret = process.env.INQUIRY_NOTIFY_SECRET
  if (adminUrl && notifySecret) await fetch(`${adminUrl}/api/inquiries/notify`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${notifySecret}` }, body: JSON.stringify({ tenantId, inquiryId: data.id }), cache: 'no-store' }).catch(() => undefined)
  return NextResponse.json({ ok: true })
}
