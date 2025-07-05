import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomSession = {
    user?: CustomUser;
    expires: string;
};

export type CustomUser = {
    id: string | null;
    name: string | null;
    email: string | null;
    token: string | null;
};

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET, 
    callbacks: {
        async session({
            session,
            token,
        }: {
            session: CustomSession;
                token: JWT;
        }) {
            session.user = token.user as CustomUser;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }

            return token;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { data } = await axios.post(LOGIN_URL, credentials);
                    console.log("data: ", data)
                    const user: CustomUser = data?.data;

                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Login failed", error);
                    return null;
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
