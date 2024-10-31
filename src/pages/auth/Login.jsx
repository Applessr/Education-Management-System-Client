import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        pierreId: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', formData);
    };

    return (
        <div className='min-h-screen flex'>
            {/* Left side - Cat Image */}
            <div className='hidden lg:block lg:w-1/2 relative'>
                <img 
                    src="/path-to-your-cat-image.jpg"
                    alt="Decorative cat"
                    className='w-full h-full object-cover'
                />
                <div className='absolute bottom-4 left-4 text-white text-sm'>
                    Photo by alexei.potriveala
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-12 lg:px-16 bg-white'>
                <div className='w-full max-w-2xl'> 
                    <div className='flex items-center justify-center gap-3 mb-12'> 
                        <img 
                            src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png"
                            alt="PierreUT Logo"
                            className='h-40 w-40'
                        />
                        <span className='text-3xl font-semibold text-blue-600 border-2 border-blue-300 rounded-lg px-4 py-1'>
                            PierreUT
                        </span>
                    </div>

                    <h2 className='text-4xl font-medium text-center mb-12'> 
                        Nice to see you again
                    </h2>

                    <form onSubmit={handleSubmit} className='space-y-8'> 
                        <div>
                            <label className='block text-lg font-medium text-gray-700 mb-2'> 
                                PierreUT ID
                            </label>
                            <input
                                type="text"
                                name="pierreId"
                                value={formData.pierreId}
                                onChange={handleChange}
                                className='w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Email or phone number'
                            />
                        </div>

                        <div>
                            <label className='block text-lg font-medium text-gray-700 mb-2'> 
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter password'
                                />
                                <button 
                                    type="button"
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl'
                                >
                                    👁️
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                />
                                <label className='ml-3 block text-lg text-gray-700'> 
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className='text-lg text-blue-600 hover:text-blue-500'> 
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className='w-full bg-blue-600 text-white rounded-lg py-4 px-6 text-xl hover:bg-blue-700 transition-colors font-medium mt-6'
                        >
                            Sign In
                        </button>
                    </form>

                    <div className='mt-12 text-sm text-gray-600 space-y-4'>
                        <p>
                            Unauthorized use of university computer and networking resources is prohibited. 
                            If you log in, you acknowledge your awareness of and consent to the 
                            university's policies on acceptable computer system use, found in the 
                            Rules. The university will prosecute violators to the full extent of the law. The 
                            computers and printers in this facility are for the use by patrons authorized to 
                            use the university's authentication system.
                        </p>
                        <p>
                            Last Updated: 08/2023
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login