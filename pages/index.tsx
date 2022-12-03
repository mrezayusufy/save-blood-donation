
import { useRouter } from 'next/router';
import {  useSession } from 'next-auth/react';
import "react-slidy/lib/styles.css";
import Loader from '@/components/loader';
import HomePage from '@/components/home/HomePage';
import Splash from '@/components/home/Splash';

const Home = () => {
  const { data, status} = useSession();
  const router = useRouter();
  console.log(router.asPath);
  if(status === "loading") return <Loader/>;
  if(status === "authenticated") return <HomePage />
  if(status === "unauthenticated") return <Splash/>
}
export default Home;
