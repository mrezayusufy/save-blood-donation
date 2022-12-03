import { CloseIcon } from '@/components/icons'
import { Block, BlockTitle, Button, Link, List, ListInput, ListItem, Navbar, Page, Popup, Radio, Segmented, SegmentedButton } from 'konsta/react'
import { useState } from 'react';

function UserPopup({ popupOpen, setPopupOpen, user, setUser }) {
  const [bloodGroup, setBloodGroup] = useState("A+");
 
  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    console.log("user", user);

  }
  const bloodGroupList = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  return (
    <Popup opened={popupOpen} onBackdropClick={() => setPopupOpen(false)}>
      <Page>
        <Navbar title='تغییر اطلاعات' right={
          <Link navbar onClick={() => setPopupOpen(false)}><CloseIcon className="w-6 h-6 text-red-500" /></Link>
        } />
        <Block>
          <BlockTitle >اطلاعات خود را بروزرسانی کنید</BlockTitle>
          <List strongIos insetIos>
            <ListInput outline label="نام کامل" type='text' name='fullname' onChange={handleChange} defaultValue={user.fullname} />
            <ListInput outline label="رمز" type='password' name='password' onChange={handleChange} defaultValue={user.password} />
            <ListInput outline label="شماره تلفون" type='text' name='phone' onChange={handleChange} defaultValue={user.phone} />
            <ListInput outline label="سن" type='number' name='age' onChange={handleChange} defaultValue={user.age} />
            <ListInput outline label="مکان" type='text' name='location' onChange={handleChange} id='location' defaultValue={user.location} />
            <ul className='grid grid-flow-col grid-cols-2 grid-rows-1 m-4 '>
              <ListItem label title="مرد" className="radio-group" media={
                <Radio
                  value="MALE"
                  name="gender"
                  checked={user.gender === "MALE"}
                  onChange={handleChange}
                  component='div' />
              } />
              <ListItem label title="زن" className="radio-group" media={
                <Radio
                  name="gender"
                  value="FEMALE"
                  onChange={handleChange}
                  checked={user.gender === "FEMALE"}
                  component='div' />
              } />
            </ul>
          </List>
          <BlockTitle >گروپ خون</BlockTitle>
          <List strongIos insetIos className='[&>ul]:grid [&>ul]:grid-flow-col [&>ul]:grid-cols-4 [&>ul]:grid-rows-2'>
            {bloodGroupList.map((item) => (
              <ListItem label
                key={item}
                className="radio-group"
                title={item} media={
                  <Radio
                    name='bloodgroup'
                    value={item}
                    checked={user.bloodgroup === item}
                    onChange={handleChange}
                    component='div' />
                } />
            ))}
          </List>

          <List strongIos insetIos>
            <Button onClick={() => setPopupOpen(false)}>ثبت</Button>
          </List>
        </Block>
      </Page>
    </Popup>
  )
}

export default UserPopup
