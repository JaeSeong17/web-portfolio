import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/libs/prismadb';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // 인증 정보 구조
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        // Error handler: 입력 정보에 이메일, 비밀번호 중 누락된 정보가 있을 경우
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // 입력된 메일 정보로 회원 정보 찾기
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Error handler: 해당 메일 계정 없는 경우 or 계정 정보의 비밀번호가 누락된 경우
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // 비밀번호 비교
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // Error handler: 비밀번호 불일치
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
