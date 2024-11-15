import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const FacultyDistributionChart = ({ data, title = "Professors by Faculty" }) => {
    // Transform facultyTeacherCount data for the chart
    const chartData = data?.facultyTeacherCount?.map(item => ({
        name: item.facultyName,
        value: item.teacherCount,
        color: getColor(item.facultyId)
    })) || [];

    // Find maximum value for Y axis domain
    const maxValue = Math.max(...chartData.map(d => d.value), 0) + 2;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md h-[600px]">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 10, left: 0, bottom: 60 }}
                    >
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                            height={90}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis domain={[0, maxValue]} />
                        <Bar
                            dataKey="value"
                            barSize={30}
                            radius={[4, 4, 0, 0]}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Only changed this legend section */}
            <div className="mt-8 space-y-2">
                {chartData.map((faculty, index) => (
                    <div key={index} className="grid grid-cols-[auto,100px] items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: faculty.color }} 
                            />
                            <span className="text-sm text-gray-600">{faculty.name}</span>
                        </div>
                        <span className="text-sm font-medium text-right whitespace-nowrap">
                            {faculty.value} professors
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to generate consistent colors based on faculty ID
const getColor = (id) => {
    const colors = [
        '#4361EE', // Blue
        '#3A0CA3', // Purple
        '#7209B7', // Deep Purple
        '#F72585', // Pink
        '#4CC9F0', // Light Blue
        '#4895EF', // Sky Blue
        '#560BAD', // Dark Purple
        '#B5179E', // Magenta
        '#3F37C9', // Royal Blue
        '#4361EE', // Blue
    ];
    return colors[id % colors.length];
};

export default FacultyDistributionChart;