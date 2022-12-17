import { withUrqlClient } from 'next-urql';
import { Layout } from "@/components/layouts";
import withSession from "@/src/hooks/withSession";
import { useState } from 'react';
import { ListInput, List, ListItem, Radio, Button, BlockTitle } from 'konsta/react';
import BloodgroupList from "@/components/bloodgroup/bloodgroupList";
import { UserLocation } from "@/components/icons";
import useSWR from 'swr';
import http, { client } from "@/src/lib/api";
import Loader from "@/components/loader";
import { useQuery } from 'urql';
import { DONORS_QUERY } from '../../src/graphql/queries';
import { getSession } from 'next-auth/react';
import { IUserSession } from '../../src/interfaces/IUser';
import { GetServerSideProps } from 'next';
import { initUrqlClient } from '@/src/urql/initUrql';
import jwt from 'jsonwebtoken'
function Donors({ data, role }) {
  const [result] = useQuery({ query: DONORS_QUERY });
  const { data: donorList, fetching, error: donorError } = result
  const [user, setUser] = useState({ fullname: "", role: "donor" });
  const { data: donors, error } = useSWR("/api/donors", client)
  const [loading, setloading] = useState(false)
  const [bloodgroup, setBloodgroup] = useState(null);
  const handleInput = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  if (fetching) return <p>loading...</p>
  console.log('donorList :>> ', donorList);
  let token
  token = localStorage.getItem('token');
  const secret = process.env.NEXTAUTH_SECRET
  console.log('process.env.NEXTAUTH_SECRET', secret)
  var decoded =  jwt.verify(token, secret);
  console.log('decoded', decoded)
  const handleBloodgroup = (e) => { setBloodgroup(e.target.value) };
  const handleRequest = async (id) => {
    const newRequest = {
      donor: id,
      acceptor: data.user.id,
      data: {
        action: "pending"
      }
    }
    const res = await http.post("/requests", newRequest)
      .then((res) => res.data)
      .catch((e) => { console.log(e.message) })
    if (res) {

    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

  }
  // if(fetching) return <div>loading....</div>
  // if(error) return <div>{error}</div>
  // console.log('donorList :>> ', donorList);
  // console.log('error :>> ', donorError);
  return <Layout title="Donors" role={role}>
    {user.fullname}
    <form className="flex flex-col" onSubmit={onSubmit}>
      <List strongIos insetIos>
        <ListInput type='text' onChange={handleInput} label="ولایت" name="city" outline />
        <BloodgroupList bloodgroup={bloodgroup} onChange={handleBloodgroup} />
        <Button disabled={loading} large colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} >جستجو</Button>
      </List>
    </form>
    <BlockTitle className="text-xl">لیست اهداکننده ها</BlockTitle>
    <List strongIos insetIos>
      {donors ?
        donors.map((item) => (
          <ListItem key={item.id}
            title={item.fullname}
            subtitle={<div className="flex flex-col gap-3">
              <p className="flex my-1"><UserLocation className="w-4 h-4" /> کابل</p>
              <p className="flex my-1">{item.bloodgroup} : گروپ خون: </p>
            </div>}
            text={
              <div className="mt-3 grid gap-3">
                <Button rounded colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} onClick={() => handleRequest(item.id)}>ارسال درخواست</Button>
              </div>
            }
          />
        ))
        : <Loader />}
      {error ? <div>{error}</div> : null}
    </List>
  </Layout>;
}

export default withSession(Donors);

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { ssrCache, urqlClient } = initUrqlClient();
//   //call episodes query here
//   const results : any = await urqlClient.query(DONORS_QUERY, {});
//   const { error } = results;
//   if (error) {
//     throw new Error(results.error.message);
//   }
//   return {
//     props: {
//       //just extract the ssrCache to pass the data to props
//       URQL_DATA: ssrCache?.extractData(),
//     },
//   };
// };