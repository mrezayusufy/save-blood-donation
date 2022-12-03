import { fetchAPI } from "@/src/lib/api";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcrypt";
type UserType = {
  id: string;
  fullname?: string;
  phone?: string;
  role?: string;
};
type ErrorType = {
  id: string;
  message: string;
  status: number;
};
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req): Promise<UserType | ErrorType> => {
 
        // axios
        const $axios = axios.create();
        $axios.defaults.baseURL = "http://localhost:3333/api";

        try {
          const { phone, password } = credentials as {
            phone: string;
            password: string;
            role: string;
            fullname: string;
          };

          const { data } = await $axios.get("/clients/phone/" + phone);

          /**
           * sign in a user
           * params: phone, password
           */
          if (data) {
            const { id, attributes } = data;
            const {
              password: clientPassword,
              fullname: clientFullname,
              phone: clientPhone,
              role: clientRole,
            } = attributes;
            const checkPassword = await bcrypt.compare(
              password,
              clientPassword
            );
            if (checkPassword)
              return {
                id,
                fullname: clientFullname,
                role: clientRole,
                phone: clientPhone,
              };
            else throw new Error("password mismatch.");
          }
        } catch (error) {
          throw new Error("error:" + error.message);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token.user; // Setting token in session
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin", //Need to define custom login page (if using)
  },
  secret: process.env.SECRET,
});
