import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronFirst,
  ChevronLast,
  UserCircle,
  CalendarDays,
  BookOpen,
  WalletCards,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import useUser from "@/src/hooks/useUser";

const StudentSidebar = () => {
  const { logout, user } = useUser();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const sidebarItems = useMemo(() => [
    {
      icon: <LayoutDashboard size={24} />,
      text: "Dashboard",
      name: "dashboard",
    },
    { icon: <UserCircle size={24} />, text: "Profile", name: "profile" },
    { icon: <BookOpen size={24} />, text: "Enroll", name: "enroll" },
    { icon: <WalletCards size={24} />, text: "Payment", name: "payment" },
    {
      icon: <CalendarDays size={24} />,
      text: "Schedule",
      name: "academic-schedule",
    },
    {
      icon: <BookOpen size={24} />,
      text: "Grade Report",
      name: "enrollResult",
    }
  ], []);

  useEffect(() => {
    const pathName = location.pathname.split('/').pop(); 
    setActive(pathName);
  }, [location]);


  const handleClickMenu = (name) => {
    setActive(name);
    navigate(`/student/${name}`);
  };

  const handleClickSidebar = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`h-screen transition-width duration-300 ${open ? "w-80" : "w-20"}`}>
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 flex items-center justify-between border-b-2 mx-3 pb-12">
          <div className={`flex items-center gap-4 ${!open && "hidden"}`}>
            <img
              src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png"
              alt="Pierre University"
              className="h-16"
            />
            <span className="font-semibold text-lg">Pierre University</span>
          </div>
          <button
            className="p-1.5 rounded-lg bg-gray-50 transition duration-500 hover:bg-gray-300"
            onClick={handleClickSidebar}
          >
            {open ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.name}
              icon={() => item.icon}
              text={open ? item.text : ""}
              active={item.name === active}
              onClick={() => handleClickMenu(item.name)}
            />
          ))}
        </ul>

        <div className="bg-[#272988] border-t p-4">
          <div className="flex items-center gap-4">
            {open && (
              <div>
                <h4 className="font-bold text-white text-xl">{user?.firstName} {user?.lastName}</h4>
                <p className="text-[1rem] font-light text-white">{user?.role}</p>
              </div>
            )}
            <div onClick={handleLogout} className={`cursor-pointer hover:bg-[#2f2fc8] w-12 h-12 rounded-full flex justify-center items-center ${open ? "ml-auto" : "hidden"} `}>
              <LogOut className="text-white " />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default StudentSidebar;