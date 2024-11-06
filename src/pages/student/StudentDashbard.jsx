import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GraduationCap } from 'lucide-react';

const StudentDashboard = () => {
    const studentInfo = {
        name: "Yui Gahama",
        id: "6300418",
        program: "Business Administration",
        major: "Logistics and Supply Chain Management",
        credits: {
            completed: 33,
            total: 128
        },
        mainSubjects: {
            remaining: 3,
            total: 104
        },
        optionalSubjects: {
            remaining: 3,
            total: 24
        }
    };

    const completedCourses = [
        { code: "01101171", title: "Account", credit: 3, grade: "A" },
        { code: "01101171", title: "Account", credit: 3, grade: "A" },
        { code: "01101171", title: "Account", credit: 3, grade: "A" },
        { code: "01101171", title: "Account", credit: 3, grade: "A" },
        { code: "01101171", title: "Account", credit: 3, grade: "A" }
    ];

    const progressPercentage = (studentInfo.credits.completed / studentInfo.credits.total) * 100;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Progress Overview Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-2xl font-bold">Academic Progress</CardTitle>
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <p className="text-sm font-medium">Credits Progress</p>
                                    <p className="text-sm font-medium">{studentInfo.credits.completed}/{studentInfo.credits.total} Credits</p>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900">Main Subjects</h3>
                                    <p className="text-blue-700">
                                        Remaining: {studentInfo.mainSubjects.remaining}/{studentInfo.mainSubjects.total}
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900">Optional Subjects</h3>
                                    <p className="text-blue-700">
                                        Remaining: {studentInfo.optionalSubjects.remaining}/{studentInfo.optionalSubjects.total}
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
                                <p className="text-lg">{studentInfo.name} : {studentInfo.id}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Program</h3>
                                <p className="text-lg">{studentInfo.program}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Major</h3>
                                <p className="text-lg">{studentInfo.major}</p>
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