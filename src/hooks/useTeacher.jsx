import React, { useContext } from 'react'
import TeacherContext from '../contexts/TeacherContext';

const useTeacher = () => {
    const context = useContext(TeacherContext);
    if (!context) {
        throw new Error('useTeacher must be used within a UserProvider');
    }
    return context;
}

export default useTeacher