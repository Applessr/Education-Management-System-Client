import React from 'react'

const GuestHeader = () => {
    return (
        <header>

            {/* Main Navigation Links */}
            <div className="bg-blue-600 text-white">
                <div className="gap-6s container mx-auto flex justify-center space-x-8 py-3 text-lg font-semibold">
                    <div className="flex items-center space-x-4">
                        {/* Replace src with the university logo URL */}
                        <img
                            src="https://example.com/university-logo.png"
                            alt="University Logo"
                            className="h-10"
                        />
                    </div>
                    <a href="#" className="text-2xl font-bold hover:text-black">ABOUT</a>
                    <a href="#" className="text-2xl font-bold hover:text-black">ACADEMIC</a>
                    <a href="#" className="text-2xl font-bold hover:text-black">CAMPUS</a>
                    <a href="#" className="text-2xl font-bold hover:text-black">ACTIVITIES</a>
                    <a href="#" className="text-2xl font-bold hover:text-black">LOGIN</a>
                </div>
            </div>
        </header>
    );
}

export default GuestHeader