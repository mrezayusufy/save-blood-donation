import bloodgroups from "@/src/lib/bloodgroups";
import { List } from "konsta/react";
import BloodgroupItem from "./bloodgroupItem";

export default ({bloodgroup,...props}) => {
  return <List strongIos insetIos className='[&>ul]:grid [&>ul]:grid-flow-col [&>ul]:grid-cols-4 [&>ul]:grid-rows-2'>
    {bloodgroups.map((item, index) => (
      <BloodgroupItem item={item} key={index} bloodgroup={bloodgroup} {...props} />
    ))}
  </List>;
}