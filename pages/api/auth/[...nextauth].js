import http from "@/src/lib/api";
import NextAuth, { Awaitable } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios'
export const nextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { phone, password, role, fullname } = credentials;
        if (role || fullname) {
          // register
          try {
            const newUser = {
              phone: phone,
              password: password,
              fullname: fullname,
              role: role,
            };
            const data = await axios.post("http://localhost:3000/api/register", newUser)
            .then((res) => res.data)
            .catch((error) => error.message);
            console.log('nextauth', data)
            return {
              id: data.user.id,
              jwt: data.jwt
            }
          } catch (error) {
            throw new Error(error);
          }

        } else {
          // login
          try {
            const { data } = await axios.post("http://localhost:3333/api/auth/local", {
              phone: phone,
              password: password,
            });
            const { user, jwt } = data;
            console.log('nextauth', data)
            return {
              id: user.id,
              jwt: jwt,
            }
          } catch (error) {
            throw new Error("رمز و یا شماره تلفن اشتباه است..");
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      try {
        session.user = token.user;
        return session;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async jwt({ token, user }) {
      try {
        user && (token.user = user)
        return token;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    redirect: async ({ baseUrl }) => {
      return baseUrl + "/profile";
    },
  },
  pages: {
    signIn: "/auth/signin", //Need to define custom login page (if using)
    newUser: "/profile"
  },
  secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(nextAuthOptions);
