import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestHeader from '../components/guest/GuestHeader'

const GuestLayout = () => {
  return (
    <div>
      <GuestHeader />
      <Outlet/>
      
    </div>
  );
};

export default GuestLayout;
