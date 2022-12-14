import { CloseIcon } from '@/components/icons'
import { Block, BlockHeader, BlockTitle, Button, Link, List, ListInput, ListItem, Navbar, Page, Popup, Radio, Segmented, SegmentedButton, Toggle } from 'konsta/react'
import { useState } from 'react';
import { mutate } from 'swr';
import { UserType } from '../../src/types/userType';
import axios from 'axios';
import BloodgroupList from '../bloodgroup/bloodgroupList';
import { useRouter } from 'next/router';

export const UserPopup = ({ user: data, setPopupOpen, popupOpen, session }) => {
  const [bloodgroup, setBloodgroup] = useState(data.bloodgroup);
  const [user, setUser] = useState<UserType>(data);
  const [gender, setGender] = useState(data.gender ?? true);
  const [status, setStatus] = useState(data.status ?? true);
  const [role, setRole] = useState(data.userRole);
  const router = useRouter();
  const handleChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const name = e.target.name;
    setUser({ ...user, [name]: val })
  }

  const handleGender = (e) => setGender((prev) => !prev); 
  const handleBloodgroup = (e) => {setBloodgroup(e.target.value)};
  
  const handleRole = (e) => { 
    setRole(e.target.value); 
    localStorage.setItem('role', role);
  }
  const onSubmit = async () => {
    const updated = {
      ...user,
      status: status,
      gender: gender,
      bloodgroup: bloodgroup,
      role: role,
      userRole: role
    }
    try {
      const jwt = session.user.jwt;
      const res = await axios.put("/api/me", updated, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }).then(response => response.data)
      .catch(e => console.log('e', e))
      .finally(() => {
        router.replace("/profile");
        setPopupOpen(false);
        mutate('/api/me');
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
  const bloodgroupList = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  return (
    <Popup opened={popupOpen} onBackdropClick={() => setPopupOpen(false)}>
      <Page>
        <Navbar title='?????????? ??????????????' right={
          <Link navbar onClick={() => setPopupOpen(false)}><CloseIcon className="w-6 h-6 text-red-500" /></Link>
        } />
        <Block>
          <BlockTitle >?????????????? ?????? ???? ?????????????????? ????????</BlockTitle>
          <List strongIos insetIos>
            <ListInput outline label="?????? ????????" type='text' name='fullname' onChange={handleChange} defaultValue={user.fullname} />
            <ListInput outline label="?????????? ??????????" type='text' name='phone' onChange={handleChange} defaultValue={user.phone} />
            <ListInput outline label="????" type='number' name='age' onChange={handleChange} defaultValue={user.age} />
            <ListInput outline label="??????????" type='text' name='city' onChange={handleChange} defaultValue={user.city} />
            <ul className='grid grid-flow-col grid-cols-2 grid-rows-1 m-4 '>
              <ListItem label title="??????" className="radio-group" media={
                <Radio
                  name="gender"
                  value={gender}
                  checked={gender === true}
                  onChange={handleGender}
                  component='div' />
              } />
              <ListItem label title="????" className="radio-group" media={
                <Radio
                  name="gender"
                  value={gender}
                  onChange={handleGender}
                  checked={gender === false}
                  component='div' />
              } />
            </ul>
            <ul className='grid grid-flow-col grid-cols-2 grid-rows-1 m-4 '>
              <ListItem label title="?????? ??????????????????" className="radio-group" media={
                <Radio
                  name="userRole"
                  value="donor"
                  checked={role === "donor"}
                  onChange={handleRole}
                  component='div' />
              } />
              <ListItem label title="?????? ????????????" className="radio-group" media={
                <Radio
                  name="userRole"
                  value="acceptor"
                  checked={role === "acceptor"}
                  onChange={handleRole}
                  component='div' />
              } />
            </ul>
          </List>
          <BlockTitle >??????????</BlockTitle>

          <BlockHeader>
            ?????? ???????????????? ?????????? ???????? ???????? ?????????? ?????? ???????? ???? ?????? ???????? ????????.
          </BlockHeader>
          <List strong inset>
            <ListItem
              label
              title={`?????? ${status ? "??????????" : "????????????"}`}
              className="rtl"
              after={
                <Toggle
                  onChange={() => setStatus((prev) => !prev)}
                  component="div"
                  name="status"
                  value={status}
                  checked={status === true}
                />
              }
            />
          </List>
          <BlockTitle >???????? ??????</BlockTitle>
          <BloodgroupList bloodgroup={bloodgroup} onChange={handleBloodgroup}/>

          <List strongIos insetIos>
            <Button onClick={onSubmit}>??????</Button>
          </List>
        </Block>
      </Page>
    </Popup>
  )
};


