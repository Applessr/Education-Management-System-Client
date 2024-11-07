import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { adminRegisterTeacher } from '@/src/api/admin';

const AddEmployeeForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        majorId: ''
    });

    const [isGoogleAccount, setIsGoogleAccount] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Authentication token not found. Please login again.');
                return;
            }
    
            const submitData = isGoogleAccount
                ? {
                    ...formData,
                    password: undefined,
                    majorId: parseInt(formData.majorId)  // Convert to number
                }
                : {
                    ...formData,
                    majorId: parseInt(formData.majorId)  // Convert to number
                };

            await adminRegisterTeacher(token, submitData);
            toast.success('Teacher added successfully');
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error adding teacher:', error);
            toast.error(error?.response?.data?.message || 'Failed to add teacher');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Teacher</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    {/* Google Account Toggle */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="googleAccount"
                            checked={isGoogleAccount}
                            onChange={(e) => setIsGoogleAccount(e.target.checked)}
                            className="rounded text-amber-700 focus:ring-amber-500"
                        />
                        <label htmlFor="googleAccount" className="text-sm text-gray-600">
                            Will use Google Account to login
                        </label>
                    </div>

                    {/* Show password field only if not using Google Account */}
                    {!isGoogleAccount && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                required
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                required
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Major ID
                        </label>
                        <input
                            type="text"
                            name="majorId"
                            value={formData.majorId}
                            onChange={handleChange}
                            placeholder="Enter major ID"
                            required
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 hover:text-gray-700 border rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Teacher'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeForm;