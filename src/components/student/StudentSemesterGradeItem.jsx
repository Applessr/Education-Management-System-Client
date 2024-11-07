
import React from "react";

function StudentSemesterGradeItem({ semester, courses, gpaInfo }) {
  return (
    <div className="semester-grade" style={{ textAlign: "center", fontFamily: "Arial" }} >
      <h3 style={{ color: "blue", textDecoration: "underline" }} className="bg-[#eedcb5] h-8">{semester}</h3>
      <table
        border="1"
        style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse" }}
      >
        <thead className="w-full">
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Grade</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.grade}</td>
              <td>{course.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "right", margin: "20px 10%" }} >
        <p style={{ color: "blue" }}>
          <strong>
            sem. GPA = {gpaInfo.semGpa} Credit = {gpaInfo.semCredit}
          </strong>
        </p>
        <p style={{ color: "blue" }}>
          <strong>
            cum. GPA = {gpaInfo.cumGpa} Credit = {gpaInfo.cumCredit}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default StudentSemesterGradeItem;
