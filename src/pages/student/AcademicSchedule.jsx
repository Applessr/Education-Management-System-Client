import React from 'react';
import ClassSchedule from './ClassSchedule';
import ExamSchedule from './ExamSchedule';


const AcademicSchedule = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Academic Schedule</h1>
            </div>

            <div className="space-y-6">
                <ClassSchedule />
                <ExamSchedule />
            </div>
        </div>
    );
};

export default AcademicSchedule;