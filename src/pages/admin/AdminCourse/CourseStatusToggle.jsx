import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { employeeActiveCourse, employeeInactiveCourse } from '@/src/api/course';
import { toast } from 'react-toastify';

const CourseStatusToggle = ({ course, onStatusChange }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggle = async () => {
        try {
            setIsUpdating(true);
            const token = localStorage.getItem('token');

            if (course.status) {
                await employeeInactiveCourse(token, course.id);
                toast.success('Course deactivated successfully');
            } else {
                await employeeActiveCourse(token, course.id);
                toast.success('Course activated successfully');
            }

            // Notify parent component to refresh the course list
            onStatusChange?.();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update course status');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={course.status}
                onCheckedChange={handleToggle}
                disabled={isUpdating}
                className={`${course.status ? 'bg-green-500' : 'bg-gray-200'}`}
            />
            <span className={`text-sm ${course.status ? 'text-green-600' : 'text-gray-500'}`}>
                {course.status ? 'Active' : 'Inactive'}
            </span>
        </div>
    );
};

export default CourseStatusToggle;