import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  LogOut,
  LayoutDashboard,
  CalendarRange,
  IdCard,
  LibraryBig,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import useUser from "@/src/hooks/useUser";

const AdminSidebar = () => {
  const { logout, user } = useUser();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the current path from location
    const pathName = location.pathname.split("/").pop();
    // If we're at the root admin path, set active to dashboard
    setActive(pathName === "admin" ? "dashboard" : pathName);
  }, [location.pathname]); // Add location.pathname as dependency

  const sidebarItems = useMemo(
    () => [
      {
        icon: <LayoutDashboard size={24} />,
        text: "Dashboard",
        name: "dashboard",
      },
      { icon: <CalendarRange size={24} />, text: "Course", name: "course" },
      { icon: <IdCard size={24} />, text: "Professor", name: "professor" },
      { icon: <IdCard size={24} />, text: "Students", name: "student" },
      {
        icon: <LibraryBig size={24} />,
        text: "Course Syllabus",
        name: "course-syllabus",
      },
    ],
    []
  );

  const handleClickMenu = (name) => {
    setActive(name);
    navigate(`/admin/${name}`);
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
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center gap-4 ${!open && "hidden"}`}>
            <img
              src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png"
              alt="Pierre University"
              className="h-16"
            />
            <span className="font-semibold text-xl">Pierre University</span>
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

        <div className="bg-[#D1D1D1] border-t p-4">
          <div className="flex items-center gap-4">
            {open && (
              <div>
                <h4 className="font-extrabold text-black">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="text-md text-black">{user?.employeeRole}</p>
              </div>
            )}
            <div
              onClick={handleLogout}
              className={`hover:bg-white w-12 h-12 rounded-full flex justify-center items-center ${
                open ? "ml-auto" : "hidden"
              }`}
            >
              <LogOut className="text-black" />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;