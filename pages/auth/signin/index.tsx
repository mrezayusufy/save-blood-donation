import { Block, BlockHeader, BlockTitle, Button, List, ListInput, Navbar } from 'konsta/react';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const SignIn: NextPage = (): JSX.Element => {
  const [user, setUser] = useState({ phone: "", password: "" })
  const router = useRouter()
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", { phone: user.phone, password: user.password, redirect: false })
    console.log(res);
  }

  return <div >
    <Navbar title='Save' />
    <main className='my-12 container mx-auto max-w-[320px]'>
      <BlockTitle >وارد حساب تان شوید</BlockTitle>
      <form onSubmit={handleSubmit}>
        <Block strongIos insetIos>
          <List>
            <ListInput type='text' onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({ ...user, phone: e.currentTarget.value })} label="شماره تلفون" name="phone" id="phone" outline />
            <ListInput type='password' onChange={(e: React.FormEvent<HTMLInputElement>) => setUser({ ...user, password: e.currentTarget.value })} label="رمز" name='password' id="password" outline />
            <Button large>ثبت</Button>
          </List>
        </Block>
      </form>
      <Block>
        <BlockTitle>ثبت نام</BlockTitle>
        <BlockHeader>اگر در این برنامه حساب ندارید میتوانید به آسانی ثبت نام کنید..</BlockHeader>
        <List>
          <Button large colors={{ fillBgIos: "bg-green-700", fillActiveBgIos: "bg-green-900" }} onClick={() => router.replace("/auth/signup")}>ورود به صفحه ثبت نام</Button>
        </List>
      </Block>
    </main>

  </div>;
}
export default SignIn