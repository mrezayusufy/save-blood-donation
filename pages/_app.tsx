import '../styles/globals.css';
import { AppProps } from 'next/app';
import { App, Page } from 'konsta/react';
import { SessionProvider, getSession } from 'next-auth/react';
import "../styles/flicity.css"
import jwt from 'jsonwebtoken'
// import UrqlProvider from "@/src/urql/UrqlProvider";
import { withUrqlClient } from 'next-urql';
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
        <App theme="ios" dir='rtl' lang='fa'>
          <Page>
            <Component {...pageProps} />
          </Page>
        </App>
      </SessionProvider>
  );
}
const withUrql = withUrqlClient ((_ssrExchange, ctx) => ({
  url: 'http://localhost:3333/graphql',
  fetchOptions: () =>{
    try {
      let jwt
      jwt = localStorage.getItem('token');
      // var decoded = jwt.verify(jwt, process.env.NEXTAUTH_SECRET);
      // jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsImlhdCI6MTY3MDk5MTQwNiwiZXhwIjoxNjczNTgzNDA2fQ.l0Bs9t_otuoCXkUYnJC4hyQdd73Jc2mJ-iCztFVDmd0"
      return {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
    } catch (error) {
      throw new Error("no token")
    }
  }
}));
export default withUrql(MyApp);
