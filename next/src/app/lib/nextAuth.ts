import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs'
import prisma from "@/app/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        };
    }
  
    interface User {
        id: string;
        email: string;
    }
  
    interface JWT {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                  console.log("メールアドレスまたはパスワードがありません");
                  throw new Error('メールアドレスまたはパスワードが存在しません');
                }
                
                // メールアドレスに一致するユーザーをデータベースから取得
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
  
                // ユーザーが存在する場合
                if (user && user.hashedPassword) {
                    // パスワードを検証
                    const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                    if (isValid) {
                        return user;
                    } else {
                        throw new Error('パスワードが一致しません');
                    }
                }
          
                // 認証失敗
                throw new Error('ユーザーが見つかりません');
            },
        }),
    ],
    pages: {
        signIn: '/signIn',
        error: '/signIn',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                if (session.user) {
                    session.user.id = token.id as string;
                } else {
                    session.user = {
                        id: token.id as string,
                    };
                }
            }
            return session;
        },
    },
};