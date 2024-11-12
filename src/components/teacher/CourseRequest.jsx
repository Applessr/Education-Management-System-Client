
import { useEffect, useState } from "react";
import CourseRequestItem from "./CourseRequestItem";
import useTeacher from "@/src/hooks/useTeacher";


const CourseRequest = () => {
  const { getEnrollRequest, enroll } = useTeacher();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getEnrollRequest(token);
  }, [token]);

  console.log('enroll :>> ', enroll);

  const coursesWithPendingEnrollments = enroll
    ? enroll.map((course) => {
        const pendingEnrollments = course.enrollments.filter(
          (enrollment) => enrollment.status === "PENDING"
        );
        return {
          ...course,
          enrollments: pendingEnrollments,
          pendingCount: pendingEnrollments.length,
        };
      }).filter(course => course.pendingCount > 0) 
    : [];

  return (
    <div>
      {coursesWithPendingEnrollments.map((course) => (
        <div className="mt-4" key={course.id}>
          <h1 className="text-2xl font-bold text-[#b45309]">Enroll Request</h1>
          <CourseRequestItem
            course={course}
            data={course.enrollments} 
          />
        </div>
      ))}
    </div>
  );
};

export default CourseRequest;