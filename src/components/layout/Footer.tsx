
'use client';

import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null; // Don't render public footer on admin pages
  }

  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-primary" /> by Ansar Ali Foundation
        </p>
        <p>&copy; {currentYear} AnsarConnect. All rights reserved.</p>
      </div>
    </footer>
  );
}
