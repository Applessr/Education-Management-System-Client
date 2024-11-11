import React, { useEffect, useState } from "react";
import EnrollmentFlow from "@/src/components/student/Enroll/CourseNode";
import CurrentSemesterEnrollment from "@/src/components/student/Enroll/CurrentSemesterEnrollment";
import StudentRegisterSearch from "@/src/components/student/Enroll/StudentRegisterSearch";
import useStudent from "@/src/hooks/useStudent";
import {
  studentGetClassScheduleByCourseId,
  studentGetCourseSyllabus,
} from "@/src/api/course";
import StudentRegisterPrerequisitesCourses from "@/src/components/student/Enroll/StudentRegisterSearch";
import StudentRegisterOptionalCourses from "@/src/components/student/Enroll/StudentRegisterOptionalCourses";
import StudentRegisterMajorCourses from "@/src/components/student/Enroll/StudentRegisterMajorCourses";

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
      const studentId = studentInfo?.studentId;
      console.log(studentId, "00000000");
      const currentYear = new Date().getFullYear() + 543;
      const entryYear = parseInt(studentId.toString().substring(0, 2), 10);
      const yearDifference = currentYear - (2500 + entryYear);
      console.log(yearDifference);

      if (token && studentId) {
        const resp = await studentGetCourseSyllabus(token);
        const syllabusData = resp.data?.major?.courseRecommendation["1/1"];
        // switch (yearDifference) {
        //   case 0:
        //     syllabusData = resp.data?.major?.courseRecommendation["1/1"];
        //     break;
        //   case 1:
        //     syllabusData = resp.data?.major?.courseRecommendation["1/2"];
        //     break;
        //   case 2:
        //     syllabusData = resp.data?.major?.courseRecommendation["1/3"];
        //     break;

        //   default:
        //     syllabusData = resp.data?.major?.courseRecommendation["1/1"];

        //     break;
        // }

        setSyllabus(syllabusData || []); // Set the fetched syllabus data
      }
    };

    fetchStudentCourse();
  }, [token, studentInfo]);

  // This useEffect will run when syllabus data changes
  useEffect(() => {
    console.log(syllabus);
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
              console.log(resp.data);
              // console.log(studentInfo.majorId);
              schedules.push(
                resp.data.filter((item) => item.majorId == studentInfo.majorId)
              ); // Store the response for each course
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
  // console.log(studentInfo);
  return (
    <div className="flex flex-col gap-2">
      <EnrollmentFlow />
      <CurrentSemesterEnrollment />
      <StudentRegisterPrerequisitesCourses
        data={courseSchedules.prerequisites.flat()}
      />
      <StudentRegisterOptionalCourses data={courseSchedules.optional.flat()} />
      <StudentRegisterMajorCourses data={courseSchedules.selection.flat()} />
    </div>
  );
}

export default StudentEnrollment;
