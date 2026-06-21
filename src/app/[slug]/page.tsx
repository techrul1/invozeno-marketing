import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createClient()
    const { data: page } = await supabase
      .from('cms_pages')
      .select('title, seo_title, seo_description, seo_keywords, og_image')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (!page) return {}

    return {
      title: page.seo_title || page.title,
      description: page.seo_description,
      keywords: page.seo_keywords,
      openGraph: page.og_image ? { images: [page.og_image] } : undefined,
    }
  } catch (err) {
    return {}
  }
}

export default async function DynamicCMSPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!page) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-background pt-24 pb-16">
      {page.hero_banner && (
        <div className="w-full h-64 md:h-96 relative mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={page.hero_banner} alt={page.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">{page.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        {!page.hero_banner && (
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{page.title}</h1>
        )}
        
        {page.featured_image && !page.hero_banner && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-sm border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.featured_image} alt={page.title} className="w-full h-auto" />
          </div>
        )}

        {/* Tiptap HTML Content */}
        <div 
          className="prose prose-slate dark:prose-invert max-w-none prose-img:rounded-xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: page.content || "" }}
        />
      </div>
    </article>
  )
}
