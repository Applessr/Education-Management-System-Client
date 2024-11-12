import React, { useEffect, useState } from "react";
import EnrollmentFlow from "@/src/components/student/Enroll/CourseNode";
import CurrentSemesterEnrollment from "@/src/components/student/Enroll/CurrentSemesterEnrollment";
import StudentRegisterOptionalCourses from "@/src/components/student/Enroll/StudentRegisterOptionalCourses";
import StudentRegisterMajorCourses from "@/src/components/student/Enroll/StudentRegisterMajorCourses";
import useStudent from "@/src/hooks/useStudent";
import {
  studentGetClassScheduleByCourseId,
  studentGetCourseSyllabus,
} from "@/src/api/course";
import StudentRegisterPrerequisitesCourses from "@/src/components/student/Enroll/StudentRegisterSearch";

function StudentEnrollment() {
  const { getStudentProfile, studentInfo } = useStudent();
  const token = localStorage.getItem("token");
  const [syllabus, setSyllabus] = useState(null);
  const [courseCategories, setCourseCategories] = useState({
    prerequisites: [],
    optional: [],
    selection: [],
  });
  const [courseSchedules, setCourseSchedules] = useState({
    prerequisites: [],
    optional: [],
    selection: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student profile
  useEffect(() => {
    getStudentProfile();
  }, []);

  // Fetch syllabus based on student year
  useEffect(() => {
    const fetchSyllabus = async () => {
      if (!token || !studentInfo?.studentId) return;

      try {
        const resp = await studentGetCourseSyllabus(token);

        // Calculate student's year
        const currentYear = new Date().getFullYear() + 543;
        const entryYear = parseInt(
          studentInfo.studentId.toString().substring(0, 2),
          10
        );
        const yearDifference = currentYear - (2500 + entryYear);

        // Get appropriate syllabus based on year
        const year = `1/${yearDifference + 1}`;
        const syllabusData = resp.data?.major?.courseRecommendation[year] || [];

        setSyllabus(syllabusData);

        // Extract course codes by category
        if (syllabusData) {
          setCourseCategories({
            prerequisites:
              syllabusData.PREREQUISITES?.map((item) => item.courseCode) || [],
            optional:
              syllabusData.OPTIONAL?.map((item) => item.courseCode) || [],
            selection:
              syllabusData.SELECTION?.map((item) => item.courseCode) || [],
          });
        }
      } catch (err) {
        setError("Failed to fetch syllabus data");
        console.error("Error fetching syllabus:", err);
      }
    };

    fetchSyllabus();
  }, [token, studentInfo]);

  // Fetch course schedules
  useEffect(() => {
    const fetchCourseSchedules = async () => {
      if (!studentInfo?.majorId) return;

      try {
        setLoading(true);
        const newSchedules = { prerequisites: [], optional: [], selection: [] };

        // Fetch schedules for each category
        for (const [category, courses] of Object.entries(courseCategories)) {
          const schedules = await Promise.all(
            courses.map(async (courseCode) => {
              try {
                const resp = await studentGetClassScheduleByCourseId(
                  token,
                  courseCode
                );
                return resp.data.filter(
                  (item) => item.majorId === studentInfo.majorId
                );
              } catch (err) {
                console.error(
                  `Error fetching schedule for ${courseCode}:`,
                  err
                );
                return [];
              }
            })
          );
          newSchedules[category] = schedules.flat();
        }

        setCourseSchedules(newSchedules);
      } catch (err) {
        setError("Failed to fetch course schedules");
        console.error("Error fetching schedules:", err);
      } finally {
        setLoading(false);
      }
    };

    if (
      Object.values(courseCategories).some((category) => category.length > 0)
    ) {
      fetchCourseSchedules();
    }
  }, [courseCategories, studentInfo?.majorId, token]);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div className="p-4">Loading course data...</div>;
  }

  console.log(courseSchedules);

  return (
    <div className="flex flex-col gap-2">
      <EnrollmentFlow />
      <CurrentSemesterEnrollment />
      <StudentRegisterPrerequisitesCourses
        data={courseSchedules.prerequisites}
      />
      <StudentRegisterOptionalCourses data={courseSchedules.optional} />
      <StudentRegisterMajorCourses data={courseSchedules.selection} />
    </div>
  );
}

export default StudentEnrollment;
