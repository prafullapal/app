import { useAppStore } from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const {userInfo} = useAppStore();
  return ( 
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <h1 className='text-black'>Profile</h1> 
      <h2 className='text-black'>{userInfo.id}</h2>
      <h2 className='text-black'>{userInfo.email}</h2> 
    </div>
  )
}
