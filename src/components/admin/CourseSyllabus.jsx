import useAdmin from '@/src/hooks/useAdmin'
import React, { useState } from 'react'

const CourseSyllabus = () => {
    const { getCourseSyllabus, courseSyllabus, year } = useAdmin();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    console.log(courseSyllabus?.faculty);

    return (
        <div>
            {
                courseSyllabus && (
                    <div className="bg-white rounded-lg shadow">
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
                                                    <td className="px-4 py-3 font-bold">Semester {semesterKey}</td>
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

                                                {['PREREQUISITES', 'OPTIONAL', 'SELECTION'].map((type) => (
                                                    courseSyllabus.major.courseRecommendation[semesterKey][type].map((course) => (
                                                        <tr key={course.courseCode} className="border-t bg-[#F2F8FF] hover:bg-gray-50">
                                                            <td className="px-4 py-3">{course.courseCode}</td>
                                                            <td className="px-4 py-3">{course.courseName}</td>
                                                            <td className="px-4 py-3">{course.credits}</td>
                                                            <td className="px-4 py-3">{ }</td>
                                                        </tr>
                                                    ))
                                                ))}
                                                <tr className="border-t bg-[#F2F8FF] hover:bg-gray-50" >
                                                    <td className="px-4 py-3 font-bold">Major subject (Selective)</td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                    <td className="px-4 py-3"></td>
                                                </tr>
                                            </React.Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default CourseSyllabus;