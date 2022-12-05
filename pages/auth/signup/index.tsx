import { Block, BlockHeader, BlockTitle, Button, List, ListGroup, ListInput, ListItem, Navbar, Radio } from "konsta/react";
import { signIn } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import http from "@/src/lib/api";
type UserType = {
  phone: string,
  password: string,
  role: string
  fullname: string
}
export default () => {
  const [loading, setLoading] = useState(false)
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

     
    setLoading(true);
    // localhost:3333/api/auth/local/register
    const {data} = await http.post("/auth/local/register", reqUser);
    if (data){
      console.log(data);
      localStorage.setItem("role", data.user.userRole);
      localStorage.setItem("token", data.jwt)
      setLoading(false);
      router.push("/profile")
    } 
  }
  const handleOnChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  
  return <div>
    <Navbar title='Save' />
    <main className='my-12 container mx-auto max-w-[320px]'>
      <BlockTitle >ایجاد حساب جدید</BlockTitle>
      <form onSubmit={handleSubmit}>
        <Block strongIos insetIos>
          <List strong>
            <ListInput type='text' required onChange={handleOnChange} label="نام تخلص" name="fullname" id="fullname" outline />
            <ListInput type='text' required onChange={handleOnChange} label="شماره تلفون" name="phone" id="phone" outline />
            <ListInput type='password' required onChange={handleOnChange} label="رمز" name='password' id="password" outline />
            <List className="my-0">
              <ListItem label
                className="radio-group"
                title={"خون دهنده"} media={
                  <Radio
                    component='div'
                    value={user.role}
                    checked={user.role === "donor"}
                    onChange={() => setUser({ ...user, role: "donor" })} />
                } />
              <ListItem label
                className="radio-group"
                title={"خون گیرنده"} media={
                  <Radio
                    component='div'
                    value={user.role}
                    checked={user.role === "acceptor"}
                    onChange={() => setUser({ ...user, role: "acceptor" })} />
                } />
            </List>
            <Button large>ثبت</Button>
          </List>
        </Block>
      </form>
      <Block>
        <BlockTitle>ورود به سیستم</BlockTitle>
        <BlockHeader>اگر در این برنامه حساب دارید میتوانید به صفحه لاگین مراجعه کنید..</BlockHeader>
        <List>
          <Button large colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} onClick={() => router.replace("/auth/signin")}>ورود</Button>
        </List>
      </Block>
    </main>
  </div>;
}
