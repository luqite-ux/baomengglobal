import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const admin = 'D:/Cursor/Grand/huanqiu-admin'
const source = 'E:/E暂存/1578-环球出海太仓宝萌金属服务群'
const tenantId = '1dab4e8e-e541-4441-9f04-c20cb7db4e82'
for (const file of [`${admin}/.env`, `${admin}/.env.local`]) {
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][\w]*)=(.*)$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '')
  }
}
const required = key => { if (!process.env[key]) throw Error(`Missing ${key}`); return process.env[key] }
const db = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
const s3 = new S3Client({ region: 'auto', endpoint: required('R2_S3_ENDPOINT'), requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', credentials: { accessKeyId: required('R2_ACCESS_KEY_ID'), secretAccessKey: required('R2_SECRET_ACCESS_KEY') } })
const bucket = required('R2_BUCKET_NAME')
const publicBase = required('R2_PUBLIC_URL_PREFIX').replace(/\/$/, '')
const products = {
  'hex-flange-self-tapping-self-locking-bolts': ['产品优化/紧固件/1-M6-M12六角法兰自攻自锁螺栓/图片2.jpg'],
  rivets: ['产品优化/紧固件/2-铆钉（Φ3-Φ12）/2.jpg'],
  'ball-studs': [],
  shafts: ['产品优化/精加工件/1-轴类/2.jpg'],
  flanges: ['产品优化/精加工件/2-法兰/2.jpg'],
  couplings: ['产品优化/精加工件/3-联轴器/2.jpg'],
}
const company = ['2.jpg', '3.jpg', '4.jpg', '6.jpg', '7.jpg', '8.jpg'].map(name => `公司图片/${name}`)
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const inspect = relative => { const path = join(source, relative); const bytes = readFileSync(path); return { relative, bytes, hash: sha(bytes), size: bytes.length } }
const sourceItems = Object.entries(products).flatMap(([slug, files]) => files.map(relative => ({ ...inspect(relative), slug })))
const companyItems = company.map(inspect)
const { data: rows, error } = await db.from('products').select('id,tenant_id,slug,image_url,extra_data').eq('tenant_id', tenantId).in('slug', Object.keys(products))
if (error) throw error
if (rows.length !== 6 || rows.some(row => row.tenant_id !== tenantId)) throw Error(`Product scope mismatch: ${rows.length}`)
console.log(JSON.stringify({ mode: process.argv.includes('--apply') ? 'apply' : 'inspect', tenantId, products: rows.map(row => ({ slug: row.slug, image_url: row.image_url, gallery_count: row.extra_data?.images?.length || 0 })), sources: sourceItems.map(({ relative, slug, hash, size }) => ({ relative, slug, sha256: hash, size })), company: companyItems.map(({ relative, hash, size }) => ({ relative, sha256: hash, size })) }, null, 2))
if (process.argv.includes('--apply')) {
async function upload(item, area) {
  const key = `tenants/baomengglobal/${area}/${item.hash.slice(0, 24)}${extname(item.relative).toLowerCase()}`
  const bytes = readFileSync(join(source, item.relative))
  if (sha(bytes) !== item.hash) throw Error(`Source changed: ${item.relative}`)
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: 'image/jpeg', CacheControl: 'public, max-age=31536000, immutable' }))
  const object = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  const remote = Buffer.from(await object.Body.transformToByteArray())
  if (sha(remote) !== item.hash) throw Error(`R2 mismatch: ${item.relative}`)
  const url = `${publicBase}/${key}`
  const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw Error(`Public media ${response.status}: ${item.relative}`)
  return { url, source: item.relative, sha256: item.hash, bytes: item.size }
}
const uploaded = {}
for (const item of sourceItems) (uploaded[item.slug] ||= []).push(await upload(item, `products/${item.slug}`))
const companyUploaded = []
for (const item of companyItems) companyUploaded.push(await upload(item, 'company'))
for (const row of rows) {
  const additions = (uploaded[row.slug] || []).map(item => item.url)
  const images = [row.image_url, ...additions]
  const extra_data = { ...row.extra_data, images, revision_source_media: uploaded[row.slug] || [] }
  const result = await db.from('products').update({ extra_data }).eq('id', row.id).eq('tenant_id', tenantId).eq('slug', row.slug).select('id,slug,image_url,extra_data').single()
  if (result.error) throw result.error
  if (JSON.stringify(result.data.extra_data.images) !== JSON.stringify(images)) throw Error(`Readback mismatch: ${row.slug}`)
}
const check = await db.from('products').select('slug,image_url,extra_data').eq('tenant_id', tenantId).in('slug', Object.keys(products))
if (check.error || check.data.length !== 6) throw Error('Final tenant readback failed')
console.log(JSON.stringify({ result: 'PASS', tenantId, products: check.data.map(row => ({ slug: row.slug, images: row.extra_data?.images || [] })), company: companyUploaded }, null, 2))
}
