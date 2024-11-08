import React from 'react';
import { Input } from "@/components/ui/input";
import AddScoreButton from './AddScoreButton';
import EditScoreButton from './EditScoreButton';

const StudentTable = ({ students, onFilter, courseId,refreshData }) => {
    console.log(students);
    console.log("StudentTable - received courseId:", courseId); 
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by name or student ID..."
                    onChange={(e) => onFilter(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">Student ID</th>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Faculty</th>
                            <th className="p-2 text-left">Major</th>
                            <th className="p-2 text-left">Score</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.studentId}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{student.studentId}</td>
                                <td className="p-2">{student.name}</td>
                                <td className="p-2">{student.faculty}</td>
                                <td className="p-2">{student.major}</td>
                                <td className="p-2">{student.score[0].totalPoint}</td>
                                <td className="p-2">
                                    <div className="flex space-x-2">
                                        <AddScoreButton
                                            courseId={courseId}
                                            student={student}
                                            onScoreUpdate={refreshData} />
                                        <EditScoreButton 
                                        student={student}
                                        courseId= {courseId}
                                        onScoreUpdate={refreshData} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
// 
export default StudentTable;