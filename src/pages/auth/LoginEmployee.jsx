import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import validateEmployeeLogin from '../../utils/loginvalidator';
import useUser from '../../hooks/useUser';
import { toast } from 'react-toastify';
import LoginGoogle from './LoginGoogle';
import { Eye } from 'lucide-react';

const LoginEmployee = () => {
    const { loginEmployee } = useUser()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const hdlOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateEmployeeLogin(formData)
        if (validationErrors) {
            return setFormErrors(validationErrors);
        }
        try {
            await loginEmployee(formData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative min-h-screen flex '
            style={{
                backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730878665/bg-login_a0gvdw.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: '1px 1px',
            }}>
            <div className='absolute inset-0 bg-white bg-opacity-75'></div>

            {/* Right side - Login Form */}
            <div className='relative w-full m-36  flex flex-col items-center justify-center px-8 py-12 lg:px-16 bg-white rounded-2xl'>

                <div className='w-full max-w-2xl px-14'>
                    <div className='flex items-center justify-start gap-3 mb-12'>
                        <img
                            src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png"
                            alt="PierreUT Logo"
                            className='h-20 w-auto'
                        />
                        <span className='text-4xl font-bold text-[#272988] px-1 py-1'>
                            PierreUT
                        </span>
                    </div>

                    <h2 className='text-3xl font-medium text-start mb-6 text-[#272988]'>
                        Nice to see you again
                    </h2>

                    <form onSubmit={hdlSubmit} className='space-y-8'>
                        <div>
                            <label className='block text-lg font-medium text-[#272988] mb-2'>
                                PierreUT ID
                            </label>
                            <input
                                type="text"
                                name="identifier"
                                value={formData.identifier}
                                onChange={hdlOnChange}
                                className='w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Email or phone number'
                            />
                        </div>

                        <div>
                            <label className='block text-lg font-medium text-[#272988] mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={hdlOnChange}
                                    className='w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter password'
                                />
                                <button
                                    type="button"
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl'
                                >
                                    <Eye size={25}/>
                                </button>
                            </div>
                            <div className='text-end pr-4 mt-5 text-[#B1B4B9] font-semibold'>
                                <p>Forgot password?</p>
                            </div>
                        </div>

                        {/* <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={hdlOnChange}
                                    className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                />
                                <label className='ml-3 block text-lg text-gray-700'> 
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className='text-lg text-blue-600 hover:text-blue-500'> 
                                Forgot password?
                            </Link>
                        </div> */}

                        <button
                            type="submit"
                            className='w-full bg-[#272988] text-white rounded-lg py-4 px-6 text-xl hover:bg-blue-700 transition-colors font-semibold mt-4'
                        >
                            Sign In
                        </button>
                    </form>

                    <div className='mt-6 text-sm text-gray-600 space-y-4'>
                        <p>
                            Unauthorized use of university computer and networking resources is prohibited.
                            If you log in, you acknowledge your awareness of and consent to the
                            university's policies on acceptable computer system use, found in the
                            Rules. The university will prosecute violators to the full extent of the law. The
                            computers and printers in this facility are for the use by patrons authorized to
                            use the university's authentication system.
                        </p>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginEmployee
