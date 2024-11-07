import React, { useEffect, useState } from 'react';
import { adminActiveAccount, adminGetTeacher, adminInactiveAccount } from '@/src/api/admin';
import { toast } from 'react-toastify';
import { Edit, X } from 'lucide-react';
import EditProfessorForm from './EditProfessorForm';
import AddEmployeeForm from './AddEmployeeForm';

const AdminProfessor = () => {
    // State management
    const [employee, setEmployee] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await adminGetTeacher(token);
            const teachersOnly = response.data.filter(emp => emp.employeeRole === 'TEACHER');
            setEmployee(teachersOnly);
            // Extract unique faculties
            const uniqueFaculties = [...new Set(response.data
                .filter(emp => emp.employeeRole === 'TEACHER')
                .map(emp => emp.major?.faculty?.name))]
                .filter(Boolean);
            setFaculties(uniqueFaculties);

        } catch (err) {
            console.log("Error fetching teachers:", err);
            toast.error("Failed to load teachers");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedFaculty]);

    const hdlEdit = (emp) => {
        setSelectedEmployee(emp);
        setIsEditModalOpen(true);
    };

    const handleStatusChange = async (emp) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login again');
                return;
            }
            if (emp.active) {
                await adminInactiveAccount(token, emp.id);
                toast.success('Teacher status changed to inactive');
            } else {
                await adminActiveAccount(token, emp.id);
                toast.success('Teacher status changed to active');
            }
            fetchEmployees();
        } catch (error) {
            console.error("Error changing status:", error);
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again');
            } else {
                toast.error(error.response?.data?.message || 'Failed to update status');
            }
        }
    };

    // Filter professors based on search term and faculty
    const filteredEmployees = employee.filter(emp => {
        const searchMatch =
            emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.major?.faculty?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const facultyMatch = selectedFaculty ? emp.major?.faculty?.name === selectedFaculty : true;

        return searchMatch && facultyMatch;
    });

    // Handle filter removal
    const handleRemoveFilter = () => {
        setSelectedFaculty('');
        toast.info('Filter removed');
    };

    // Pagination calculations
    // const indexOfLastItem = currentPage * itemsPerPage;  // 2 * 10 = 20
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 20 - 10 = 10
    // const currentItems = filteredEmployees.slice(10, 20); // Gets items 11-20
    // const totalPages = Math.ceil(25 / 10); // = 3 pages total
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Professor</h1>

            {/* Search and Filter Section */}
            <div className="mb-6 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by name, email, or major..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Filter by Faculty
                        </button>
                        {isFilterDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                                <div className="p-2">
                                    {faculties.map((faculty) => (
                                        <button
                                            key={faculty}
                                            onClick={() => {
                                                setSelectedFaculty(faculty);
                                                setIsFilterDropdownOpen(false);
                                                toast.info(`Filtered by ${faculty}`);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                                        >
                                            {faculty}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active filters */}
                {selectedFaculty && (
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                            <span className="text-blue-700">Faculty: {selectedFaculty}</span>
                            <button
                                onClick={handleRemoveFilter}
                                className="text-blue-700 hover:text-blue-900"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Professor List */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 bg-amber-700 text-white rounded-t-lg flex justify-between items-center">
                    <h2 className="font-semibold">List of Professors ({filteredEmployees.length} professors)</h2>
                    <button
                        className="px-4 py-2 bg-white text-[#1a237e] rounded hover:bg-gray-100"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add Professor
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Faculty</th>
                                <th className="px-4 py-3 text-left">E-mail</th>
                                <th className="px-4 py-3 text-left">Mobile</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((emp, index) => (
                                <tr key={emp.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3">{`${emp.firstName} ${emp.lastName || ''}`}</td>
                                    <td className="px-4 py-3">{emp.major?.faculty?.name || '-'}</td>
                                    <td className="px-4 py-3">{emp.email}</td>
                                    <td className="px-4 py-3">{emp.phone || '-'}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleStatusChange(emp)}
                                            className={`px-3 py-1 rounded-full text-sm ${emp.active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {emp.active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => hdlEdit(emp)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 border-t flex items-center justify-between">
                    <div>
                        <span className="text-sm text-gray-700">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} professors
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                            {'<<'}
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                            {'<'}
                        </button>
                        <span className="px-4 py-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                            {'>'}
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                            {'>>'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isAddModalOpen && (
                <AddEmployeeForm
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={fetchEmployees}
                />
            )}
            {isEditModalOpen && selectedEmployee && (
                <EditProfessorForm
                    employee={selectedEmployee}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEmployee(null);
                    }}
                    onSuccess={fetchEmployees}
                />
            )}
        </div>
    );
};

export default AdminProfessor;