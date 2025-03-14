'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname === '/top') {
  // if (pathname === '/top' || pathname === '/createPost') {
    // /top のときはフッターを表示しない
    return null;
  }
  return <Footer />;
}