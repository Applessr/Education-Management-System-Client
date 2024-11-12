import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validateStudentLogin from '../../utils/loginStudentValidator';
import useUser from '../../hooks/useUser';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const { loginStudent, errorLogin } = useUser();
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const hdlOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateStudentLogin(formData);
        if (validationErrors) {
            return setFormErrors(validationErrors);
        }
        try {
            await loginStudent(formData);
        } catch (error) {
            console.log(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className='relative min-h-screen flex'>
            <div className='absolute inset-0 slide-br'
                style={{
                    backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730878665/bg-login_a0gvdw.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: '1px 1px',
                }}>
                <div className='absolute inset-0 bg-white bg-opacity-75'></div>
            </div>
            {/* Right side - Login Form */}
            <div className='relative w-full m-36 flex flex-col items-center justify-center px-8 py-12 lg:px-16 bg-white rounded-2xl slide-tl'>
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
                                className={`w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${formErrors.identifier || errorLogin && 'border-red-500'}`}
                                placeholder='Email or phone number'
                            />
                            {formErrors.identifier && (
                                <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">Student ID or Email is require</div>
                            )}
                            {errorLogin && !formErrors.identifier && !errorLogin.includes('Password') && (
                                <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
                                    email or student ID you entered was not found. Please try again.
                                </div>
                            )}
                        </div>

                        <div>
                            <label className='block text-lg font-medium text-[#272988] mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={hdlOnChange}
                                    className={`w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                         ${formErrors.password || errorLogin && 'border-red-500'}`}
                                    placeholder='Enter password'
                                />
                                {formErrors.password && (
                                    <div className="text-left text-red-500 text-sm dark:text-[#DB5252]">{formErrors.password}</div>
                                )}
                                {typeof errorLogin === 'string' && errorLogin.includes('Password') && !formErrors.password && (
                                    <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
                                        {errorLogin}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl'
                                >
                                    {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                                </button>
                            </div>
                            <div className='text-end pr-4 mt-5 text-[#B1B4B9] font-semibold'>
                                <Link to={`forget-password`}>Forgot password?</Link>
                            </div>
                        </div>

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
    );
};

export default Login;