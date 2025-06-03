
'use client';

import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useEffect and useState

export function Footer() {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState<number | null>(null); // State for year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear()); // Set year client-side after mount
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null; // Don't render public footer on admin pages
  }

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-lg text-muted-foreground">
        <p className="flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-primary" /> by {' '} <a className='text-[#0095da] hover:text-[#e68324] transition-colors duration-300' href="https://devziaus.xyz" target="_blank" rel="noopener noreferrer">DevZiaus</a>
        </p>
        {/* Render copyright with year only when currentYear is available */}
        {currentYear !== null ? (
          <p>&copy; {currentYear} Ansar Ali Foundation. All rights reserved.</p>
        ) : (
          // Fallback or placeholder if currentYear is not yet set
          <p>&copy; Ansar Ali Foundation. All rights reserved.</p>
        )}
      </div>
    </footer>
  );
}
