import React, { useEffect, useState } from "react";
import EnrollmentFlow from "@/src/components/student/Enroll/CourseNode";
import CurrentSemesterEnrollment from "@/src/components/student/Enroll/CurrentSemesterEnrollment";
import StudentRegisterSearch from "@/src/components/student/Enroll/StudentRegisterSearch";
import useStudent from "@/src/hooks/useStudent";
import {
  studentGetClassScheduleByCourseId,
  studentGetCourseSyllabus,
} from "@/src/api/course";

function StudentEnrollment() {
  const { getStudentProfile, studentInfo } = useStudent();
  const token = localStorage.getItem("token");
  const [syllabus, setSyllabus] = useState([]);
  const [prerequisitesCourses, setPrerequisitesCourses] = useState([]);
  const [optionalCourses, setOptionalCourses] = useState([]);
  const [selectionCourses, setSelectionCourses] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState({
    prerequisites: [],
    optional: [],
    selection: [],
  });

  useEffect(() => {
    getStudentProfile(); // Ensure you fetch student profile
  }, []);

  useEffect(() => {
    const fetchStudentCourse = async () => {
      if (token) {
        const resp = await studentGetCourseSyllabus(token);
        const syllabusData = resp.data?.major?.courseRecommendation["1/1"];
        setSyllabus(syllabusData || []); // Set the fetched syllabus data
      }
    };
    fetchStudentCourse();
  }, [token]);

  // This useEffect will run when syllabus data changes
  useEffect(() => {
    if (syllabus) {
      // Extract courseCode values only if syllabus is available
      setOptionalCourses(
        syllabus.OPTIONAL?.map((item) => item.courseCode) || []
      );
      setPrerequisitesCourses(
        syllabus.PREREQUISITES?.map((item) => item.courseCode) || []
      );
      setSelectionCourses(
        syllabus.SELECTION?.map((item) => item.courseCode) || []
      );
    }
  }, [syllabus]);

  // Example of using fetchCourseSchedules function
  useEffect(() => {
    if (
      prerequisitesCourses.length > 0 ||
      optionalCourses.length > 0 ||
      selectionCourses.length > 0
    ) {
      const fetchCourseSchedules = async (courses, category) => {
        const schedules = [];
        for (const course of courses) {
          if (token) {
            try {
              const resp = await studentGetClassScheduleByCourseId(
                token,
                course
              );
              console.log(`Schedule for ${course}:`, resp); // Log the response for each course
              schedules.push(resp.data); // Store the response for each course
            } catch (error) {
              console.error(`Error fetching schedule for ${course}:`, error);
            }
          }
        }

        // Update the state for each category
        setCourseSchedules((prevSchedules) => ({
          ...prevSchedules,
          [category]: schedules,
        }));
      };

      // Fetch schedules for prerequisites, optional, and selection courses
      fetchCourseSchedules(prerequisitesCourses, "prerequisites");
      fetchCourseSchedules(optionalCourses, "optional");
      fetchCourseSchedules(selectionCourses, "selection");
    }
  }, [prerequisitesCourses, optionalCourses, selectionCourses, token]);

  console.log(courseSchedules.prerequisites);
  console.log(courseSchedules.optional);
  console.log(courseSchedules.selection);

  return (
    <div className="flex flex-col gap-2">
      <EnrollmentFlow />
      <CurrentSemesterEnrollment />
      <StudentRegisterSearch data={courseSchedules.prerequisites.flat()} />
    </div>
  );
}

export default StudentEnrollment;
