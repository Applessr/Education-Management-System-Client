import React from "react";

// API 53
const enrollmentData = {
  studentId: "640110001",
  email: "elizabeth.wilson@pierre.university.edu",
  firstName: "Elizabeth",
  lastName: "Wilson",
  enrollments: [
    {
      id: 1,
      status: "PENDING",
      course: {
        id: 32,
        courseName: "Fundamental of Organic",
        credit: 3,
        section: 2,
      },
    },
    {
      id: 2,
      status: "PENDING",
      course: {
        id: 33,
        courseName: "Materials Selection",
        credit: 3,
        section: 2,
      },
    },
  ],
};

function CurrentSemesterEnrollment() {
  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Current Semester Enrollment
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Course Name
            </th>
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Credit
            </th>
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Section
            </th>
          </tr>
        </thead>
        <tbody>
          {enrollmentData.enrollments.map((enrollment) => (
            <tr key={enrollment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                {enrollment.course.courseName}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                {enrollment.course.credit}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                {enrollment.course.section}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentSemesterEnrollment;
