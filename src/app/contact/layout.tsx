import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with SAI AGRO INDUSTRIES for product enquiries, agronomic consultation, bulk orders, and farmer support.',
  path: '/contact',
  keywords: ['contact Sai Agro Industries', 'agro product enquiry', 'agronomy support'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
