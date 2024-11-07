import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const StudentFacultyDistribution = ({ data }) => {
    // Now we can use the actual facultyStudentCount data
    const chartData = data?.facultyStudentCount?.map(item => ({
        name: item.facultyName,
        students: item.studentCount,
        color: getColor(item.facultyId)
    })) || [];

    // Find maximum value for Y axis domain
    const maxValue = Math.max(...chartData.map(d => d.students), 0) + 5;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Students by Faculty</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                    >
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                            height={60}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis domain={[0, maxValue]} />
                        <Tooltip 
                            formatter={(value) => [`${value} students`, 'Students']}
                            labelStyle={{ color: '#111' }}
                        />
                        <Bar
                            dataKey="students"
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

            {/* Legend */}
            <div className="mt-4 space-y-2">
                {chartData.map((faculty, index) => (
                    <div key={index} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: faculty.color }} 
                            />
                            <span className="text-sm text-gray-600">{faculty.name}</span>
                        </div>
                        <span className="text-sm font-medium">{faculty.students} students</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to generate consistent colors based on faculty ID
const getColor = (id) => {
    const colors = [
        '#FF6B6B', // Coral
        '#4ECDC4', // Turquoise
        '#45B7D1', // Sky Blue
        '#96CEB4', // Sage
        '#FFEEAD', // Light Yellow
    ];
    return colors[id % colors.length];
};

export default StudentFacultyDistribution;