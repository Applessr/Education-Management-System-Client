import React, { useContext } from 'react'
import StudentContext from '../contexts/StudentContext';

const useStudent = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudent must be used within a UserProvider');
    }
    return context;
}

export default useStudent