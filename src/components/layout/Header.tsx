
'use client'; 

import { usePathname } from 'next/navigation';
import { AppLogo } from './AppLogo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null; // Don't render public header on admin pages
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <AppLogo />
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
