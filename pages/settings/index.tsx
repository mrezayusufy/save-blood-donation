import { Layout } from "@/components/layouts";
import withSession from "@/src/hooks/withSession";
import { BlockHeader, BlockTitle, List, ListItem, Toggle } from "konsta/react";
import { useState } from "react";

function Settings({ data, role }) {
  const [active, setActive] = useState(false)
  return <Layout title="Settings" role={role}>
    <BlockTitle >نوتیفکیشن</BlockTitle>
    
    <BlockHeader>
      شما میتوانید نوتیفکیشن خویش را فعال یا غیر فعال کنید.
    </BlockHeader>
    <List strong inset>
      <ListItem
        label
        title={` ${active ? "فعال" : "غیر فعال"}`}
        className="rtl"
        after={
          <Toggle
            onChange={() => setActive((prev) => !prev)}
            component="div"
            name="active"
            value={active}
            checked={active === true}
          />
        }
      />
    </List>
  </Layout>;
}

export default withSession(Settings);