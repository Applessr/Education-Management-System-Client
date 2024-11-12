
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Edit, Plus } from 'lucide-react';
import { getAllCourse, getAllFaculty, getAllMajor } from '@/src/api/course';
import CourseFormModal from './EditandAddForm';

const AdminCourse = () => {
  // Data states
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);

  // UI states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null); // Changed from empty string to null
  const [selectedMajor, setSelectedMajor] = useState('');

  // Data fetching
  const fetchData = async () => {
    try {
      const semester = "2024/1";
      const [coursesRes, facultiesRes, majorsRes] = await Promise.all([
        getAllCourse(searchTerm, semester),
        getAllFaculty(),
        getAllMajor()
      ]);

      setCourses(coursesRes.data);
      setFaculties(facultiesRes.data);
      setMajors(majorsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  // Filtering logic
  const getFilteredMajors = () => {
    if (!selectedFaculty) return majors;
    const selectedFacultyObj = faculties.find(f => f.name === selectedFaculty);
    return selectedFacultyObj ? majors.filter(major => major.facultyId === selectedFacultyObj.id) : [];
  };

  const getFilteredCourses = () => {
    return courses.filter(course => {
      if (!course.major) return false;
      if (selectedFaculty && course.major?.faculty?.name !== selectedFaculty) return false;
      if (selectedMajor && course.major?.name !== selectedMajor) return false;
      return true;
    });
  };

  // Filter and pagination results
  const filteredMajors = getFilteredMajors();
  const filteredCourses = getFilteredCourses();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Event handlers
  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
    setSelectedMajor('');
    setCurrentPage(1);
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
    setCurrentPage(1);
  };

  // Utility functions
  const getDayText = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day] || '-';
  };

  const formatDateTime = (timeString) => {
    if (!timeString) return '-';
    const date = new Date(timeString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Course List</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by course code or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />

        <select
          value={selectedFaculty}
          onChange={handleFacultyChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Faculties</option>
          {faculties.map(faculty => (
            <option key={faculty.id} value={faculty.name}>
              {faculty.name}
            </option>
          ))}
        </select>

        <select
          value={selectedMajor}
          onChange={handleMajorChange}
          className="p-2 border rounded-lg"
          disabled={!selectedFaculty}
        >
          <option value="">All Majors</option>
          {filteredMajors.map(major => (
            <option key={major.id} value={major.name}>
              {major.name}
            </option>
          ))}
        </select>
      </div>

      {/* Course List Table */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="p-4 bg-amber-700 text-white rounded-t-lg flex justify-between items-center">
          <h2 className="font-semibold">Course List ({filteredCourses.length} courses)</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-white text-amber-700 rounded hover:bg-gray-100 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-center">Cr.</th>
                <th className="px-4 py-3 text-center">Sec.</th>
                <th className="px-4 py-3 text-left">Study Schedule</th>
                <th className="px-4 py-3 text-left">Room</th>
                <th className="px-4 py-3 text-left">Exam Schedule</th>
                <th className="px-4 py-3 text-left">Professor</th>
                <th className="px-4 py-3 text-left">Major</th> {/* New column */}
                <th className="px-4 py-3 text-center">Seat</th>
                <th className="px-4 py-3 text-center">Enroll</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((course, index) => (
                <tr key={course.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">{course.courseCode}</td>
                  <td className="px-4 py-3">{course.courseName}</td>
                  <td className="px-4 py-3 text-center">{course.credits}</td>
                  <td className="px-4 py-3 text-center">{course.section}</td>
                  <td className="px-4 py-3">
                    {course.classSchedules?.map((schedule, idx) => (
                      <div key={idx}>
                        {`${getDayText(schedule.day)} ${formatDateTime(schedule.startTime)} - ${formatDateTime(schedule.endTime)}`}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3">
                    {course.classSchedules?.map((schedule, idx) => (
                      <div key={idx}>{schedule.room}</div>
                    ))}
                  </td>
                  <td className="px-4 py-3">
                    {course.examSchedule?.map((exam, idx) => (
                      <div key={idx} className="text-sm">
                        <div className="font-medium">
                          <span className='font-bold'>{exam.examType}</span>
                        </div>
                        {formatDate(exam.examDate)}
                        <div>{formatDateTime(exam.startTime)} - {formatDateTime(exam.endTime)}</div>
                        <div>Room: {exam.room}</div>
                      </div>
                    )) || '-'}
                  </td>
                  <td className="px-4 py-3">
                    {course.teacher ? `${course.teacher.firstName} ${course.teacher.lastName}` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {course.major ? course.major.name : '-'}
                  </td>
                  <td className="px-4 py-3 text-center">{course.seat}</td>
                  <td className="px-4 py-3 text-center">{course._count?.enrollments || 0}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${course.status
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {course.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsEditModalOpen(true);
                      }}
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCourses.length)} of {filteredCourses.length} courses
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
      <CourseFormModal  
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedCourse(null);
        }}
        onSuccess={fetchData}
        course={selectedCourse}  // Will be null for Add mode, populated for Edit mode
        faculties={faculties}
        majors={majors}
      />
    </div>
  );
};

export default AdminCourse;


