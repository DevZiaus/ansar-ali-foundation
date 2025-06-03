import Link from 'next/link';
import Image from 'next/image';

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="/logo.png"
        alt="Ansar Ali Foundation Logo"
        width={65}
        height={65}
        priority // Good for LCP elements like logos
        data-ai-hint="foundation logo"
      />
    </Link>
  );
}
