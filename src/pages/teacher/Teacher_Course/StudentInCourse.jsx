import useTeacher from "@/src/hooks/useTeacher";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentTable from "./StudentTable";


const StudentInCourse = () => {
  const { courseCode, section } = useParams();
  const { getStudentIdCourseById, selectCourse, studentInCourse } = useTeacher();
  const token = localStorage.getItem("token");
  const [filteredStudents, setFilteredStudents] = useState([]);
  console.log("Mapped StudentInCourse: ", studentInCourse);
  useEffect(() => {
    getStudentIdCourseById(token, selectCourse);
  }, [token, selectCourse]);

  if (!studentInCourse) {
    return <div>Loading...</div>;
  }
  
  const courseData = {
    courseCode,
    courseName: studentInCourse?.courseName || "",
    section: studentInCourse?.section || "",
  };

  const students = studentInCourse?.enrollments?.map((enrollment) => ({
    id: enrollment.student.id,
    studentId: enrollment.student.studentId || "",
    name: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
    faculty: enrollment.student.major.faculty.name || "",
    major: enrollment.student.major.name || "",
    grades: enrollment.student.grades || [], // This will now contain only the relevant grade for this course
  })) || [];

  console.log("Mapped students:", students);

  const handleFilter = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredStudents([]);
      return;
    }
    
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };
  
  // console.log("getStudentIdCourseById", getStudentIdCourseById);
  return (
    <div>
      <h2 className="text-xl font-semibold text-amber-700 mb-4">
        {courseData.courseCode} {courseData.courseName} (Section {courseData.section})
      </h2>

      <StudentTable
        students={filteredStudents.length > 0 ? filteredStudents : students}
        onFilter={handleFilter}
        courseId={studentInCourse.id}
        refreshData={() => getStudentIdCourseById(token, selectCourse)}
      />
    </div>
  );
};

export default StudentInCourse;