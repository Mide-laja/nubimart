import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'Preserving Centuries of Craft: Inside the Kumasi Royal Kente Looms',
      category: 'Artisan Heritage',
      date: 'Oct 14, 2026',
      readTime: '6 min read',
      author: 'Amara Okonkwo',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
      excerpt: 'How generational weavers in Ghana are combining ancient double-weave looms with cross-border escrow trade to reach modern collectors in London and New York.',
    },
    {
      title: 'Why East African Nilotica Shea Outperforms Conventional Skincare Butters',
      category: 'Clean Beauty & Botanicals',
      date: 'Oct 09, 2026',
      readTime: '4 min read',
      author: 'Wanjiku Mwangi',
      image: 'https://images.unsplash.com/photo-1608248597359-5975459392e2?auto=format&fit=crop&w=800&q=80',
      excerpt: 'A deep biological dive into the olein composition of wildcrafted Ugandan and Kenyan Nilotica shea and why luxury dermatologists are paying close attention.',
    },
    {
      title: 'The Future of Split-Order Multi-Vendor Checkout in International Trade',
      category: 'Platform Architecture',
      date: 'Sep 28, 2026',
      readTime: '8 min read',
      author: 'David Sterling',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Examining how atomic database boundaries, independent sub-order tracking, and multi-currency escrow reduce buyer risk in international cross-border shopping.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-[#2f391c]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Marketplace Insights</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          NUBIMART Global Journal
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Stories of master craftsmanship, supply chain innovation, botanical wellness, and cross-border commerce trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((p) => (
          <article
            key={p.title}
            className="group bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] overflow-hidden shadow-sm hover:shadow-premium hover:border-slate-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-slate-100 dark:bg-[#1c2313] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-navy-950/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                  {p.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {p.date}
                  </span>
                  <span>&bull;</span>
                  <span>{p.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {p.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-[#262f17] mt-4">
              <span>By {p.author}</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Article &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
