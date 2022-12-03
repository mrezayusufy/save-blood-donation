import { Button } from "konsta/react";
import { signIn } from "next-auth/react";
import Head from "next/head";

const Splash = () => {
  return <div>
    <Head>
      <title>Welcome page</title>
    </Head>
    <main className='my-12 container mx-auto max-w-[320px]' >
      <Button onClick={() => signIn()}>sign in</Button>
    </main>
  </div>
}
export default Splash;