import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InActiveError, InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          url: `${process.env.NEXT_PUBLIC_BE_URL}/auths/login`,
          method: "POST",
          body: {
            username: credentials.email,
            password: credentials.password,
          },
        });

        if (res.statusCode === 201) {
          return {
            email: res.data?.user?.email,
            name: res.data?.user?.name,
            _id: res.data?.user?._id,
            role: res.data?.user?.role,
            access_Token: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InActiveError();
        } else {
          throw new Error("Server error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },

    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: "/auths/login",
  },
});
