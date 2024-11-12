
import { useEffect, useState } from "react";
import CourseRequestItem from "./CourseRequestItem";
import useTeacher from "@/src/hooks/useTeacher";


function CourseRequest() {
  const { getEnrollRequest, enroll } = useTeacher();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getEnrollRequest(token);
  }, []);

  console.log('enroll :>> ', enroll);

  const coursesWithPendingEnrollments = enroll
    ? enroll.map((course) => {
        const pendingEnrollments = course.enrollments.filter(
          (enrollment) => enrollment.status === "PENDING"
        );
        return {
          ...course,
          pendingEnrollments,
          pendingCount: pendingEnrollments.length,
        };
      }).filter(course => course.pendingCount > 0) 
    : [];


  return (
    <div>
      {coursesWithPendingEnrollments.map((course) => (
        <div key={course.id}>
          <h2>{course.courseName} ({course.courseCode}) - Pending Requests: {course.pendingCount}</h2>
          <CourseRequestItem
            course={course}
            data={course.pendingEnrollments} 
          />
        </div>
      ))}
    </div>
  );
}

export default CourseRequest;