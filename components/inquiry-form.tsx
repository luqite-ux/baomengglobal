'use client'
import { useState, type FormEvent } from 'react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

export function InquiryForm() {
  const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle')
  const [refreshKey,setRefreshKey]=useState(0)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form=event.currentTarget; setState('sending')
    const response=await fetch('/api/inquiries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))}).catch(()=>null)
    if(!response?.ok){setState('error');setRefreshKey(v=>v+1);return}
    form.reset();setState('success')
  }
  const input='min-h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring'
  return <form onSubmit={submit} className="grid gap-5 rounded-lg border bg-card p-6 sm:grid-cols-2 lg:p-8">
    <label className="grid gap-2 text-sm font-medium">Full name<input className={input} name="name" autoComplete="name" required/></label>
    <label className="grid gap-2 text-sm font-medium">Business email<input className={input} name="email" type="email" autoComplete="email" required/></label>
    <label className="grid gap-2 text-sm font-medium">Company<input className={input} name="company" autoComplete="organization"/></label>
    <label className="grid gap-2 text-sm font-medium">Phone / WhatsApp<input className={input} name="phone" type="tel" autoComplete="tel"/></label>
    <label className="grid gap-2 text-sm font-medium">Product / part<input className={input} name="product" required placeholder="Product name or drawing number"/></label>
    <label className="grid gap-2 text-sm font-medium">Required quantity<input className={input} name="quantity" required placeholder="e.g. 30,000 pieces"/></label>
    <label className="grid gap-2 text-sm font-medium sm:col-span-2">Country / region<input className={input} name="country" autoComplete="country-name"/></label>
    <label className="grid gap-2 text-sm font-medium sm:col-span-2">Requirements<textarea className={`${input} min-h-32 py-3`} name="message" required placeholder="Dimensions, material, finish, schedule and inspection documents"/></label>
    <InquiryCaptchaField refreshKey={refreshKey} className="sm:col-span-2"/>
    {state==='error'&&<p role="alert" className="text-sm text-destructive sm:col-span-2">The enquiry could not be sent. Your entries are preserved; refresh the image and try again.</p>}
    {state==='success'&&<p role="status" className="text-sm text-primary sm:col-span-2">Thank you. Your enquiry has been received.</p>}
    <button disabled={state==='sending'} className="min-h-11 rounded-sm bg-primary px-6 font-medium text-primary-foreground sm:col-span-2">{state==='sending'?'Sending…':'Send RFQ'}</button>
  </form>
}
