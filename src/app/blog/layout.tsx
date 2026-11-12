import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Agronomy Blog & Farming Guides',
  description:
    'Expert agronomy articles, crop nutrition guides, soil health tips, and bio-pest control insights for higher farm productivity.',
  path: '/blog',
  keywords: ['agronomy blog', 'crop nutrition tips', 'soil health', 'organic farming guide'],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
