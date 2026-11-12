import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Dealer & Distributorship Network',
  description:
    'Partner with SAI AGRO INDUSTRIES as an authorized agro dealer or distributor. Apply for dealership opportunities across India.',
  path: '/dealers',
  keywords: ['agro dealership', 'fertilizer distributorship', 'Sai Agro dealer network'],
});

export default function DealersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
