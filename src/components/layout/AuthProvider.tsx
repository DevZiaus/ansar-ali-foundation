
'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
  session?: Session; // Making session optional as it might not be available during SSR for all pages
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
