
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Home, Settings, CreditCard, Image as ImageIcon, MessageSquare, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { AppLogo } from '@/components/layout/AppLogo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/site-settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/payment-methods', label: 'Payment Methods', icon: CreditCard },
  { href: '/admin/media-management', label: 'Media Management', icon: ImageIcon },
  { href: '/admin/contact-submissions', label: 'Contact Submissions', icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (!authStatus && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (!isClient || (!isAuthenticated && pathname !== '/admin/login')) {
    // Display a loading state or null while checking auth, or if redirecting
    // For login page, we don't want to show the admin layout
    if (pathname === '/admin/login' && !isAuthenticated) {
        return <>{children}</>;
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <ShieldCheck className="w-12 h-12 animate-spin text-primary" />
        </div>
    );
  }

  if (pathname === '/admin/login' && isAuthenticated) {
     // If authenticated and on login page, redirect to admin dashboard
     router.replace('/admin');
     return (
        <div className="flex items-center justify-center min-h-screen">
            <ShieldCheck className="w-12 h-12 animate-spin text-primary" />
        </div>
     );
  }
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }


  const AdminNavLinks = ({isMobile = false}: {isMobile?: boolean}) => (
    <nav className={cn("flex flex-col gap-2", isMobile ? "p-4" : "p-2")}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} legacyBehavior>
          <a
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === item.href && "bg-muted text-primary font-semibold",
              isMobile && "text-base"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        </Link>
      ))}
    </nav>
  );


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <AppLogo /> <span className="text-sm text-muted-foreground">Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <AdminNavLinks />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-14 items-center border-b px-4">
                 <AppLogo /> <span className="text-sm text-muted-foreground ml-2">Admin</span>
              </div>
              <AdminNavLinks isMobile={true} />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Optional: Add search or other header elements */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="person avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/')}>View Public Site</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
