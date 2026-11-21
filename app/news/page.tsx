import { PageHero } from '@/components/site/page-hero'
export const metadata={title:'News'}
export default function NewsPage(){return <><PageHero eyebrow="Company news" title="Technical and company updates." text="This section is ready for verified company news and technical articles managed through the content system."/><section className="mx-auto max-w-4xl px-5 py-24 text-center"><h2 className="text-2xl font-semibold">No articles published yet</h2><p className="mt-4 text-muted-foreground">New verified updates will appear here after publication.</p></section></>}
