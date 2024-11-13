import React from 'react';
import { Outlet } from 'react-router-dom';
import { Bell } from 'lucide-react';
import StudentSidebar from '../components/student/StudentSidebar';
import TransitionOutletContent from '../components/box-tools/TransitionOutletContent';
import StudentHeader from '../components/student/StudentHeader';

const StudentLayout = () => {

    return (
        <div className="flex min-h-screen">
            {/* Fixed Sidebar */}
            <StudentSidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Fixed Header */}
                <StudentHeader/>
                {/* Scrollable Main Content */}
                <main className="p-6 bg-gray-100 h-[calc(100vh-64px)] overflow-auto">
                   <TransitionOutletContent>
                    <Outlet />
                   </TransitionOutletContent>
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;