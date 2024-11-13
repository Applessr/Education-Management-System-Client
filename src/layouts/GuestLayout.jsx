import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "../components/guest/GuestHeader";
import GuestFooter from "../components/guest/GuestFooter";
import ScrollTop from "../components/guest/ScrollTop";
import Transition from "../components/box-tools/Transition";

const GuestLayout = () => {
  return (
    <div className="min-h-screen">
      <GuestHeader />
      <Transition>
        <ScrollTop />
        <Outlet />
      </Transition>
      <GuestFooter />
    </div>
  );
};

export default GuestLayout;
