import React from 'react';
import { Outlet } from 'react-router-dom';
import { Bell } from 'lucide-react';
import StudentSidebar from '../components/student/StudentSidebar';

const StudentLayout = () => {
    return (
        <div className="flex h-screen">
            <StudentSidebar />
            <div className="flex-1">
                <header className="h-16 border-b bg-white flex items-center justify-end px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Bell size={24} />
                    </button>
                </header>
                <main className="p-6 bg-gray-100 h-[calc(100vh-64px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;