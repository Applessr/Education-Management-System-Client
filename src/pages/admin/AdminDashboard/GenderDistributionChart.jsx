import React from 'react';

const GenderDistributionChart = ({ data }) => {
    // Calculate percentages
    const totalStudents = data?.student || 0;
    const malePercentage = Math.round((data?.maleStudent / totalStudents) * 100) || 0;
    const femalePercentage = Math.round((data?.femaleStudent / totalStudents) * 100) || 0;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Student Gender Distribution</h3>
            <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#eee"
                        strokeWidth="20"
                        fill="none"
                    />
                    {/* Female percentage */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#FFB7B7"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${femalePercentage * 2.51} 251.33`}
                    />
                    {/* Male percentage */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#B7CBFF"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${malePercentage * 2.51} 251.33`}
                        strokeDashoffset={`-${femalePercentage * 2.51}`}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">100%</span>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFB7B7]" />
                    <span className="text-gray-600">Female</span>
                    <span className="font-semibold ml-auto">{femalePercentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#B7CBFF]" />
                    <span className="text-gray-600">Male</span>
                    <span className="font-semibold ml-auto">{malePercentage}%</span>
                </div>
            </div>

            {/* Additional statistics */}
            <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                    <p className="text-sm text-gray-600">Total Male</p>
                    <p className="text-lg font-semibold">{data?.maleStudent || 0}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Total Female</p>
                    <p className="text-lg font-semibold">{data?.femaleStudent || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default GenderDistributionChart;