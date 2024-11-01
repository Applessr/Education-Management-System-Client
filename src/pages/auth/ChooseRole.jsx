import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChooseRole = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        if (role === 'student') {
            navigate('/authentication/login');
        } else if (role === 'employee') {
            navigate('/authentication/login-employee');
        } else {
            navigate('/');
        }
    }

    return (
        <div className='min-h-screen bg-white'>
            <div className='min-w-screen bg-white h-20'></div>
            <div className='min-w-screen bg-slate-400 h-[54rem] flex flex-col justify-center items-center' >
                <h1 className='text-4xl font-bold'>Welcome to MyPierreUT</h1>
                <h1 className='text-3xl mt-9'>Choose your experience:</h1>
                <div className='flex mt-6 space-x-4'>
                    <button
                        onClick={() => handleRoleSelect('student')}
                        className='border p-4 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold'
                    >
                        Student
                    </button>
                    <button
                        onClick={() => handleRoleSelect('employee')}
                        className='border p-4 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold'
                    >
                        Employee
                    </button>
                    <button
                        onClick={() => handleRoleSelect('guest')}
                        className='border p-4 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold'
                    >
                        Guest
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChooseRole