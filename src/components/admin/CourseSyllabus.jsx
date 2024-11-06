import useAdmin from '@/src/hooks/useAdmin';
import React, { useState } from 'react';

const CourseSyllabus = () => {
    const { getCourseSyllabus, courseSyllabus } = useAdmin();


    const mapSemesterKey = (key) => {
        const mapping = {
            '1/1': 'Semester 1',
            '2/1': 'Semester 2',
            '1/2': 'Semester 3',
            '2/2': 'Semester 4',
            '1/3': 'Semester 5',
            '2/3': 'Semester 6',
            '1/4': 'Semester 7',
            '2/4': 'Semester 8'
        };
        return mapping[key] || key;
    };

    return (
        <div>
            {
                courseSyllabus && (
                    <div className="bg-white rounded-lg shadow w-[80rem] text-[#041942]">
                        <div className="p-4 bg-[#1a237e] text-white rounded-t-lg flex justify-between items-center">
                            <h2 className="font-semibold">{courseSyllabus?.major?.faculty}</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#C2D3FF]">
                                    <tr>
                                        <th className="px-4 py-3 text-left border">Code</th>
                                        <th className="px-4 py-3 text-left border">Subject Title</th>
                                        <th className="px-4 py-3 text-left border">Credit</th>
                                        <th className="px-4 py-3 text-left border">Prerequisite</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseSyllabus?.major &&
                                        Object.keys(courseSyllabus.major.courseRecommendation).map((semesterKey) => (
                                            <React.Fragment key={semesterKey}>
                                                <tr className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-bold">{mapSemesterKey(semesterKey)}</td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                </tr>

                                                <tr className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-bold">Major subject (Base)</td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                </tr>
                                                {courseSyllabus.major.courseRecommendation[semesterKey].PREREQUISITES.map((course) => (
                                                    <tr key={course.courseCode} className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                        <td className="px-4 py-3">{course.courseCode}</td>
                                                        <td className="px-4 py-3">{course.courseName}</td>
                                                        <td className="px-4 py-3">{course.credits}</td>
                                                        <td className="px-4 py-3">{ }</td>
                                                    </tr>
                                                ))}

                                                <tr className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-bold">Major subject (Selective)</td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                </tr>
                                                {courseSyllabus.major.courseRecommendation[semesterKey].SELECTION.map((course) => (
                                                    <tr key={course.courseCode} className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                        <td className="px-4 py-3">{course.courseCode}</td>
                                                        <td className="px-4 py-3">{course.courseName}</td>
                                                        <td className="px-4 py-3">{course.credits}</td>
                                                        <td className="px-4 py-3">{ }</td>
                                                    </tr>
                                                ))}

                                                <tr className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-bold">Optional subject (Selective)</td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                </tr>
                                                {courseSyllabus.major.courseRecommendation[semesterKey].OPTIONAL.map((course) => (
                                                    <tr key={course.courseCode} className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                        <td className="px-4 py-3">{course.courseCode}</td>
                                                        <td className="px-4 py-3">{course.courseName}</td>
                                                        <td className="px-4 py-3">{course.credits}</td>
                                                        <td className="px-4 py-3">{ }</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CourseSyllabus;