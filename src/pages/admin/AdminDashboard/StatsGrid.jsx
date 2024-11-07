import React from 'react';
import { Users, BookOpen, Bookmark, GraduationCap, School } from 'lucide-react';
import StatsCard from './StatsCard';

const StatsGrid = ({ data }) => {
    const statsData = [
        { 
            title: 'Professor', 
            value: data?.teacher?.toString() || '0', 
            icon: Users 
        },
        { 
            title: 'Student', 
            value: data?.student?.toString() || '0', 
            icon: BookOpen 
        },
        { 
            title: 'Subject', 
            value: data?.subject?.toString() || '0', 
            icon: Bookmark 
        },
        { 
            title: 'Faculty', 
            value: data?.faculty?.toString() || '0', 
            icon: School 
        },
        { 
            title: 'Major', 
            value: data?.major?.toString() || '0', 
            icon: GraduationCap 
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {statsData.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                />
            ))}
        </div>
    );
};

export default StatsGrid;