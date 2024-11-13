
import React from "react";

function StudentSemesterGradeItem({ semester, courses, gpaInfo }) {
  const newSemester = semester.split('/')
  const year = newSemester[1];
  const semesterNumber = newSemester[0];
  return (
    <div className="semester-grade" style={{ textAlign: "center", fontFamily: "Arial" }} >
      <h3 style={{ color: "blue", textDecoration: "underline" }} className="bg-[#eedcb5] h-8">Semester {semesterNumber} Year {year}</h3>
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
            GPA = {gpaInfo.semGpa} Credit = {gpaInfo.semCredit}
          </strong>
        </p>
        {/* <p style={{ color: "blue" }}>
          <strong>
            CPA = {gpaInfo.cumGpa.toFixed(2)} 
          </strong>
        </p> */}
      </div>
    </div>
  );
}

export default StudentSemesterGradeItem;
