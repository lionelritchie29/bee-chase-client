import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SessionUser } from '../../../models/SessionUser';
import { AuthService } from '../../../services/AuthService';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credential',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials as any;
          if (!username || !password) {
            throw new Error('Username and password must be filled');
          }

          const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
          const API_URL = `${BASE_API_URL}/auth/login`;
          const response = await axios.post(API_URL, { username, password });
          const user: SessionUser = response.data;

          return user;
        } catch (e: any) {
          throw new Error(e.response.data.errors.API);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      await validateAccessToken(token as SessionUser);

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      await validateAccessToken(token as SessionUser);
      return session;
    },
  },
};

async function validateAccessToken(user: SessionUser) {
  const accessToken = user.access_token;
  const authService = new AuthService(accessToken);
  return await authService.getCurrentUser();
}

export default NextAuth(authOptions);
