import React from 'react'
import { Outlet } from 'react-router-dom'
import TeacherSidebar from '../components/teacher/TeacherSidebar'
import { Bell } from 'lucide-react'
import TransitionOutletContent from '../components/box-tools/TransitionOutletContent'

const TeacherLayout = () => {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Fixed Sidebar */}
        <TeacherSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Fixed Header */}
          {/* <header className="h-16 border-b bg-white flex items-center justify-end px-4 sticky top-0 z-10">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={24} />
            </button>
          </header> */}

          {/* {/* Scrollable Main Content */}
          <main className=" h-[calc(100vh)] overflow-auto">
            <div className='p-6 bg-gray-100'>
            <TransitionOutletContent>
              <Outlet />
            </TransitionOutletContent>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default TeacherLayout
