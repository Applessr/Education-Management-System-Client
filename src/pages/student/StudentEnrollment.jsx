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
  const { getStudentProfile, studentInfo, enrollList } = useStudent();
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

  const filteredEnrollments = enrollList.filter(
    (enrollment) =>
      enrollment.status === "APPROVED" || enrollment.status === "PENDING"
  );

  const fetchSyllabus = async () => {
    if (!token || !studentInfo?.studentId) return;

    try {
      const resp = await studentGetCourseSyllabus(token);

      // Calculate student's year
      const currentYear = 2024;
      const entryYear = parseInt(
        studentInfo.studentId.toString().substring(0, 2),
        10
      );
      const yearDifference = currentYear - (2500 + entryYear - 543);
      // console.log(yearDifference);
      // Get appropriate syllabus based on year
      const year = `1/${yearDifference + 1}`;
      year;
      const syllabusData = resp.data?.major?.courseRecommendation[year] || [];

      setSyllabus(syllabusData);

      console.log("syllabus", syllabusData);

      // Extract course codes by category
      if (syllabusData) {
        setCourseCategories({
          prerequisites:
            syllabusData.PREREQUISITES?.map((item) => item.courseCode) || [],
          optional: syllabusData.OPTIONAL?.map((item) => item.courseCode) || [],
          selection:
            syllabusData.SELECTION?.map((item) => item.courseCode) || [],
        });
      }
    } catch (err) {
      setError("Failed to fetch syllabus data");
      console.error("Error fetching syllabus:", err);
    }
  };

  // Fetch student profile
  useEffect(() => {
    getStudentProfile();
  }, []);

  // Fetch syllabus based on student year
  useEffect(() => {
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

  //prepare data before send prob

  //find filter

  console.log(enrollList, "11111112222222");
  console.log(courseSchedules.prerequisites, "3333333333");

  const findApprovePendingCourse = enrollList.filter((item) => {
    console.log(item.status !== "PENDING", "item");
    if (item.status === "PENDING") return true; //keep PENDING
    if (item.status === "APPROVED") return true; // keep APPROVED
    return false; // filter non pending , approve  out
  });
  const getApprovePendingCourseCourseCode = findApprovePendingCourse.map(
    (item) => item.course.courseCode
  );

  //use filter with data
  //Prerequisites Courses
  const resultPrerequisites = courseSchedules.prerequisites.filter((item) => {
    console.log(getApprovePendingCourseCourseCode.includes(item.courseCode));
    return !getApprovePendingCourseCourseCode.includes(item.courseCode);
  });

  //Optional selection Courses
  const resultOptionalSelections = courseSchedules.optional.filter((item) => {
    console.log(getApprovePendingCourseCourseCode.includes(item.courseCode));
    return !getApprovePendingCourseCourseCode.includes(item.courseCode);
  });

  //Major selection Courses
  const resultMajorSelections = courseSchedules.selection.filter((item) => {
    console.log(getApprovePendingCourseCourseCode.includes(item.courseCode));
    return !getApprovePendingCourseCourseCode.includes(item.courseCode);
  });

  return (
    <div className="flex flex-col gap-2">
      <EnrollmentFlow />
      <CurrentSemesterEnrollment />
      <StudentRegisterPrerequisitesCourses data={resultPrerequisites} />
      <StudentRegisterOptionalCourses data={resultOptionalSelections} />
      <StudentRegisterMajorCourses data={resultMajorSelections} />
    </div>
  );
}

export default StudentEnrollment;
