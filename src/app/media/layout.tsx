import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Media Gallery & Field Trials',
  description:
    'Watch factory tours, product demonstrations, and verified farmer field trial videos and photos from SAI AGRO INDUSTRIES.',
  path: '/media',
  keywords: ['Sai Agro media', 'field trial videos', 'bio fertilizer results'],
});

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
