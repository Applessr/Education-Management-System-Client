import React, { useState } from "react";

// Fetch score
const scoreOfThisStudent = [
  { id: 1, type: "Final", point: 12 },
  { id: 2, type: "Attendance", point: 12 },
  { id: 3, type: "Midterm", point: 12 },
  { id: 4, type: "Homework", point: 12 },
];

function CourseScoreEdit({ studentId }) {
  // State to keep track of the selected row's details
  const [selectedRow, setSelectedRow] = useState(null);

  // Function to handle row click
  const handleRowClick = (row) => {
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow?.id === row.id ? null : row
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Scores for Student ID: {studentId}
      </h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Type</th>
            <th className="py-2 px-4 border-b border-gray-200">Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreOfThisStudent.map((score) => (
            <tr
              key={score.id}
              onClick={() => handleRowClick(score)}
              className={`cursor-pointer ${
                selectedRow?.id === score.id ? "bg-blue-100" : ""
              }`}
            >
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                {score.id}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {score.type}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                {score.point}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h3 className="text-md font-semibold">Selected Row Details:</h3>
        {selectedRow ? (
          <div>
            <p>ID: {selectedRow.id}</p>
            <p>Type: {selectedRow.type}</p>
            <p>Score: {selectedRow.point}</p>
          </div>
        ) : (
          <p>No row selected</p>
        )}
      </div>
    </div>
  );
}

export default CourseScoreEdit;
