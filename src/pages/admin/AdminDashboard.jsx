import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Users, BookOpen, Bookmark, GraduationCap, School } from 'lucide-react';

const AdminDashboard = () => {
    // Sample data for the statistics cards
    const statsData = [
        { title: 'Professor', value: '50', icon: Users },
        { title: 'Student', value: '400', icon: BookOpen },
        { title: 'Subject', value: '50', icon: Bookmark },
        { title: 'Faculty', value: '5', icon: School },
        { title: 'Major', value: '10', icon: GraduationCap }
    ];

    // Sample data for faculty distribution with colors and professor counts
    const facultyData = [
        { 
            name: 'Faculty of Science', 
            value: 30, 
            color: '#E6E6FF',
            professors: 12
        },
        { 
            name: 'Faculty of Law', 
            value: 45, 
            color: '#B7CBFF',
            professors: 15
        },
        { 
            name: 'Faculty of Engineering', 
            value: 25, 
            color: '#FFB7B7',
            professors: 8
        },
        { 
            name: 'Faculty of Business and Economics', 
            value: 35, 
            color: '#FFE4B7',
            professors: 10
        },
        { 
            name: 'Faculty of Communication and Media Studies', 
            value: 40, 
            color: '#FFFDB7',
            professors: 5
        }
    ];

    // Student gender distribution data
    const studentGender = { female: 80, male: 20 };

    const GenderChart = ({ female, male, title }) => (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#eee"
                        strokeWidth="20"
                        fill="none"
                    />
                    {/* Female percentage */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#FFB7B7"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${female * 2.51} 251.33`}
                    />
                    {/* Male percentage */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#B7CBFF"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${male * 2.51} 251.33`}
                        strokeDashoffset={`-${female * 2.51}`}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">100%</span>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFB7B7]" />
                    <span className="text-gray-600">Female</span>
                    <span className="font-semibold ml-auto">{female}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#B7CBFF]" />
                    <span className="text-gray-600">Male</span>
                    <span className="font-semibold ml-auto">{male}%</span>
                </div>
            </div>
        </div>
    );

    const FacultyProfessorsCard = () => (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Professors by Faculty</h3>
            <div className="space-y-4">
                {facultyData.map((faculty, index) => (
                    <div key={index} className="border-b pb-2 last:border-b-0">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">{faculty.name}</span>
                            <span className="font-semibold">{faculty.professors}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                    width: `${(faculty.professors / 15) * 100}%`,
                                    backgroundColor: faculty.color 
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {statsData.map((stat, index) => (
                    <div
                        key={index}
                        className="border-red-500 bg-white p-4 rounded-lg border shadow-sm"
                    >
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <span className="text-gray-600 text-sm">{stat.title}</span>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </div>
                            <stat.icon className="w-8 h-8" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Professors by Faculty */}
                <FacultyProfessorsCard />

                {/* Student Gender Distribution */}
                <GenderChart
                    female={studentGender.female}
                    male={studentGender.male}
                    title="Student"
                />

                {/* Faculty Distribution Chart */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Faculty</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={facultyData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                            >
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                    height={60}
                                    scale="band"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    domain={[0, 50]}
                                    ticks={[0, 10, 20, 30, 40, 50]}
                                />
                                <Bar
                                    dataKey="value"
                                    barSize={30}
                                    radius={[4, 4, 0, 0]}
                                >
                                    {facultyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="mt-4 space-y-2">
                        {facultyData.map((faculty, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: faculty.color }} />
                                <span className="text-sm text-gray-600">{faculty.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;