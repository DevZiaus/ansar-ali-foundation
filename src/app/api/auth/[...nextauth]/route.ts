
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // This is where you'd validate against your database
        // For this prototype, we'll use hardcoded credentials
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password') {
          // Any object returned will be saved in `user` property of the JWT
          return { id: '1', name: 'Admin User', email: 'admin@example.com' };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // You can add other properties from `user` to the token here
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // Add other properties to session.user from token here
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    // error: '/auth/error', // (optional) Error code passed in query string as ?error=
  },
  // Ensure NEXTAUTH_SECRET is set in your .env.local file
  secret: process.env.NEXTAUTH_SECRET,
  // Ensure NEXTAUTH_URL is set for production, and for development if behind a proxy.
  // NEXTAUTH_URL: process.env.NEXTAUTH_URL
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
