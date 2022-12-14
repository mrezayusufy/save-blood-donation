import { Layout } from "@/components/layouts";
import withSession from "@/src/hooks/withSession";
import { BlockTitle, Button, Card, List, ListItem } from "konsta/react";
import { UserLocation } from '../../components/icons';

const Requests = ({data, role})=> {
  return <Layout title="Requests" role={role}>
    <BlockTitle className="text-xl mb-4">لیست درخواست ها</BlockTitle>
    <List strongIos>
      <ListItem
        title="علی رضای"
        subtitle={<p className="flex my-1"><UserLocation className="w-4 h-4"/> کابل</p>}
        text={
          <div className="mt-3 flex gap-3">
            <Button rounded colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} >تایید درخواست</Button>
            <Button rounded>رد درخواست</Button>
          </div>
        }
      />
      <ListItem
        title="علی مهدی"
        subtitle={<p className="flex my-1"><UserLocation className="w-4 h-4"/> کابل</p>}
        text={
          <div className="mt-3 flex gap-3">
            <Button rounded colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} >تایید درخواست</Button>
            <Button rounded>رد درخواست</Button>
          </div>
        }
      />
      
      
    </List>
  </Layout>;
}
export default withSession(Requests);