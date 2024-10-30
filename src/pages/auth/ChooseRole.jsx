import React from 'react'

const ChooseRole = () => {
    return (
        <div className='min-h-screen bg-white'>
            <div className='min-w-screen bg-white h-20'></div>
            <div className='min-w-screen bg-slate-400 h-[54rem] flex flex-col justify-center items-center' >
                <h1 className='text-4xl font-bold'>Welcome to MyPierreUT</h1>
                <h1 className='text-3xl mt-9'>Choose your experience:</h1>
                <div className='flex mt-6'>
                    <button className='border p-2'>Student</button>
                    <button className='border p-2'>Employee</button>
                    <button className='border p-2'>Guest</button>
                </div>
            </div>
        </div>
    )
}

export default ChooseRole
