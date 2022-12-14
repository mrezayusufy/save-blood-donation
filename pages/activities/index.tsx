import { UserLocation } from "@/components/icons";
import { Layout } from "@/components/layouts";
import withSession from "@/src/hooks/withSession";
import { BlockTitle, Button, List, ListItem } from "konsta/react";

function Activities({data, role}) {
  return <Layout title="Activities" role={role}>
    <BlockTitle>لیست فعالیت ها</BlockTitle>
    <List strongIos>
    <ListItem 
          title="علی احمد"
          subtitle={<div className="flex flex-col gap-3">
            <p className="flex my-1 dir:rtl"><UserLocation className="w-4 h-4" /> کابل</p>
            <p className="flex my-1 dir:rtl"> گروپ خون: A+ </p>
          </div>}
          text={
            <div className="mt-3 grid gap-3">
              <Button rounded colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} > درخواست ارسال شد!</Button>
            </div>
          }
        />
    <ListItem 
          title="محمد حسین"
          subtitle={<div className="flex flex-col gap-3">
            <p className="flex my-1 dir:rtl"><UserLocation className="w-4 h-4" /> کابل</p>
            <p className="flex my-1 dir:rtl"> گروپ خون: A+ </p>
          </div>}
          text={
            <div className="mt-3 grid gap-3">
              <Button rounded colors={{ fillBgIos: "bg-red-700", fillActiveBgIos: "bg-red-900" }} > درخواست رد شد!</Button>
            </div>
          }
        />
    </List>
  </Layout>;
}
export default withSession(Activities);