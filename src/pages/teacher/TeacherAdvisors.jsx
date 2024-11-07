import * as React from "react";
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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CourseScoreEdit from "@/src/components/teacher/CourseScoreEdit";
import FreshmenTable from "@/src/components/teacher/FreshmenTable";
import SophomoreTable from "@/src/components/teacher/SophomoreTable";
import JuniorTable from "@/src/components/teacher/JuniorTable";
import SeniorTable from "@/src/components/teacher/SeniorTable";

//fetch data
const data = [
  {
    id: "1",
    studentId: 660210011,
    name: "Paul William",
    faculty: "Business and Economic",
    major: "Business Administration",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "2",
    studentId: 670210012,
    name: "Alice Johnson",
    faculty: "Science",
    major: "Biology",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "3",
    studentId: 640210013,
    name: "Bob Smith",
    faculty: "Engineering",
    major: "Computer Engineering",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "4",
    studentId: 670210014,
    name: "Charlie Brown",
    faculty: "Arts",
    major: "Literature",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "5",
    studentId: 600210015,
    name: "David Wilson",
    faculty: "Business and Economic",
    major: "Economics",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "6",
    studentId: 630210016,
    name: "Eve Clark",
    faculty: "Science",
    major: "Chemistry",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "7",
    studentId: 660210017,
    name: "Frank White",
    faculty: "Engineering",
    major: "Mechanical Engineering",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "8",
    studentId: 670210018,
    name: "Grace Lewis",
    faculty: "Arts",
    major: "Philosophy",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "9",
    studentId: 660210019,
    name: "Hank Green",
    faculty: "Business and Economic",
    major: "Marketing",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "10",
    studentId: 650210020,
    name: "Ivy Hall",
    faculty: "Science",
    major: "Physics",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "11",
    studentId: 650210021,
    name: "Jack King",
    faculty: "Engineering",
    major: "Civil Engineering",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "12",
    studentId: 660210022,
    name: "Karen Young",
    faculty: "Arts",
    major: "History",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "13",
    studentId: 630210023,
    name: "Leo Martin",
    faculty: "Business and Economic",
    major: "Business Administration",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "14",
    studentId: 640210024,
    name: "Mona Lee",
    faculty: "Science",
    major: "Biology",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "15",
    studentId: 670210025,
    name: "Nina Turner",
    faculty: "Engineering",
    major: "Computer Engineering",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "16",
    studentId: 640210026,
    name: "Oscar Moore",
    faculty: "Arts",
    major: "Literature",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "17",
    studentId: 640210027,
    name: "Paul Scott",
    faculty: "Business and Economic",
    major: "Economics",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "18",
    studentId: 650210028,
    name: "Quincy Adams",
    faculty: "Science",
    major: "Chemistry",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "19",
    studentId: 660210029,
    name: "Rose Baker",
    faculty: "Engineering",
    major: "Mechanical Engineering",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "20",
    studentId: 640210030,
    name: "Sam Cooper",
    faculty: "Arts",
    major: "Philosophy",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "21",
    studentId: 640210031,
    name: "Tina Hill",
    faculty: "Business and Economic",
    major: "Marketing",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "22",
    studentId: 650210032,
    name: "Uma Diaz",
    faculty: "Science",
    major: "Physics",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "23",
    studentId: 650210033,
    name: "Vince Price",
    faculty: "Engineering",
    major: "Civil Engineering",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "24",
    studentId: 640210034,
    name: "Wendy Lopez",
    faculty: "Arts",
    major: "History",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "25",
    studentId: 660210035,
    name: "Xander Knight",
    faculty: "Business and Economic",
    major: "Business Administration",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
  {
    id: "26",
    studentId: 640210036,
    name: "Yara Brooks",
    faculty: "Science",
    major: "Biology",
    email: "pack@gamil.com",
    mobile: 1234567890,
    GPA: 2.5,
    CPA: 2.9,
  },
];

const freshmenList = [];
const sophomoreList = [];
const juniorList = [];
const seniorList = [];
const currentYear = new Date().getFullYear() + 543; // Convert to Buddhist calendar year

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

// console.log("Freshmen:", freshmenList);
// console.log("Sophomores:", sophomoreList);
// console.log("Juniors:", juniorList);
// console.log("Seniors:", seniorList);

const TeacherAdvisors = () => {
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
