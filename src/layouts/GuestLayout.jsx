import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "../components/guest/GuestHeader";
import GuestFooter from "../components/guest/GuestFooter";
import { Scroll } from "lucide-react";
import ScrollTop from "../components/guest/ScrollTop";

const GuestLayout = () => {
  return (
    <div className="min-h-screen">
      <GuestHeader />
      <ScrollTop />
      <Outlet />
      <GuestFooter />
    </div>
  );
};

export default GuestLayout;
