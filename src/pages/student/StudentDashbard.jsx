import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GraduationCap } from 'lucide-react';
import useStudent from '@/src/hooks/useStudent';

const StudentDashboard = () => {
    const { getStudentProfile, studentInfo, studentGrade, getStudentGetGrade, studentCredit, getStudentGetCredit } = useStudent()
    const token = localStorage.getItem('token');
    const student = {
        name: `${studentInfo?.firstName} ${studentInfo?.lastName}`,
        id: studentInfo?.studentId,
        program: studentInfo?.major?.faculty?.name,
        major: studentInfo?.major?.name,
        credits: {
            completed: studentCredit?.currentCredit,
            total: 144
        },
        mainSubjects: {
            remaining: studentCredit?.enrolledRequiredCredits,
            total: 72
        },
        majorSelect: {
            remaining: studentCredit?.enrolledSelectionCredits,
            total: 24
        },
        optionalSubjects: {
            remaining: studentCredit?.enrolledElectiveCredits,
            total: 48
        }
    };


    useEffect(() => {
        getStudentProfile(token);
        getStudentGetGrade(token);
        getStudentGetCredit(token);
    }, [])


    const completedCourses = useMemo(() => {
        if (!studentGrade) return [];
        return studentGrade.map((grade) => ({
            code: grade?.course?.courseCode,
            title: grade?.course?.courseName,
            credit: 3,
            grade: grade?.letterGrade,
        }));
    }, [studentGrade]);

    const progressPercentage = (student.credits.completed / student.credits.total) * 100;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Progress Overview Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-2xl font-bold">Academic Progress</CardTitle>
                        <GraduationCap className="w-8 h-8 text-[#272988]" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 ">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <p className="text-sm font-medium">Credits Progress</p>
                                    <p className="text-sm font-medium">{student.credits.completed}/{student.credits.total} Credits</p>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900">Main Subjects</h3>
                                    <p className="text-blue-700">
                                        Summary: {student.mainSubjects.remaining}/{student.mainSubjects.total}
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900">Major Selection</h3>
                                    <p className="text-blue-700">
                                        Summary: {student.majorSelect.remaining}/{student.majorSelect.total}
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900">Optional Subjects</h3>
                                    <p className="text-blue-700">
                                        Summary: {student.optionalSubjects.remaining}/{student.optionalSubjects.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Student Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Student Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-500">Name</h3>
                                <p className="text-lg">{student.name} : {student.id}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Program</h3>
                                <p className="text-lg">{student.program}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Major</h3>
                                <p className="text-lg">{student.major}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Completed Courses Table */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Completed Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Code</th>
                                    <th className="text-left py-3 px-4">Subject Title</th>
                                    <th className="text-left py-3 px-4">Credit</th>
                                    <th className="text-left py-3 px-4">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedCourses.map((course, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-3 px-4">{course.code}</td>
                                        <td className="py-3 px-4">{course.title}</td>
                                        <td className="py-3 px-4">{course.credit}</td>
                                        <td className="py-3 px-4">{course.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentDashboard;