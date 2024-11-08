
import useTeacher from "@/src/hooks/useTeacher";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentTable from "./StudentTable";

const StudentInCourse = () => {
  const { courseCode, section } = useParams();
  const { getStudentIdCourseById, selectCourse, studentInCourse } = useTeacher();
  const token = localStorage.getItem("token");
  const [filteredStudents, setFilteredStudents] = useState([]);
  
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

  const students = studentInCourse?.enrollments?.map((enrollment, index) => ({
    id: index + 1,
    studentId: enrollment.student.studentId || "",
    name: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
    faculty: enrollment.student.major.faculty.name || "",
    major: enrollment.student.major.name || "",
    score: enrollment.student.grades || 0,
  })) || [];

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
