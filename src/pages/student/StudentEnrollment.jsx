import React, { useEffect } from "react";
import EnrollmentFlow from "@/src/components/student/Enroll/CourseNode";
import CurrentSemesterEnrollment from "@/src/components/student/Enroll/CurrentSemesterEnrollment";
import StudentRegisterSearch from "@/src/components/student/Enroll/StudentRegisterSearch";
import useStudent from "@/src/hooks/useStudent";

function StudentEnrollment() {
  const { getStudentProfile, studentInfo } = useStudent();
  console.log(studentInfo);

  useEffect(() => {
    getStudentProfile();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <EnrollmentFlow />
      <CurrentSemesterEnrollment />
      {/* <StudentRegisterSearch studentInfo={studentInfo} /> */}
    </div>
  );
}

export default StudentEnrollment;
