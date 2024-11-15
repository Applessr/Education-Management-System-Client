import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const GenderDistributionChart = ({ 
  data,
  className = "",
  femaleColor = "#FFB7B7",
  maleColor = "#B7CBFF",
}) => {
    // Data preparation
    const totalStudents = data?.student || 0;
    const maleStudents = data?.maleStudent || 0;
    const femaleStudents = data?.femaleStudent || 0;
    
    const chartData = [
        { name: 'Female', value: femaleStudents },
        { name: 'Male', value: maleStudents }
    ];

    const COLORS = [femaleColor, maleColor];

    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#444"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className={`bg-white rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Student Gender Distribution</h3>
                {totalStudents > 0 && (
                    <span className="text-sm text-gray-500">
                        Total: {totalStudents}
                    </span>
                )}
            </div>

            <div className="h-72 w-72 mx-auto relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="45%"
                            innerRadius={70}
                            outerRadius={110}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            labelLine={false}
                            label={renderLabel}
                            animationBegin={0}
                            animationDuration={0}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index]} 
                                />
                            ))}
                            <Label
                                value={totalStudents}
                                position="center"
                                className="text-black text-3xl font-bold"
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors group">
                    <div 
                        className="w-3 h-3 rounded-full transition-transform group-hover:scale-110"
                        style={{ backgroundColor: femaleColor }}
                    />
                    <span className="text-gray-600">Female</span>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="font-semibold">
                            {((femaleStudents / totalStudents) * 100 || 0).toFixed(0)}%
                        </span>
                        <span className="text-sm text-gray-500">
                            ({femaleStudents})
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors group">
                    <div 
                        className="w-3 h-3 rounded-full transition-transform group-hover:scale-110"
                        style={{ backgroundColor: maleColor }}
                    />
                    <span className="text-gray-600">Male</span>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="font-semibold">
                            {((maleStudents / totalStudents) * 100 || 0).toFixed(0)}%
                        </span>
                        <span className="text-sm text-gray-500">
                            ({maleStudents})
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="group cursor-default">
                    <p className="text-sm text-gray-600">Total Male</p>
                    <p className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                        {maleStudents}
                    </p>
                </div>
                <div className="group cursor-default">
                    <p className="text-sm text-gray-600">Total Female</p>
                    <p className="text-lg font-semibold group-hover:text-pink-600 transition-colors">
                        {femaleStudents}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GenderDistributionChart;