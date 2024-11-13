import { useEffect } from "react";
import CourseRequestItem from "./CourseRequestItem";
import useTeacher from "@/src/hooks/useTeacher";
import Enroll from "../animations/Enroll";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#ab842e]">Enroll Request</h1>
      {coursesWithPendingEnrollments.length > 0 ? (
        coursesWithPendingEnrollments.map((course) => (
          <div className="mt-4" key={course.id}>
            <CourseRequestItem
              course={course}
              data={course.enrollments}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Enroll />
          <h1 className="text-2xl text-[#b9b3b3]">No enroll request...</h1>
        </div>
      )}
    </div>
  );
};

export default CourseRequest;