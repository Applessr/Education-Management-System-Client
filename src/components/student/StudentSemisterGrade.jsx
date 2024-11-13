import React from "react";
import StudentSemesterGradeItem from "./StudentSemesterGradeItem";

function StudentSemesterGrade({ semester }) {
  console.log('semester :>> ', semester);

  return (
    <div>
      {semester && semester?.length > 0 ? (
        semester?.map((semesterData, index) => (
          <StudentSemesterGradeItem
            key={index}
            semester={semesterData?.semester}
            courses={semesterData?.courses}
            gpaInfo={semesterData?.gpaInfo}
          />
        ))
      ) : (
        <p>No semester data available.</p>
      )}
    </div>
  );
}

export default StudentSemesterGrade;
