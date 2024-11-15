import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "../components/guest/GuestHeader";
import GuestFooter from "../components/guest/GuestFooter";
import ScrollTop from "../components/guest/ScrollTop";
import Transition from "../components/box-tools/Transition";

const GuestLayout = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto"; 
    };
  }, []);

  return (
    <div className="min-h-screen ">
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