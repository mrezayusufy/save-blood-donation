import { Block, BlockHeader, BlockTitle, Button, List, ListGroup, ListInput, ListItem, Navbar, Radio } from "konsta/react";
import { signIn } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
type UserType = {
  phone: string,
  password: string,
  role: string
  fullname: string
}
export default () => {
  const [user, setUser] = useState<UserType>({ fullname: "", phone: "", password: "", role: "DONOR" })
  const router = useRouter()
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const reqUser = {
      fullname: user.fullname,
      phone: user.phone,
      password: user.password,
      role: user.role
    };
    const newClient = await axios.post("/api/register", reqUser);
    if (newClient){
      signIn("credentials", {
        phone: user.phone,
        password: user.password,
        redirect: false
      });
    } 
    console.log("newclient",newClient)
  }
  return <div>
    <Navbar title='Save' />
    <main className='my-12 container mx-auto max-w-[320px]'>
      
      <BlockTitle >ایجاد حساب جدید</BlockTitle>
      <form onSubmit={handleSubmit}>
        <Block strongIos insetIos>
          <List strong>
            <ListInput type='text' required onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({ ...user, fullname: e.currentTarget.value })} label="نام تخلص" name="fullname" id="fullname" outline />
            <ListInput type='text' required onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({ ...user, phone: e.currentTarget.value })} label="شماره تلفون" name="phone" id="phone" outline />
            <ListInput type='password' required onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({ ...user, password: e.currentTarget.value })} label="رمز" name='password' id="password" outline />
            <List className="my-0">
              <ListItem label
                className="radio-group"
                title={"خون دهنده"} media={
                  <Radio
                    component='div'
                    value={user.role}
                    checked={user.role === "DONOR"}
                    onChange={() => setUser({ ...user, role: "DONOR" })} />
                } />
              <ListItem label
                className="radio-group"
                title={"خون گیرنده"} media={
                  <Radio
                    component='div'
                    value={user.role}
                    checked={user.role === "ACCEPTOR"}
                    onChange={() => setUser({ ...user, role: "ACCEPTOR" })} />
                } />
            </List>
            <Button large>ثبت</Button>
          </List>
        </Block>
      </form>
      <Block>
        <BlockTitle>وارد برنامه شو</BlockTitle>
        <BlockHeader>اگر در این برنامه حساب دارید میتوانید به صفحه لاگین مراجعه کنید..</BlockHeader>
        <List>
          <Button large colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} onClick={() => router.replace("/auth/signin")}>وارد برنامه</Button>
        </List>
      </Block>
    </main>
  </div>;
}
