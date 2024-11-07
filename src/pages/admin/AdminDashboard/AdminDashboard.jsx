import { adminGetOverall } from '@/src/api/admin';
import React, { useEffect, useState } from 'react';
import StatsGrid from './StatsGrid';
import GenderDistributionChart from './GenderDistributionChart';
import FacultyDistributionChart from './FacultyDistributionChart';
import StudentFacultyDistribution from './StudentFacultyDistribution';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await adminGetOverall(token);
                setDashboardData(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            {/* Stats Cards */}
            <StatsGrid data={dashboardData} />
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FacultyDistributionChart data={dashboardData} />
                <GenderDistributionChart data={dashboardData} />
                <StudentFacultyDistribution data={dashboardData} />
            </div>
        </div>
    );
};

export default AdminDashboard;