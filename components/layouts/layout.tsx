import Header from './header';
import Footer from './footer';
import Head from 'next/head';

export default function Layout({ children, title="Save", back = false, role }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header back={back}/>
      <main className='my-12 container mx-auto max-w-[320px]'>{children}</main>
      <Footer role={role}/>
    </>
  );
}
