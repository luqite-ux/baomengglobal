import 'server-only'
import { getProducts, type Product } from '@/lib/products'

type Row={slug:string;category_slug:string;name_i18n?:Record<string,string>;description_i18n?:Record<string,string>;overview_i18n?:Record<string,string>;image_url?:string;extra_data?:{images?:string[]}}
export async function getPublicProducts():Promise<Product[]>{
  const base=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,''),key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,tenant=process.env.NEXT_PUBLIC_TENANT_ID
  if(!base||!key||!tenant)return getProducts()
  try{const response=await fetch(`${base}/rest/v1/products?tenant_id=eq.${tenant}&is_active=eq.true&select=slug,category_slug,name_i18n,description_i18n,overview_i18n,image_url,extra_data&order=sort_order.asc`,{headers:{apikey:key,authorization:`Bearer ${key}`},cache:'no-store'});if(!response.ok)throw Error(`products ${response.status}`);const rows=await response.json() as Row[],fallback=new Map(getProducts().map(p=>[p.slug,p]));return rows.map(row=>{const known=fallback.get(row.slug);if(!known)return null;const image=row.image_url||row.extra_data?.images?.[0]||known.image;return{...known,category:row.category_slug as Product['category'],name:row.name_i18n?.en||known.name,summary:row.description_i18n?.en||known.summary,description:row.overview_i18n?.en||row.description_i18n?.en||known.description,image,images:[image,...(row.extra_data?.images||[]).filter(url=>url!==image)]}}).filter((x):x is NonNullable<typeof x>=>Boolean(x))}catch{return getProducts()}
}
export async function getPublicProduct(slug:string){return(await getPublicProducts()).find(p=>p.slug===slug)}
