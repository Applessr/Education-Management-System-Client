import React from "react";
import { Outlet } from "react-router-dom";
import GuestFooter from "../components/guest/GuestFooter";

const GuestLayout = () => {
  return (
    <div>
      <Outlet />
      <GuestFooter />
    </div>
  );
};

export default GuestLayout;
