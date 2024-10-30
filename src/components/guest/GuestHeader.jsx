import React from 'react'
import { Link } from 'react-router-dom'

const GuestHeader = () => {
    return (
        <header>
            <div className="bg-blue-600 text-white">
                <div className="gap-6s container mx-auto flex justify-center space-x-8 py-3 text-lg font-semibold">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://example.com/university-logo.png"
                            alt="University Logo"
                            className="h-10"
                        />
                    </div>
                    <Link to="/about" className="text-2xl font-bold hover:text-black">ABOUT</Link>
                    <Link to="/academic" className="text-2xl font-bold hover:text-black">ACADEMIC</Link>
                    <Link to="/campus" className="text-2xl font-bold hover:text-black">CAMPUS</Link>
                    <Link to="/activities" className="text-2xl font-bold hover:text-black">ACTIVITIES</Link>
                    <Link to="/authentication" className="text-2xl font-bold hover:text-black">LOGIN</Link>
                </div>
            </div>
        </header>
    );
}

export default GuestHeader