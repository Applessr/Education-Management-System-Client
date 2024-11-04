import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TeacherClassSchedule = () => {
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Generate years (e.g., 2020-2024)
    const years = Array.from({ length: 5 }, (_, i) => 2020 + i);

    // Semesters
    const semesters = ["1", "2"];

    // Sample teacher's class data
    const teacherClasses = [
        // Monday Classes
        {
            name: "Mathematical Economics I",
            code: "01101171",
            section: "Section 800",
            location: "Room 101",
            startTime: "2024-11-01T09:00:00",
            endTime: "2024-11-01T10:30:00",
            dayOfWeek: 1, // Monday
            color: "bg-amber-50 hover:bg-amber-100"
        },
        {
            name: "Mathematical Economics I",
            code: "01101171",
            section: "Section 801",
            location: "Room 102",
            startTime: "2024-11-01T13:00:00",
            endTime: "2024-11-01T14:30:00",
            dayOfWeek: 1, // Monday
            color: "bg-amber-50 hover:bg-amber-100"
        },

        // Tuesday Classes
        {
            name: "Applied Mathematics",
            code: "01101172",
            section: "Section 702",
            location: "Room 205",
            startTime: "2024-11-02T11:00:00",
            endTime: "2024-11-02T12:30:00",
            dayOfWeek: 2, // Tuesday
            color: "bg-amber-50 hover:bg-amber-100"
        },
        {
            name: "Applied Mathematics",
            code: "01101172",
            section: "Section 703",
            location: "Room 205",
            startTime: "2024-11-02T14:00:00",
            endTime: "2024-11-02T15:30:00",
            dayOfWeek: 2, // Tuesday
            color: "bg-amber-50 hover:bg-amber-100"
        },

        // Wednesday Classes
        {
            name: "Mathematical Economics I",
            code: "01101171",
            section: "Section 800",
            location: "Room 101",
            startTime: "2024-11-03T09:00:00",
            endTime: "2024-11-03T10:30:00",
            dayOfWeek: 3, // Wednesday
            color: "bg-amber-50 hover:bg-amber-100"
        },
        {
            name: "Mathematical Economics I",
            code: "01101171",
            section: "Section 801",
            location: "Room 102",
            startTime: "2024-11-03T13:00:00",
            endTime: "2024-11-03T14:30:00",
            dayOfWeek: 3, // Wednesday
            color: "bg-amber-50 hover:bg-amber-100"
        },

        // Thursday Classes
        {
            name: "Applied Mathematics",
            code: "01101172",
            section: "Section 702",
            location: "Room 205",
            startTime: "2024-11-04T11:00:00",
            endTime: "2024-11-04T12:30:00",
            dayOfWeek: 4, // Thursday
            color: "bg-amber-50 hover:bg-amber-100"
        },
        {
            name: "Applied Mathematics",
            code: "01101172",
            section: "Section 703",
            location: "Room 205",
            startTime: "2024-11-04T14:00:00",
            endTime: "2024-11-04T15:30:00",
            dayOfWeek: 4, // Thursday
            color: "bg-amber-50 hover:bg-amber-100"
        },

        // Friday Classes
        {
            name: "Statistics for Economics",
            code: "01101173",
            section: "Section 900",
            location: "Room 301",
            startTime: "2024-11-05T10:30:00",
            endTime: "2024-11-05T12:00:00",
            dayOfWeek: 5, // Friday
            color: "bg-amber-50 hover:bg-amber-100"
        },
        {
            name: "Statistics for Economics",
            code: "01101173",
            section: "Section 901",
            location: "Room 301",
            startTime: "2024-11-05T15:30:00",
            endTime: "2024-11-05T17:00:00",
            dayOfWeek: 5, // Friday
            color: "bg-amber-50 hover:bg-amber-100"
        }
    ];

    const times = Array.from({ length: 19 }, (_, i) => {
        const hour = 8 + Math.floor(i / 2);
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, '0')}:${minutes}`;
    });

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const isWithinClassTime = (classStartTime, classEndTime, slotTime) => {
        const [slotHour, slotMinute] = slotTime.split(":").map(Number);
        const startDate = new Date(classStartTime);
        const endDate = new Date(classEndTime);
        const slotMinutes = slotHour * 60 + slotMinute;
        const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
        const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
        return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    };

    const getColSpan = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationMinutes = (end - start) / (1000 * 60);
        return durationMinutes / 30;
    };

    const formatTimeDisplay = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getDayIndex = (dayOfWeek) => {
        return dayOfWeek - 1;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">Semester</span>
                    <div className="relative">
                        <select
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                            className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            <option value="">Select</option>
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-700">Year</span>
                    <div className="relative">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            <option value="">Select</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <button
                    className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                >
                    Search
                </button>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Weekly Class Schedule</h2>
            </div>
            <div className="min-w-[800px] overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-left font-semibold">
                                Day
                            </th>
                            {times.map((time) => (
                                <th
                                    key={time}
                                    className="border border-gray-200 px-4 py-2 bg-gray-100 text-center font-semibold text-sm"
                                >
                                    {time}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day, dayIndex) => (
                            <tr key={day}>
                                <th className="border border-gray-200 px-4 py-2 bg-gray-50 font-medium text-left">
                                    {day}
                                </th>
                                {times.map((time) => {
                                    const classDetails = teacherClasses.find(
                                        (cls) =>
                                            getDayIndex(cls.dayOfWeek) === dayIndex &&
                                            isWithinClassTime(cls.startTime, cls.endTime, time)
                                    );

                                    if (classDetails && `${new Date(classDetails.startTime).getHours().toString().padStart(2, '0')}:${new Date(classDetails.startTime).getMinutes().toString().padStart(2, '0')}` === time) {
                                        const colSpan = getColSpan(
                                            classDetails.startTime,
                                            classDetails.endTime
                                        );
                                        return (
                                            <td
                                                key={time}
                                                className={`border border-gray-200 px-2 py-1 text-center transition-colors duration-200 ${classDetails.color}`}
                                                colSpan={colSpan}
                                            >
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-semibold text-amber-700">
                                                        {classDetails.name}
                                                    </span>
                                                    <span className="text-gray-600 text-sm">
                                                        {classDetails.code}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">
                                                        {classDetails.section}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">
                                                        {classDetails.location}
                                                    </span>
                                                    <span className="text-gray-500 text-xs">
                                                        {`${formatTimeDisplay(classDetails.startTime)} - ${formatTimeDisplay(classDetails.endTime)}`}
                                                    </span>
                                                </div>
                                            </td>
                                        );
                                    }

                                    return classDetails ? null : (
                                        <td
                                            key={time}
                                            className="border border-gray-200 px-4 py-2 bg-white"
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherClassSchedule;