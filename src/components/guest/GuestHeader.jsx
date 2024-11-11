import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react';

const GuestHeader = () => {
    const navigate = useNavigate()
    return (
        <header className='sticky top-0 z-50 bg-white'>
            <div className='w-full h-[25px] bg-[#272988]'></div>
            <div className="text-[#272988]">
                <div className="gap-6 items-center container mx-auto flex justify-center space-x-8 py-3 text-lg font-semibold">

                    <img
                        src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png"
                        alt="University Logo"
                        className="h-[125px] w-auto cursor-pointer"
                        onClick={() => navigate('/')}
                    />


                    <Link to="/about" className="text-2xl font-bold hover:text-black">ABOUT</Link>
                    <Link to="/academic" className="text-2xl font-bold hover:text-black">ACADEMIC</Link>
                    <Link to="/campus" className="text-2xl font-bold hover:text-black">CAMPUS</Link>
                    <Link to="/activities" className="text-2xl font-bold hover:text-black">ACTIVITIES</Link>
                    <Link to="/authentication" className="text-2xl font-bold  flex items-center gap-3 justify-center">LOGIN <LogIn size={28} /></Link>

                </div>
            </div>

        </header >
    );
}

export default GuestHeader