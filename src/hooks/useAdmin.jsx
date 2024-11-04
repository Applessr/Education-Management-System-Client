import React, { useContext } from 'react'
import AdminContext from '../contexts/AdminContext';

const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within a UserProvider');
    }
    return context;
}

export default useAdmin