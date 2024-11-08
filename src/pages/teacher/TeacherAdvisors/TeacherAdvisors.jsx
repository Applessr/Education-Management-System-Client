import { useEffect, useMemo } from 'react';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useParams } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import CourseScoreEdit from "@/src/components/teacher/CourseScoreEdit";
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
      teacher.student.map((student, index) => ({
        id: index + 1,
        studentId: student.studentId || '',
        name: `${student.firstName} ${student.lastName}`,
        faculty: student.major.faculty.name || "",
        major: student.major.name,
        email: student.email,
        mobile: student.phone, 
        CPA: student.averageGPA,
      }))
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