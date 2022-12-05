import { Layout } from "@/components/layouts";
import withSession from "@/src/hooks/withSession";
import { Block, BlockHeader, BlockTitle, List, ListItem, Toggle, Button, Dialog, DialogButton } from "konsta/react";
import { useState } from "react";
import UserPopup from "@/components/profile/UserPopup";
import LogoutIcon from "@/components/icons/logout-circle-line";
import { signOut } from "next-auth/react";
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory';
const dataChart = [
  { x: "حمل", y: 2 },
  { x: "ثور", y: 3 },
  { x: "جوزا", y: 1 },
  { x: "سرطان", y: 0 },
  { x: "اسد", y: 0 },
  { x: "سنبله", y: 0 },
  { x: "میزان", y: 0 },
  { x: "عقرب", y: 3 },
  { x: "قوس", y: 0 },
  { x: "جدی", y: 0 },
  { x: "دلو", y: 2 },
  { x: "حوت", y: 1 },
]
function Profile({ data }) {
  const [userStatus, userUserStatus] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const user = {
    id: "1",
    fullname: "علی",
    location: "کابل",
    gender: "MALE",
    phone: "0744227255",
    age: "20",
    password: "123578",
    bloodgroup: "A+",
    status: false,
  }
  const [userInfo, setUserInfo] = useState({
    fullname: user.fullname,
    password: user.password,
    phone: user.phone,
    age: user.age,
    location: user.location,
    gender: user.gender,
    bloodgroup: user.bloodgroup,
    status: user.status,
  });

  const hanldeOnChange = (e) => {
    setUserInfo({...userInfo, status: !userInfo.status});
  }
  return <Layout title="profile">
    <Block className="flex justify-between items-center py-3">
      <b>{userInfo.fullname}</b>
      <div>
        <Button rounded onClick={() => setPopupOpen(true)}><PenIcon/>تغییر اطلاعات</Button>
      </div>
    </Block>
    <Block strong inset>
      <VictoryChart>
        <VictoryArea
          interpolation="natural"
          data={dataChart}
          style={{
            data: { fill: "#f90000" },
          }}
        />
        <VictoryAxis
          label="ماهانه"
          style={{
            axisLabel: { padding: 30 }
          }}
        />
        <VictoryAxis dependentAxis
          label="دفعات"
          style={{
            axisLabel: { padding: 40 }
          }}
        />
      </VictoryChart>
    </Block>
    <BlockTitle >وضعیت</BlockTitle>

    <BlockHeader>
      شما میتوانید وضعیت خویش برای اهدای خون فعال یا غیر فعال کنید.
    </BlockHeader>
    <List strong inset>
      <ListItem
        label
        title={`خون ${userInfo.status ? "میدهم" : "نمیدهم"}`}
        className="rtl"
        after={
          <Toggle
            component="div"
            name="status"
            value={userInfo.status}
            checked={userInfo.status === true}
            onChange={hanldeOnChange}
          />
        }
      />
    </List>
    <BlockTitle >معلومات شما</BlockTitle>
    <List strongIos insetIos>
      <ListItem header="گروپ خون" title="A+" />
      <ListItem header="موقعیت" title="کابل" />
      <ListItem header="شماره موبایل" title="0787227733" />
      <ListItem header="سن" title="12" />
      <ListItem header="جنسیت" title="مرد" />
    </List>
    <BlockTitle >میتوانید از حسابتان خارج شوید</BlockTitle>
    <Block strong>
      <Button onClick={() => setConfirmLogout(true)} large colors={{ fillBgIos: "bg-yellow-400", fillTextIos: "text-black" }}  ><LogoutIcon className="w-7 h-7 px-1" />از حساب خارج شو!</Button>
    </Block>
    <Dialog
      opened={confirmLogout}
      onBackdropClick={() => setConfirmLogout(false)}
      title="خارج"
      content="آیا میخواهید از برنامه خارج شوید؟"
      buttons={
        <>
          <DialogButton onClick={() => setConfirmLogout(false)}>
            نخیر
          </DialogButton>
          <DialogButton colors={{ textIos: "text-green-500" }} strong onClick={() => signOut()}>
            بله
          </DialogButton>
        </>
      }
    />
    <UserPopup user={userInfo} setUser={setUserInfo}  popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
  </Layout>;
}
export default Profile;

const PenIcon = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"/>
    </g>
</svg>
