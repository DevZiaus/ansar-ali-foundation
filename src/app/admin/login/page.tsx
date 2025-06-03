
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin');
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn('credentials', {
      redirect: false, // We'll handle redirection manually
      email,
      password,
    });

    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.error === 'CredentialsSignin' ? 'Invalid email or password.' : result.error,
      });
    } else if (result?.ok) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
      });
      router.push('/admin'); // Or router.replace('/admin')
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'An unknown error occurred. Please try again.',
      });
    }
    setIsLoading(false);
  };
  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <ShieldCheck className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-2">Checking authentication...</p>
      </div>
    );
  }

  if (status === 'authenticated') {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback, prevent rendering the form.
    return (
       <div className="flex items-center justify-center min-h-screen bg-background">
         <p>Redirecting to dashboard...</p>
       </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || status === 'loading'}>
              {isLoading || status === 'loading' ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
