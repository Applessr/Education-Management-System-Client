
import { adminGetStudent } from '@/src/api/admin';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddStudentForm from './AddStudentForm';
import EditStudentForm from './EditStudentForm';
import UserStatusToggle from '@/src/hooks/UserStatusToggle';

const AdminStudent = () => {
    // State management
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Extract unique faculties from students
    useEffect(() => {
        const uniqueFaculties = [...new Set(students.map(student => student.major?.faculty?.name))].filter(Boolean);
        setFaculties(uniqueFaculties);
    }, [students]);

    const handleStudentAdded = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await adminGetStudent(token);
            setStudents(response.data);
            toast.success('Student list updated successfully');
        } catch (err) {
            console.error("Error fetching students:", err);
            toast.error('Failed to update student list');
        }
    };


    // Filter students based on search term and faculty
    const filteredStudents = students.filter(student => {
        const searchMatch =
            student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.major?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const facultyMatch = selectedFaculty ? student.major?.faculty?.name === selectedFaculty : true;

        return searchMatch && facultyMatch;
    });

    // Handle filter removal
    const handleRemoveFilter = () => {
        setSelectedFaculty('');
        toast.info('Filter removed');
    };

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedFaculty]);

    // Fetch students data
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await adminGetStudent(token);
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to load students");
                toast.error("Failed to load students");
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    // Loading and error states
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Students</h1>

            {/* Search and Filter Section */}
            <div className="mb-6 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by ID, name, email, or major..."
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

            {/* Student List Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 bg-[#1a237e] text-white rounded-t-lg flex justify-between items-center">
                    <h2 className="font-semibold">Student List ({filteredStudents.length} students)</h2>
                    <button
                        className="px-4 py-2 bg-white text-[#1a237e] rounded hover:bg-gray-100"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add Student
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Student ID</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Gender</th>
                                <th className="px-4 py-3 text-left">Faculty</th>
                                <th className="px-4 py-3 text-left">Major</th>
                                <th className="px-4 py-3 text-left">E-mail</th>
                                <th className="px-4 py-3 text-left">Mobile</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((student, index) => (
                                <tr key={student.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3">{student.studentId}</td>
                                    <td className="px-4 py-3">{`${student.firstName} ${student.lastName}`}</td>
                                    <td className="px-4 py-3">{student.gender}</td>
                                    <td className="px-4 py-3">{student.major?.faculty?.name}</td>
                                    <td className="px-4 py-3">{student.major?.name}</td>
                                    <td className="px-4 py-3">{student.email}</td>
                                    <td className="px-4 py-3">{student.phone}</td>
                                    <td className="px-4 py-3">
                                        <UserStatusToggle
                                            user={student}
                                            userType="student"
                                            onStatusChange={handleStudentAdded}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
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
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} students
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
                <AddStudentForm
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={handleStudentAdded}
                />
            )}
            {isEditModalOpen && selectedStudent && (
                <EditStudentForm
                    student={selectedStudent}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedStudent(null);
                    }}
                    onSuccess={handleStudentAdded}
                />
            )}
        </div>
    );
};

export default AdminStudent;