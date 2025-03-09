'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname === '/top') {
    // /top のときはフッターを表示しない
    return null;
  }
  return <Footer />;
}