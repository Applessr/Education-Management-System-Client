import React from 'react';
import { Input } from "@/components/ui/input";
import AddScoreButton from './AddScoreButton';
import EditScoreButton from './EditScoreButton';

const StudentTable = ({ students, onFilter, courseId, refreshData }) => {
    console.log("Students:<><><><>",students);
    const findStudentGrade = (student) => {
        // Check if student has grades array
        if (!student?.grades || !Array.isArray(student.grades) || student.grades.length === 0) {
            return 'N/A';
        }
        console.log(`Student ${student.studentId} grades:`, student.grades);
        // Since we're already filtering by courseId in the backend,
        // we can just take the first grade (there should only be one)
        const grade = student.grades[0];
        return grade ? grade.totalPoint : 'N/A';
    };

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
                        {students.map((student, index) => {
                            const score = findStudentGrade(student);
                            
                            return (
                                <tr key={student.studentId}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{student.studentId}</td>
                                    <td className="p-2">{student.name}</td>
                                    <td className="p-2">{student.faculty}</td>
                                    <td className="p-2">{student.major}</td>
                                    <td className="p-2">{score === 'N/A' ? score : `${score}`}</td>
                                    <td className="p-2">
                                        <div className="flex space-x-2">
                                            <AddScoreButton
                                                courseId={courseId}
                                                student={student}
                                                onScoreUpdate={refreshData}
                                            />
                                            <EditScoreButton 
                                                student={{
                                                    ...student,
                                                    currentGrade: student.grades?.[0]
                                                }}
                                                courseId={courseId}
                                                onScoreUpdate={refreshData}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};





export default StudentTable;