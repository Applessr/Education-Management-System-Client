import React from "react";

function StudentSemesterGradeItem({ semester, courses, gpaInfo }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h3 style={{ color: "blue", textDecoration: "underline" }}>{semester}</h3>
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
      <div style={{ textAlign: "left", margin: "20px 10%" }}>
        <p style={{ color: "blue" }}>
          <strong>
            sem. G.P.A. = {gpaInfo.semGpa} Credit = {gpaInfo.semCredit}
          </strong>
        </p>
        <p style={{ color: "blue" }}>
          <strong>
            cum. G.P.A. = {gpaInfo.cumGpa} Credit = {gpaInfo.cumCredit}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default StudentSemesterGradeItem;
