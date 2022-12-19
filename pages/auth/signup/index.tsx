import { Block, BlockHeader, BlockTitle, Button, List, ListInput, ListItem, Navbar, Radio, Toast } from "konsta/react";
import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
type UserType = {
  phone: string,
  password: string,
  role: string
  fullname: string
}
export default () => {
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState<UserType>({ fullname: "", phone: "", password: "", role: "donor" })
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", user)
    .then((data) => {
      console.log('data :>> ', data);
      if(data) {
        setError(data.error);
      }
    })
    setLoading(false);
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
          <Button disabled={loading} large colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} onClick={() => router.replace("/auth/signin")}>ورود</Button>
        </List>
      </Block>
      <Toast
        position="left"
        opened={error}
        button={
          <Button
            rounded
            clear
            small
            inline
            onClick={() => setError(null)}
          >
            &#10060;
          </Button>
        }
      >
        <div className="shrink">{error}</div>
      </Toast>
    </main>
  </div>;
}
