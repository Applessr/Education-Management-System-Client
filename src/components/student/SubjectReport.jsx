import React from "react";

// Sample score data
const score = {
  totalPoint: 80,
  letterGrade: "A",
  credit: 3,
  course: {
    courseCode: 11111,
    courseName: "Biology for Physicists",
    section: 2,
  },
  components: [
    {
      type: "assignment",
      point: 10,
    },
    {
      type: "midterm",
      point: 40,
    },
    {
      type: "assignment",
      point: 50,
    },
  ],
};

function SubjectReport({ courseId }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Course Report</h2>

      {/* Course Info */}
      <table className="w-full mb-4">
        <tbody>
          <tr className="border-b">
            <td className="p-2 font-medium">Course Code:</td>
            <td className="p-2">{score.course.courseCode}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Course Name:</td>
            <td className="p-2">{score.course.courseName}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Section:</td>
            <td className="p-2">{score.course.section}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Credit:</td>
            <td className="p-2">{score.credit}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Total Points:</td>
            <td className="p-2">{score.totalPoint}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Letter Grade:</td>
            <td className="p-2">{score.letterGrade}</td>
          </tr>
        </tbody>
      </table>

      {/* Components Breakdown */}
      <h3 className="text-xl font-semibold mb-2">Score Breakdown</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b text-left">Type</th>
            <th className="p-2 border-b text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {score.components.map((component, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{component.type}</td>
              <td className="p-2 text-right">{component.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectReport;
