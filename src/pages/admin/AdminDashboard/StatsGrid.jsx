import React from 'react';
import { Users, BookOpen, Bookmark, GraduationCap, School } from 'lucide-react';
import StatsCard from './StatsCard';

const StatsGrid = ({ data }) => {
    const statsData = [
        {
            title: 'Professor',
            value: data?.teacher?.toString() || '0',
            icon: Users,
            color: 'bg-[#DFF3FF]'
        },
        {
            title: 'Student',
            value: data?.student?.toString() || '0',
            icon: BookOpen,
            color: 'bg-[#E7E7E7]'
        },
        {
            title: 'Subject',
            value: data?.subject?.toString() || '0',
            icon: Bookmark,
            color: 'bg-[#DFF3FF]'
        },
        {
            title: 'Faculty',
            value: data?.faculty?.toString() || '0',
            icon: School ,
            color: 'bg-[#E7E7E7]'
        },
        {
            title: 'Major',
            value: data?.major?.toString() || '0',
            icon: GraduationCap,
            color: 'bg-[#DFF3FF]'
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
                    bgColor={stat.color}
                />
            ))}
        </div>
    );
};

export default StatsGrid;