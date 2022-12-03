import { Block } from "konsta/react";
import { Layout } from "../layouts";
import Carousel from "./carousel";
import ActivitiesCarousel from "./ActivitiesCarousel";
import { fetchAPI } from "@/src/lib/api";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next/types";
import useSWR from 'swr';
import { getSession } from "next-auth/react";
// ----------------------------------------------------------------

const HomePage = () => {
  const { data, error } = useSWR(`clients`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <Layout title='Home' >
    <Block>
      <Carousel />
    </Block>
    {data.data.map((item) => (
      <div key={item.id}>{item.attributes.fullname}</div>
    ))}
    <ActivitiesCarousel />
    <section>requests</section>
    <section>donors</section>

  </Layout>
}

export default HomePage;
// ----------------------------------------------------------------
const fetcher = path => fetch("http://localhost:3333/api/"+path).then(r => r.json())


const accepters = async () => {
  const url = new URLSearchParams()
  url.set("filters[phone][$eq]", "0744227255")
  const res = await fetch("http://localhost:3333/api/accepters?" + url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET"
  });
  const data = await res.json();
  return data;
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession();
  const user = await accepters();
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/',
        permanent: false
      }
    }
  }
  return {
    props: { user }
  };
}
