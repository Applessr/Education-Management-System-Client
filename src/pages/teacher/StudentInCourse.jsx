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
import { Link, useParams } from "react-router-dom";

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
import CourseDetail from "./CourseDetail";

//fetch data

//courseData
const courseData = {
  id: 1,
  courseName: "Research Methods in Economics",
  courseCode: "0110149",
  credits: 3,
  seat: 50,
  teacherId: 2,

  courseSyllabusId: 3,
  section: 801,
  classSchedule: {
    id: 2,
    day: "Monday",
    startTime: "9.00",
    endTime: "12.00",
    room: 890,
  },
  examSchedule: {
    id: 1,
    examDate: "12/13/2025",
    startTime: "9.00",
    endTime: "12:00",
    room: 890,
    examType: "final",
  },

  employee: {
    firstName: "Susan",
    lastName: "Doe",
  },
};

//student
const data = [
  {
    id: "1",
    studentId: 640210011,
    name: "Paul William",
    faculty: "Business and Economic",
    major: "Business Administration",
    status: "Approved",
    score: 76,
  },
  {
    id: "2",
    studentId: 640210012,
    name: "Alice Johnson",
    faculty: "Science",
    major: "Biology",
    status: "Pending",
    score: 80,
  },
  {
    id: "3",
    studentId: 640210013,
    name: "Bob Smith",
    faculty: "Engineering",
    major: "Computer Engineering",
    status: "Approved",
    score: 66,
  },
  {
    id: "4",
    studentId: 640210014,
    name: "Charlie Brown",
    faculty: "Arts",
    major: "Literature",
    status: "Rejected",
    score: 42,
  },
  {
    id: "5",
    studentId: 640210015,
    name: "David Wilson",
    faculty: "Business and Economic",
    major: "Economics",
    status: "Approved",
    score: 99,
  },
  {
    id: "6",
    studentId: 640210016,
    name: "Eve Clark",
    faculty: "Science",
    major: "Chemistry",
    status: "Pending",
    score: 56,
  },
  {
    id: "7",
    studentId: 640210017,
    name: "Frank White",
    faculty: "Engineering",
    major: "Mechanical Engineering",
    status: "Approved",
    score: 76,
  },
  {
    id: "8",
    studentId: 640210018,
    name: "Grace Lewis",
    faculty: "Arts",
    major: "Philosophy",
    status: "Rejected",
    score: 23,
  },
  {
    id: "9",
    studentId: 640210019,
    name: "Hank Green",
    faculty: "Business and Economic",
    major: "Marketing",
    status: "Approved",
    score: 87,
  },
  {
    id: "10",
    studentId: 640210020,
    name: "Ivy Hall",
    faculty: "Science",
    major: "Physics",
    status: "Pending",
    score: 98,
  },
  {
    id: "11",
    studentId: 640210021,
    name: "Jack King",
    faculty: "Engineering",
    major: "Civil Engineering",
    status: "Approved",
    score: 67,
  },
  {
    id: "12",
    studentId: 640210022,
    name: "Karen Young",
    faculty: "Arts",
    major: "History",
    status: "Rejected",
    score: 36,
  },
  {
    id: "13",
    studentId: 640210023,
    name: "Leo Martin",
    faculty: "Business and Economic",
    major: "Business Administration",
    status: "Approved",
    score: 65,
  },
  {
    id: "14",
    studentId: 640210024,
    name: "Mona Lee",
    faculty: "Science",
    major: "Biology",
    status: "Pending",
    score: 76,
  },
  {
    id: "15",
    studentId: 640210025,
    name: "Nina Turner",
    faculty: "Engineering",
    major: "Computer Engineering",
    status: "Approved",
    score: 66,
  },
  {
    id: "16",
    studentId: 640210026,
    name: "Oscar Moore",
    faculty: "Arts",
    major: "Literature",
    status: "Rejected",
    score: 47,
  },
  {
    id: "17",
    studentId: 640210027,
    name: "Paul Scott",
    faculty: "Business and Economic",
    major: "Economics",
    status: "Approved",
    score: 76,
  },
  {
    id: "18",
    studentId: 640210028,
    name: "Quincy Adams",
    faculty: "Science",
    major: "Chemistry",
    status: "Pending",
    score: 98,
  },
  {
    id: "19",
    studentId: 640210029,
    name: "Rose Baker",
    faculty: "Engineering",
    major: "Mechanical Engineering",
    status: "Approved",
    score: 78,
  },
  {
    id: "20",
    studentId: 640210030,
    name: "Sam Cooper",
    faculty: "Arts",
    major: "Philosophy",
    status: "Rejected",
    score: 16,
  },
  {
    id: "21",
    studentId: 640210031,
    name: "Tina Hill",
    faculty: "Business and Economic",
    major: "Marketing",
    status: "Approved",
    score: 65,
  },
  {
    id: "22",
    studentId: 640210032,
    name: "Uma Diaz",
    faculty: "Science",
    major: "Physics",
    status: "Pending",
    score: 48,
  },
  {
    id: "23",
    studentId: 640210033,
    name: "Vince Price",
    faculty: "Engineering",
    major: "Civil Engineering",
    status: "Approved",
    score: 52,
  },
  {
    id: "24",
    studentId: 640210034,
    name: "Wendy Lopez",
    faculty: "Arts",
    major: "History",
    status: "Rejected",
    score: 66,
  },
  {
    id: "25",
    studentId: 640210035,
    name: "Xander Knight",
    faculty: "Business and Economic",
    major: "Business Administration",
    status: "Approved",
    score: "3.45",
  },
  {
    id: "26",
    studentId: 640210036,
    name: "Yara Brooks",
    faculty: "Science",
    major: "Biology",
    status: "Pending",
    score: 55,
  },
];

