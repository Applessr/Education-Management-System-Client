import * as React from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons"; // You can use different icons if needed.
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const courseData = [
  {
    courseId: "01101491",
    courseName: "Research Methods in Economics",
    sections: [
      {
        id: 1,
        code: 316,
        name: "Research Methods in Economics",
        credit: 3,
        section: 801,
        studyDay: "Mon 9:00 - 12:00",
        room: "170102",
        examDate: "Mon 30/02/2025 9:00 - 12:00",
        seat: 50,
        enroll: 20,
        add: "-",
      },
      {
        id: 2,
        code: 316,
        name: "Research Methods in Economics",
        credit: 3,
        section: 802,
        studyDay: "Mon 13:00 - 16:00",
        room: "170102",
        examDate: "Mon 30/02/2025 13:00 - 16:00",
        seat: 50,
        enroll: 50,
        add: "-",
      },
    ],
  },
  {
    courseId: "01101281",
    courseName: "Microeconomics I",
    sections: [
      {
        id: 1,
        code: 242,
        name: "Microeconomics I",
        credit: 3,
        section: 809,
        studyDay: "Mon 9:00 - 12:00",
        room: "140102",
        examDate: "Tue 31/01/2025 9:00 - 12:00",
        seat: 50,
        enroll: 50,
        add: "3",
      },
      {
        id: 2,
        code: 242,
        name: "Microeconomics I",
        credit: 3,
        section: 810,
        studyDay: "Mon 13:00 - 16:00",
        room: "140102",
        examDate: "Tue 31/01/2025 13:00 - 16:00",
        seat: 50,
        enroll: 50,
        add: "-",
      },
    ],
  },
];

export default function DataTableCourse() {
  const [openCourses, setOpenCourses] = React.useState({});

  const toggleCourse = (courseId) => {
    setOpenCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">Course</h1>
      {courseData.map((course) => (
        <div key={course.courseId} className="rounded-md shadow border mb-4">
          <div
            className="flex items-center bg-amber-600 text-white p-4 cursor-pointer"
            onClick={() => toggleCourse(course.courseId)}
          >
            {openCourses[course.courseId] ? (
              <ChevronDownIcon className="h-5 w-5 mr-2" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 mr-2" />
            )}
            <span className="font-bold">
              {course.courseId} {course.courseName} ({course.sections.length}{" "}
              Section)
            </span>
          </div>
          {openCourses[course.courseId] && (
            <div className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Cr.</TableHead>
                    <TableHead>Sec.</TableHead>
                    <TableHead>Study Day</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Exam Day</TableHead>
                    <TableHead>Seat</TableHead>
                    <TableHead>Enroll</TableHead>
                    <TableHead>Add</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.sections.map((section) => (
                    <TableRow key={section.id}>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.code}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.credit}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.section}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.studyDay}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.room}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.examDate}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.seat}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.enroll}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`${section.code}/${section.section}`}>
                          {section.add}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
