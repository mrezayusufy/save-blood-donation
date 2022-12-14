import { Block, List, BlockTitle } from 'konsta/react';
import { Layout } from "../layouts";
import Carousel from "./carousel";
import ActivitiesCarousel from "./ActivitiesCarousel";
import useSWR from 'swr';
import withSession from "@/src/hooks/withSession";
import { client } from '../../src/lib/api';
import Loader from "../loader";
// ----------------------------------------------------------------
const HomePage = ({ role }) => {
  const { data: donors, error: E_Donors } = useSWR("/api/donors", client)
  const { data: acceptors, error: E_Acceptors } = useSWR("/api/acceptors", client)
  const DonorList = () => (
    <>
    <BlockTitle>لیست اهداکنندگان</BlockTitle>
    <List strongIos insetIos>
      {donors ? donors.map(donor => (
        <div className="flex flex-row justify-between p-3">
          <p>{donor.fullname}</p>
          <p>A+</p>
        </div>
      )) : <Loader />}
    </List>
    </>
  )
  const AcceptorList = () => (
    <>
    <BlockTitle>لیست درخواست کنندگان</BlockTitle>
    <List strongIos insetIos>
      {acceptors ? acceptors.map(item => (
        <div className="flex flex-row justify-between p-3">
          <p>{item.fullname}</p>
          <p>کابل</p>
        </div>
      )) : <Loader />}
    </List>
    </>
  )

  return <Layout title='Home' role={role}>
    <Block>
      <Carousel />
    </Block>
    {role === "acceptor" ? <DonorList/> : <AcceptorList/>}
  </Layout>
}

export default withSession(HomePage);