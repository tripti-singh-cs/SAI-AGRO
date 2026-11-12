import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Agro & Bio-Crop Products',
  description:
    'Explore our complete range of bio-fertilizers, plant growth promoters, chelated micronutrients, bio-fungicides, and organic soil conditioners.',
  path: '/products',
  keywords: ['bio fertilizers', 'plant growth promoters', 'micronutrients', 'bio fungicides', 'soil conditioners'],
});

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
