import { forgetPassword } from '@/src/api/auth';
import SendMail from '@/src/components/animations/SendMail';
import useUser from '@/src/hooks/useUser';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    const hdlOnChange = (e) => {
        setEmail(e.target.value);
    };

    const hdlSubmit = async () => {
        setLoading(true);
        try {
            const body = { email: email };
            await forgetPassword(body);
            setFormErrors('')
            setIsDialogOpen(true);
        } catch (err) {
            console.log('Error detail:', err.response?.data?.message || 'An error occurred');
            toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
            setFormErrors(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        navigate('/');
    };

    return (
        <div className='relative min-h-screen flex '
            style={{
                backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730878665/bg-login_a0gvdw.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: '1px 1px',
            }}>
            <div className='absolute inset-0 bg-white bg-opacity-75'></div>

            {/* Right side - Login Form */}
            <div className='relative w-full  m-36  flex flex-col items-center justify-center px-8 py-12 lg:px-16 bg-white rounded-2xl '>
                {loading ? (
                    <SendMail />
                ) : (
                    <div className='w-full max-w-2xl px-14 scale-up-center-Login'>
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
                            Forget Password
                        </h2>

                        <form className='space-y-8'>
                            <div>
                                <label className='block text-lg font-medium text-[#272988] mb-2'>
                                    Email
                                </label>
                                <input
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={hdlOnChange}
                                    className={`w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${formErrors && 'border-red-500'}`}
                                    placeholder='Email for reset your password'
                                />
                                {formErrors && (
                                    <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">{formErrors}</div>)}
                            </div>
                            <button
                                type="button"
                                onClick={hdlSubmit}
                                disabled={loading}
                                className='w-full bg-[#272988] text-white rounded-lg py-4 px-6 text-xl hover:bg-blue-700 transition-colors font-semibold mt-4'
                            >
                                Send
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
                )}
            </div>

            {/* Dialog for Success Message */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                        <h3 className="text-xl font-bold mb-4 text-[#272988]">Password Reset Link Sent</h3>
                        <p className="mb-6">We have sent a reset password link to your email. Please check it.</p>
                        <button
                            onClick={handleDialogClose}
                            className="bg-[#272988] text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;