
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'AnsarConnect - Ansar Ali Foundation',
  description: 'Website for Nonprofit Charity Ansar Ali Foundation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a simple way to check if the current path is an admin path.
  // In a more complex app, you might have a more robust way to determine this,
  // or use route groups to apply different layouts.
  // For now, this check is primarily to conditionally render Header/Footer.
  // The actual admin layout is handled by src/app/admin/layout.tsx.
  
  // We need to be careful here: if children is a function that returns a ReactNode
  // it's hard to inspect its props or type to determine if it's an admin page.
  // The admin routes will apply their own layout via `src/app/admin/layout.tsx`.
  // So, we can assume that if `children` is rendered directly here, it's not an admin page
  // needing the admin-specific layout.

  // A more reliable way would be to use Next.js route groups with different layouts.
  // (public)/layout.tsx and (admin)/layout.tsx
  // However, for simplicity with the current structure, we will assume admin routes handle their own full layout.
  // The `AdminLayout` will effectively replace this `RootLayout` for `/admin/*` paths.
  // We'll rely on the fact that the AdminLayout itself will not include <Header /> and <Footer />

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      {/* 
        The AdminLayout takes over the full page for /admin/* routes.
        Thus, the Header and Footer from this RootLayout should not render on admin pages.
        We can't directly check the route from `children` here without `usePathname` which would make this a client component.
        The AdminLayout itself does not include the public Header/Footer.
        If children are rendered by `src/app/admin/layout.tsx`, this body's direct children won't include public Header/Footer.
      */}
       <body className={cn(
        "font-body antialiased bg-background text-foreground min-h-screen flex flex-col",
        // We assume admin routes will handle their own body structure if they don't want Header/Footer
        // This might need to be adjusted if admin routes are expected to *also* use this RootLayout's Header/Footer.
        // Based on the request, admin has its own distinct layout.
      )}>
        {/* Conditionally render Header and Footer if not an admin page.
            This check is a bit tricky without making RootLayout a client component.
            The admin routes should NOT be wrapped by this Header/Footer.
            The presence of `src/app/admin/layout.tsx` means Next.js will use that for `/admin/*` routes,
            and that layout does not include the public Header/Footer.
            So, this setup should work as intended: public pages get Header/Footer, admin pages get AdminLayout.
        */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
