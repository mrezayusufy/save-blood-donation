import { Block, List, BlockTitle } from 'konsta/react';
import { Layout } from "../layouts";
import Carousel from "./carousel";
import ActivitiesCarousel from "./ActivitiesCarousel";
import useSWR from 'swr';
import withSession from "@/src/hooks/withSession";
import { client } from '../../src/lib/api';
import Loader from "../loader";
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from 'victory';
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
  const donorReport = [
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 8 },
  ]
  const acceptorReport = [
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 1 },
    { x: 3, y: 0 },
    { x: 4, y: 5 },
    { x: 5, y: 8 },
  ]
  return <Layout title='Home' role={role}>
    <Block>
      <Carousel />
    </Block>
    <BlockTitle>آمار استفاده کننده گان</BlockTitle>
    <List strongIos insetIos>
      <VictoryPie
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        data={[
          { x: 20, y: 35, label: " خون اهداءکننده گان" },
          { x: 33, y: 40, label: "خون گیرنده گان" },
        ]}
      />
    </List>
    <BlockTitle>آمار خون اهداءکننده گان</BlockTitle>
    <List strongIos insetIos>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{x:15}}
      >
        <VictoryBar
          style={{ data: { fill: "#89000e" } }}
          data={donorReport}
        />
      </VictoryChart>
    </List>
    <BlockTitle>آمار خون گیرنده گان</BlockTitle>
    <List strongIos insetIos>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{x: 15}}
      >
        <VictoryBar
          style={{ data: { fill: "#00892e" } }}
          data={acceptorReport}
        />
      </VictoryChart>
    </List>

    {/* {role === "acceptor" ? <DonorList/> : <AcceptorList/>} */}
  </Layout>
}

export default withSession(HomePage);