import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1 className={cn("text-3xl font-headline font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center", className)}>
      {children}
    </h1>
  );
}
