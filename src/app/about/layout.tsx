import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us',
  description:
    'Learn about SAI AGRO INDUSTRIES — our mission, ISO-certified bio-input manufacturing, sustainable agriculture vision, and commitment to empowering Indian farmers.',
  path: '/about',
  keywords: ['About Sai Agro Industries', 'bio fertilizer manufacturer India', 'sustainable agriculture company'],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
