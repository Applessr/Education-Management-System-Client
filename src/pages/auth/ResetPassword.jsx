import { resetPassword } from '@/src/api/auth';  // Ensure this API call is correctly implemented in your backend
import SendMail from '@/src/components/animations/SendMail';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromURL = queryParams.get('token');
        if (tokenFromURL) {
            setToken(tokenFromURL);
        }
    }, [location]);

    const isValidPassword = (password) => password.length >= 6;

    const hdlSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!isValidPassword(newPassword)) {
            setFormErrors('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            await resetPassword(token, newPassword);
            toast.success('Password reset successfully');
            setFormErrors('')
            setIsDialogOpen(true);
        } catch (err) {
            console.error('Error resetting password:', err);
            const errorMessage = err.response?.data?.message || 'There was an error resetting your password.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
        navigate('/');
    };

    return (
        <div className='relative min-h-screen flex' style={{
            backgroundImage: 'url(https://res.cloudinary.com/djudr1vzc/image/upload/v1730878665/bg-login_a0gvdw.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >
            <div className='absolute inset-0 bg-white bg-opacity-75'></div>

            <div className='relative w-full m-36 flex flex-col items-center justify-center px-8 py-12 lg:px-16 bg-white rounded-2xl'>
                {loading ? (
                    <SendMail />
                ) : (
                    <div className='w-full max-w-2xl px-14'>
                        <div className='flex items-center justify-start gap-3 mb-12'>
                            <img src="https://i.postimg.cc/mZnSzDB9/Group-7-Project.png" alt="PierreUT Logo" className='h-20 w-auto' />
                            <span className='text-4xl font-bold text-[#272988] px-1 py-1'>PierreUT</span>
                        </div>

                        <h2 className='text-3xl font-medium text-start mb-6 text-[#272988]'>Reset Password</h2>

                        <form onSubmit={hdlSubmit} className='space-y-8'>
                            <div>
                                <label className='block text-lg font-medium text-[#272988] mb-2'>New Password</label>
                                <input
                                    type='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`w-full px-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                        ${formErrors && 'border-red-500'}`}
                                    placeholder='Enter your new password'
                                />
                                {formErrors && (
                                    <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">{formErrors}</div>)}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full bg-[#272988] text-white rounded-lg py-4 px-6 text-xl hover:bg-blue-700 transition-colors font-semibold mt-4'
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Dialog for Success Message */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                        <h3 className="text-xl font-bold mb-4 text-[#272988]">Password Reset Successful</h3>
                        <p className="mb-6">Your password has been successfully reset. Please log in with your new password.</p>
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

export default ResetPassword;