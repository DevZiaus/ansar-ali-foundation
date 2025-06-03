import Link from 'next/link';

export function AppLogo() {
  return (
    <Link href="/" className="text-2xl font-headline font-bold text-primary hover:opacity-80 transition-opacity">
      AnsarConnect
    </Link>
  );
}