console.log(data);

const handleAdd = (student) => {
  console.log("Add score studentId:", student.studentId);
  // Implement your approve logic here
};

const handleEdit = (student) => {
  console.log("Edit studentId:", student.studentId);
  // Implement your reject logic here
};

export const columns = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "studentId")
          }
        >
          Student Id
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "name")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "faculty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "faculty")
          }
        >
          Faculty
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("faculty")}</div>
    ),
  },
  {
    accessorKey: "major",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "major")}
        >
          Major
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("major")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "status")
          }
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "score")}
        >
          Score
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("score")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Button variant="success" size="sm">
                Add
              </Button>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Add score for student id : {row.original.studentId}
              </DialogTitle>
              <DialogDescription>
                Add topic and score then click Add
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">
                  Topic :
                </Label>
                <Input id="topic" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Score :
                </Label>
                <Input id="score" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Button variant="success" size="sm">
                Edit
              </Button>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit score for student</DialogTitle>
              <DialogDescription>
                click the topic , Edit topic and score then click Edit
              </DialogDescription>
            </DialogHeader>

            <CourseScoreEdit studentId={row.original.studentId} />

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">
                  Topic :
                </Label>
                <Input id="topic" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Score :
                </Label>
                <Input id="score" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Edit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

///////////////

function StudentInCourse() {
  const { courseCode, section } = useParams();
  console.log(courseCode, section);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div>
        {/* code - subject name -  sec  - studyTime  - room  */}

        <Dialog>
          <DialogTrigger asChild>
            <p
              to={`/teacher/course/${courseCode}`}
              className="bg-orange-300 hover:underline cursor-pointer"
            >
              {courseData.courseCode} {courseData.courseName} ( Section{" "}
              {courseData.section} : {courseData.classSchedule.day}{" "}
              {courseData.classSchedule.startTime} -{" "}
              {courseData.classSchedule.endTime} )
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                <p>
                  {courseData.courseCode} {courseData.courseName}
                </p>
                <p>
                  ( Section {courseData.section} :{" "}
                  {courseData.classSchedule.day}{" "}
                  {courseData.classSchedule.startTime} -{" "}
                  {courseData.classSchedule.endTime} )
                </p>
              </DialogTitle>
              <DialogDescription>
                You can edit study day , exam day , room ,seat by click at Edit
                button
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <CourseDetail courseData={courseData} />
            </div>
            {/* <DialogFooter>
              <Button type="submit">Edit</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>

        {/* <Link
          to={`/teacher/course/${courseCode}`}
          className="bg-orange-300 hover:underline"
        >
          01101491 Research Methods in Economics Sec.801 Mon 9:00 - 12:00 170102
        </Link> */}
      </div>

      <div className="w-full">
        <div className="flex items-center py-4">
          {/* search by name */}

          {/* <Input
            placeholder="Filter name of student..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}

          {/* seach by name and student Id */}
          <Input
            placeholder="Filter by name or student ID..."
            value={table.getState().globalFilter || ""}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
            }}
            className="max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          {/* show select row */}

          {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInCourse;
