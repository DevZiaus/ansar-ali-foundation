
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/components/layout/AuthProvider';
// import { getServerSession } from "next-auth/next" // Not needed for client-side provider
// import { authOptions } from "./api/auth/[...nextauth]/route" // Not needed for client-side provider

export const metadata: Metadata = {
  title: 'AnsarConnect - Ansar Ali Foundation',
  description: 'Website for Nonprofit Charity Ansar Ali Foundation',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions); // getServerSession is for server components/pages
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true} className={cn(
        "font-body antialiased bg-background text-foreground min-h-screen flex flex-col"
      )}>
        <AuthProvider> {/* No need to pass session here if SessionProvider handles fetching it */}
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
