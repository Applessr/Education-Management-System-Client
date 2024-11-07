import React, { useEffect } from 'react';
import { CircleUserRound, BookOpen, GraduationCap } from 'lucide-react';
import useTeacher from '@/src/hooks/useTeacher';
import { MdOutlineGirl, MdBoy } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";

const TeacherDashboard = () => {
  const { teacherGetConsulted, consulted } = useTeacher();
  const token = localStorage.getItem('token');

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

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    if (token) {
      teacherGetConsulted(token);
    }
  }, [token]);

  console.log('consulted', consulted);

  const malePercentage = (consulted?.genderCount?.male / consulted?.totalStudents) * 100;
  const femalePercentage = (consulted?.genderCount?.female / consulted?.totalStudents) * 100;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl text-amber-700 font-extrabold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-8 rounded-lg shadow-lg">
        <div
          className="bg-white rounded-lg flex w-[15rem] h-[8rem] items-center shadow-lg"
          style={{
            backgroundImage: "url('https://i.imgur.com/UzOCMZC.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className='bg-[#D65509] rounded-md w-1/12 h-full'></div>
          <div className='ml-8 flex justify-between items-center'>
            <div className='flex flex-col'>
              <div className="flex">
                <span className="text-sm font-semibold">Advisee</span>
              </div>
              <div className='flex items-center mt-4'>
                <div className='bg-[#F8971F] rounded-full w-12 h-12 flex justify-center items-center'>
                  <CircleUserRound className='text-white' size={30} />
                </div>
                <div className='text-3xl font-bold text-[#F8971F] ml-16'>{consulted?.totalStudents}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-lg flex w-[15rem] h-[8rem] items-center shadow-lg"
          style={{
            backgroundImage: "url('https://i.imgur.com/l9BUw9J.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className='bg-[#B31D3F] rounded-md w-1/12 h-full'></div>
          <div className='ml-8 flex justify-between items-center'>
            <div className='flex flex-col'>
              <div className="flex">
                <span className="text-sm font-semibold">Remaining</span>
              </div>
              <div className='flex items-center mt-4'>
                <div className='bg-[#EA546C] rounded-full w-12 h-12 flex justify-center items-center'>
                  <BookOpen className='text-white' size={30} />
                </div>
                <div className='text-3xl font-bold text-[#EA546C] ml-16'>{consulted?.statusCount?.active}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-lg flex w-[15rem] h-[8rem] items-center shadow-lg"
          style={{
            backgroundImage: "url('https://i.imgur.com/mV0GAN5.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className='bg-[#37B041] rounded-md w-1/12 h-full'></div>
          <div className='ml-8 flex justify-between items-center'>
            <div className='flex flex-col'>
              <div className="flex">
                <span className="text-sm font-semibold">Graduate</span>
              </div>
              <div className='flex items-center mt-4'>
                <div className='bg-[#109E00] rounded-full w-12 h-12 flex justify-center items-center'>
                  <GraduationCap className='text-white' size={30} />
                </div>
                <div className='text-3xl font-bold text-[#109E00] ml-16'>{consulted?.statusCount?.graduated}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Schedule Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
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
        <div className="bg-white rounded-lg shadow-lg p-4 justify-center items-center flex flex-col">
          <h2 className="text-2xl text-[#2C0076] font-semibold mb-4">Gender</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex gap-4">
              <div className='bg-[#FFB7B7] w-[15rem] h-[8rem] rounded-xl flex justify-around items-center'>
                <MdOutlineGirl className='w-16 h-16 text-white' />
                <div className='text-white flex flex-col items-end text-xl font-bold'>
                  <span>Female</span>
                  <span>{consulted?.genderCount?.female}</span>
                </div>
              </div>
              <div className='bg-[#9EB5FF] w-[15rem] h-[8rem] rounded-xl flex justify-around items-center'>
                <MdBoy className='w-16 h-16 text-white' />
                <div className='text-white flex flex-col items-end text-xl font-bold'>
                  <span>Male</span>
                  <span>{consulted?.genderCount?.male}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex mt-8'>
              <div className='flex items-center ml-2'>
                <BiMaleFemale className='text-[#2C0076]' />
                <span className='font-bold text-[#B0B0B0]'>By gender</span>
              </div>
              <div><span className='text-[#FFB7B7]'>Female {femalePercentage}%</span> / <span className='text-[#9EB5FF]'> Male {malePercentage}%</span></div>
            </div>
            <div className="flex flex-col items-center w-96 mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-full bg-[#FFB7B7] rounded-full"
                  style={{ width: `${malePercentage}%` }}
                />
              </div>
            </div>

            {/* Progress bar for Female */}
            <div className="flex flex-col items-center w-96 mt-6">

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-full bg-[#9EB5FF] rounded-full"
                  style={{ width: `${femalePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className='flex items-center gap-2 ml-2'>
            <BiMaleFemale className='w-8 h-8 text-[#2C0076]' />
            <h2 className="text-2xl text-[#2C0076] font-semibold">Gender</h2>
          </div>
          <div className='divider'></div>
          <div className="flex items-center justify-center mt-8">
            <div className="w-48 h-48 relative">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Female Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#FFB7B7"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="251.33"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#9EB5FF"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="251.33"
                  strokeDashoffset={`calc(251.33 - (251.33 * ${femalePercentage}) / 100)`}
                  className="transform origin-center"
                />
              </svg>
            </div>
          </div>
          <div className='flex justify-center gap-8 mt-4'>
            <div className="text-center mt-4 flex items-center ">
              <div className='bg-[#FFB7B7] w-3 h-3 rounded-full'></div><span className=" ml-1 font-semibold text-[#B0B0B0] mr-3">Female</span> {femalePercentage}%
            </div>
            <div className="text-center mt-4 flex items-center ">
              <div className='bg-[#9EB5FF] w-3 h-3 rounded-full'></div><span className="font-semibold text-[#B0B0B0] mr-3">Male</span> {malePercentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;