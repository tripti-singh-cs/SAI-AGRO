import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Dosage & Land Area Calculator',
  description:
    'Calculate exact bio-fertilizer, micronutrient, and plant growth promoter dosage based on your crop, acreage, and application method.',
  path: '/calculator',
  keywords: ['fertilizer dosage calculator', 'crop dosage calculator', 'acreage calculator'],
});

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
