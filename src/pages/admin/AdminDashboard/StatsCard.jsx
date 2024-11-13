import React from 'react';

const StatsCard = ({ title, value, icon: Icon, bgColor }) => {
    return (
        <div className={`${bgColor} p-4 rounded-lg shadow-sm`}>
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <span className="text-gray-600 text-sm">{title}</span>
                    <div className="text-2xl font-bold">{value}</div>
                </div>
                <Icon className="w-8 h-8" />
            </div>
        </div>
    );
};

export default StatsCard;