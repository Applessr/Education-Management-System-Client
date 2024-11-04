import React from "react";
import StudentSemesterGradeItem from "./StudentSemesterGradeItem";


function StudentSemisterGrade() {
  //fetch data
  const semesters = [
    {
      semester: "First Semester 2019",
      courses: [
        {
          code: "01213211",
          title: "Materials Science for Engineers",
          grade: "S",
          credit: 3,
        },
        {
          code: "01213513",
          title: "Thermodynamics & Kinetics of Materials",
          grade: "B",
          credit: 4,
        },
        {
          code: "01213591",
          title: "Research Methods in Materials Engineering",
          grade: "A",
          credit: 3,
        },
        {
          code: "01355501",
          title: "English Required by Graduate School",
          grade: "S",
          credit: 3,
        },
      ],
      gpaInfo: {
        semGpa: 3.43,
        semCredit: 7,
        cumGpa: 3.43,
        cumCredit: 7,
      },
    },
    {
      semester: "Second Semester 2019",
      courses: [
        {
          code: "01214001",
          title: "Advanced Engineering Mathematics",
          grade: "A-",
          credit: 4,
        },
        { code: "01214002", title: "Quantum Physics", grade: "B+", credit: 3 },
        { code: "01356001", title: "Technical Writing", grade: "A", credit: 3 },
      ],
      gpaInfo: {
        semGpa: 3.6,
        semCredit: 6,
        cumGpa: 3.52,
        cumCredit: 13,
      },
    },
    // Add more semesters as needed
  ];
  return (
    <div>
      {semesters.map((semesterData, index) => (
        <StudentSemesterGradeItem
          key={index}
          semester={semesterData.semester}
          courses={semesterData.courses}
          gpaInfo={semesterData.gpaInfo}
        />
      ))}
    </div>
  );
}

export default StudentSemisterGrade;
