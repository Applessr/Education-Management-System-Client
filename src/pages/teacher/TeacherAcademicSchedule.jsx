import React from 'react'
import TeacherClassSchedule from './TeacherClassSchedule'
import TeacherExamSchedule from './TeacherExamSchedule'


const TeacherAcademicSchedule = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Academic Schedule</h1>
            </div>

            <div className="space-y-6">
                <TeacherClassSchedule />
                <TeacherExamSchedule />
            </div>
        </div>
    )
}

export default TeacherAcademicSchedule