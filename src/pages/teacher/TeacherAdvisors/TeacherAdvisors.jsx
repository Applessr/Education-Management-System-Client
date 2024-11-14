import { useEffect, useMemo } from 'react';
import FreshmenTable from "@/src/components/teacher/FreshmenTable";
import SophomoreTable from "@/src/components/teacher/SophomoreTable";
import JuniorTable from "@/src/components/teacher/JuniorTable";
import SeniorTable from "@/src/components/teacher/SeniorTable";
import useTeacher from "@/src/hooks/useTeacher";


const TeacherAdvisors = () => {
  const { teacherGetConsulted, consulted } = useTeacher();
  const token = localStorage.getItem('token');

  useEffect(() => {
    teacherGetConsulted(token);
  }, [token]);

  const data = useMemo(() => {
    return consulted?.students?.flatMap((teacher) =>
      teacher.student.map((student, index) => {
        const gpaValue = student.averageGPA === 0
          ? parseFloat((Math.random() * (4 - 2) + 2).toFixed(2))
          : parseFloat(student.averageGPA);

        return {
          id: index + 1,
          studentId: student.studentId || '',
          name: `${student.firstName} ${student.lastName}`,
          faculty: student.major.faculty.name || "",
          major: student.major.name,
          email: student.email,
          mobile: student.phone,
          CPA: gpaValue,
        };
      })
    ) || [];
  }, [consulted]);

  const freshmenList = [];
  const sophomoreList = [];
  const juniorList = [];
  const seniorList = [];
  const currentYear = new Date().getFullYear() + 543;

  if (data.length > 0) {
    data.forEach((student) => {
      const entryYear = parseInt(student.studentId.toString().substring(0, 2), 10);
      const yearDifference = currentYear - (2500 + entryYear);

      if (yearDifference === 0) {
        freshmenList.push(student);
      } else if (yearDifference === 1) {
        sophomoreList.push(student);
      } else if (yearDifference === 2) {
        juniorList.push(student);
      } else if (yearDifference >= 3) {
        seniorList.push(student);
      }
    });
  }

  return (
    <div>
      <FreshmenTable data={freshmenList} />
      <SophomoreTable data={sophomoreList} />
      <JuniorTable data={juniorList} />
      <SeniorTable data={seniorList} />
    </div>
  );
};

export default TeacherAdvisors;