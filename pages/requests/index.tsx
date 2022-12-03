import { Layout } from "@/components/layouts";
import { BlockTitle, Button, Card, List, ListItem } from "konsta/react";
import { UserLocation } from '../../components/icons';

export default function Requests() {
  const role = "ACCEPTOR"
  return <Layout title="Requests">
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
