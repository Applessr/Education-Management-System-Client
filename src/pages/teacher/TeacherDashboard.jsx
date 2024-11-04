import React from 'react';
import { CircleUserRound, BookOpen, GraduationCap } from 'lucide-react';

const TeacherDashboard = () => {
  // Sample data for the schedule
  const scheduleData = [
    {
      time: "09:00 am",
      courseId: "01011771",
      courseName: "Mathematical Economics I",
      section: "Sec. 500",
      room: "170302"
    },
    {
      time: "12:00 pm",
      courseId: "01011771",
      courseName: "Mathematical Economics I",
      section: "Sec. 501",
      room: "170302"
    }
  ];

  const stats = [
    { title: 'Advisee', value: 100, icon: CircleUserRound},
    { title: 'Attending', value: 50, icon: BookOpen},
    { title: 'Evaluate', value: 50, icon: GraduationCap}
  ];

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl text-amber-700 font-extrabold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={` border-amber-700 border-2 bg-white rounded-lg p-4 flex justify-between items-center shadow-lg`}>
            <div className="flex flex-col">
              <span className="text-lg font-medium">{stat.title}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <stat.icon size={40} />
          </div>
        ))}
      </div>

      {/* Schedule Section */}
      <div className="border-amber-700 border-2 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">{formatDate()}</h2>
        <div className="space-y-4">
          {scheduleData.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <div className="w-24">
                <span className="text-gray-600">{schedule.time}</span>
              </div>
              <div className="flex-1 px-4">
                <div className="flex gap-2">
                  <span className="text-gray-600">{schedule.courseId}</span>
                  <span className="font-medium">{schedule.courseName}</span>
                </div>
              </div>
              <div className="w-32 text-right">
                <span className="text-gray-600">{schedule.section}</span>
              </div>
              <div className="w-24 text-right">
                <span className="text-gray-600">{schedule.room}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Distribution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-amber-700 border-2 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Gender</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFB7B7]" />
                <span>Female</span>
                <span className="font-semibold">30</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#B7CBFF]" />
                <span>Male</span>
                <span className="font-semibold">20</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-amber-700 border-2 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4 ">Gender</h2>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 relative">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#FFB7B7"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="188.5 251.33"
                  className="transform origin-center"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#B7CBFF"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="62.83 251.33"
                  strokeDashoffset="-188.5"
                  className="transform origin-center"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;