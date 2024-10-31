import React, { useState } from 'react';
import { ChevronFirst, ChevronLast, UserCircle, CalendarDays, BookOpen, WalletCards, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { LogOut } from 'lucide-react';

const StudentSidebar = () => {
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState("profile");
    const navigate = useNavigate();

    const sidebarItems = [
        { icon: <UserCircle size={24} />, text: "Profile", name: "profile" },
        { icon: <BookOpen size={24} />, text: "Enroll", name: "enroll" },
        { icon: <WalletCards size={24} />, text: "Payment", name: "payment" },
        { icon: <CalendarDays size={24} />, text: "Class schedule", name: "class-schedule" },
        { icon: <CalendarDays size={24} />, text: "Exam schedule", name: "exam-schedule" }
    ];

    const handleClickMenu = (name) => {
        setActive(name);
        navigate(`/student/${name}`);
    };

    const handleClickSidebar = () => {
        setOpen(!open);
    };

    return (
        <aside className={`h-screen transition-width duration-300 ${open ? "w-80" : "w-20"}`}>
            <nav className="h-full flex flex-col bg-white border-r">
                <div className="p-4 flex items-center justify-between">
                    <div className={`flex items-center gap-4 ${!open && "hidden"}`}>
                        <img
                            src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png"
                            alt="Pierre University"
                            className="h-8"
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

                <div className="bg-[#393af2] border-t p-4">
                    <div className="flex items-center gap-4">
                        <img
                            src="/default-avatar.png"
                            className="w-10 h-10 rounded-full"
                        />
                        {open && (
                            <div>
                                <h4 className="font-extrabold text-white">Faris</h4>
                                <p className="text-md text-white">Student</p>
                            </div>
                        )}
                        <LogOut className={`text-white ${open ? 'ml-auto' : 'hidden'}`} />
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default StudentSidebar;