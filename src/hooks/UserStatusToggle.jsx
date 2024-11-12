import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { adminActiveAccount, adminInactiveAccount, adminChangeStudentStatus } from '@/src/api/admin';
import { toast } from 'react-toastify';

const UserStatusToggle = ({ user, userType, onStatusChange }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async () => {
        try {
            setIsUpdating(true);
            const token = localStorage.getItem('token');
            
            if (!token) {
                toast.error('Authentication token not found');
                return;
            }

            if (userType === 'professor') {
                if (user.active) {
                    await adminInactiveAccount(token, user.id);
                    toast.success('Professor status changed to inactive');
                } else {
                    await adminActiveAccount(token, user.id);
                    toast.success('Professor status changed to active');
                }
            } else if (userType === 'student') {
                const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                await adminChangeStudentStatus(token, user.id, { status: newStatus });
                toast.success(`Student status changed to ${newStatus}`);
            }
            
            onStatusChange?.();
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    // For professors (binary status)
    if (userType === 'professor') {
        return (
            <div className="flex items-center space-x-2">
                <Switch 
                    checked={user.active}
                    onCheckedChange={handleStatusChange}
                    disabled={isUpdating}
                    className={`${user.active ? 'bg-green-500' : 'bg-gray-200'}`}
                />
                <span className={`text-sm ${user.active ? 'text-green-600' : 'text-gray-500'}`}>
                    {isUpdating ? 'Updating...' : user.active ? 'Active' : 'Inactive'}
                </span>
            </div>
        );
    }

    // For students (ACTIVE/INACTIVE status only)
    return (
        <div className="flex items-center space-x-2">
            <Switch 
                checked={user.status === 'ACTIVE'}
                onCheckedChange={handleStatusChange}
                disabled={isUpdating || user.status === 'GRADUATED'}
                className={`${
                    user.status === 'ACTIVE' 
                        ? 'bg-green-500' 
                        : user.status === 'GRADUATED'
                            ? 'bg-blue-500'
                            : 'bg-gray-200'
                }`}
            />
            <span className={`text-sm ${
                user.status === 'ACTIVE' 
                    ? 'text-green-600' 
                    : user.status === 'GRADUATED'
                        ? 'text-blue-600'
                        : 'text-gray-500'
            }`}>
                {isUpdating ? 'Updating...' : user.status}
            </span>
        </div>
    );
};

export default UserStatusToggle;