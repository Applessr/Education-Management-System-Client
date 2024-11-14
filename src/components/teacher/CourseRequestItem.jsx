import React, { useState } from "react";
import useTeacher from "@/src/hooks/useTeacher";
import { ChevronDown, ChevronRight } from "lucide-react";

const CourseRequestItem = ({ course, data }) => {
  const { getEnrollRequest, editEnrollStatus } = useTeacher();
  const token = localStorage.getItem("token");

  const rowsData = data.map((student) => ({
    id: student?.id || "N/A",
    studentId: student?.student?.studentId || "N/A",
    name: `${student?.student?.firstName} ${student?.student?.lastName}` || "Unknown",
    faculty: student?.student?.major?.faculty?.name || "N/A",
    major: student?.student?.major?.name || "N/A",
    status: student?.status || "Pending",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleApprove = async (enrollmentId) => {
    console.log('requestId:', enrollmentId, 'courseId:', course.id, 'courseName:', course.courseName);
    await editEnrollStatus(token, enrollmentId, { status: 'APPROVED', courseId: course.id, courseName: course.courseName });
    getEnrollRequest(token);
  };


  const handleReject = async (enrollmentId) => {
    console.log('requestId:', enrollmentId, 'courseId:', course.id, 'courseName:', course.courseName);
    await editEnrollStatus(token, enrollmentId, { status: 'REJECTED', courseId: course.id, courseName: course.courseName });
    getEnrollRequest(token);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(rowsData.length / itemsPerPage);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsTableVisible(!isTableVisible)}
        className="flex w-full mb-4 px-4 py-4 bg-[#ab842e] text-white font-bold rounded-md text-left">
        {isTableVisible ? <ChevronDown /> : <ChevronRight />}
        <h2 className="text-lg">{course.courseName} ({course.courseCode}) - Pending Requests: {course.enrollments.length}</h2>
      </button>

      {isTableVisible && (
        <div>
          <table className="-mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-[15px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Student ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Faculty</th>
                <th scope="col" className="px-6 py-3">Major</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((student) => (
                  <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.studentId}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.faculty}</td>
                    <td className="px-6 py-4">{student.major}</td>
                    <td className="px-6 py-4 text-[#F2770E]">{student.status}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleApprove(student.id)}
                        className="bg-[#55b361] text-white px-4 py-2 rounded-md mr-2">
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(student.id)}
                        className="bg-red-400 text-white px-4 py-2 rounded-md">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-4">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-end gap-2 items-center mt-4">
            <div className="text-sm text-[#808080]">
              <p>Page {currentPage} of {pageCount}</p>
            </div>

            <div className="flex">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Prev
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRequestItem;
