import { adminRegisterStudent } from '@/src/api/admin';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddStudentForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        studentId: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        gender: 'MALE',
        address: '',
        admitDate: '',
        majorId: '',
        adviserId: ''
    });
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
    
            const formattedData = {
                ...formData,
                dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
                admitDate: new Date(formData.admitDate).toISOString(),
                majorId: parseInt(formData.majorId),
                adviserId: formData.adviserId ? parseInt(formData.adviserId) : null
            };
    
            await adminRegisterStudent(token, formattedData);
            toast.success('Student registered successfully'); // Add success toast
            onSuccess();
            onClose();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to register student');
            toast.error(err.response?.data?.message || 'Failed to register student'); // Add error toast
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Register New Student</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Student ID*</label>
                            <input
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email*</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                pattern="[a-z0-9._%+-]+@pierre\.university\.edu"
                                title="Must be a valid pierre.university.edu email"
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password*</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                                minLength="8"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone*</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                pattern="[0-9]{10}"
                                title="Phone number should be 10 digits"
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender*</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Admit Date*</label>
                            <input
                                type="date"
                                name="admitDate"
                                value={formData.admitDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Major ID*</label>
                            <input
                                type="number"
                                name="majorId"
                                value={formData.majorId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Adviser ID</label>
                            <input
                                type="number"
                                name="adviserId"
                                value={formData.adviserId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Register Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;