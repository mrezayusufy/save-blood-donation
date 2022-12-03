import '../styles/globals.css';
import { AppProps } from 'next/app';
import { App, Page } from 'konsta/react';
import { SessionProvider } from 'next-auth/react';
import "../styles/flicity.css"

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

export default MyApp;
