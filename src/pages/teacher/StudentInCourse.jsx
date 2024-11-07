import { useEffect, useState } from "react";
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
import useTeacher from "@/src/hooks/useTeacher";

export const columns = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "studentId",
    header: "Student Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("studentId")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
    cell: ({ row }) => <div className="capitalize">{row.getValue("faculty")}</div>,
  },
  {
    accessorKey: "major",
    header: "Major",
    cell: ({ row }) => <div className="capitalize">{row.getValue("major")}</div>,
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => <div className="capitalize">{row.getValue("score")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Button variant="success" size="sm">Add</Button>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add score for student id : {row.original.studentId}</DialogTitle>
              <DialogDescription>Add topic and score then click Add</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">Topic :</Label>
                <Input id="topic" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">Score :</Label>
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
              <Button variant="success" size="sm">Edit</Button>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit score for student</DialogTitle>
              <DialogDescription>click the topic , Edit topic and score then click Edit</DialogDescription>
            </DialogHeader>
            <CourseScoreEdit studentId={row.original.studentId} />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">Topic :</Label>
                <Input id="topic" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">Score :</Label>
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

function StudentInCourse() {
  const { courseCode, section } = useParams();
  const { getStudentIdCourseById, selectCourse, studentInCourse } = useTeacher();
  const token = localStorage.getItem("token");

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    getStudentIdCourseById(token, selectCourse);
  }, [token]);

  const courseData = {
    courseCode,
    courseName: studentInCourse?.courseName || "",
    section: studentInCourse?.section || "",
    
  };

  const data =
    studentInCourse?.enrollments?.map((enrollment, index) => ({
      id: index + 1,
      studentId: enrollment.student.studentId || "",
      name: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
      faculty: enrollment.student.major.faculty.name || "",
      major: enrollment.student.major.name || "",
      status: "",
      score: enrollment.student.grades || 0,
    })) || [];

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
        {/* Display course code and name */}
        <Dialog>
          <DialogTrigger asChild>
            <p className="bg-orange-300 hover:underline cursor-pointer">
              {courseData.courseCode} {courseData.courseName} (Section {courseData.section})
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {courseData.courseCode} {courseData.courseName} (Section {courseData.section})
              </DialogTitle>
              <DialogDescription>Edit details by clicking Edit.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <CourseDetail courseData={courseData} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by name or student ID..."
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
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
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
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
                      {header.isPlaceholder ? null : (
                        <div
                          className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" && (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <CaretSortIcon className="ml-2 h-4 w-4 rotate-180" />
                          )}
                        </div>
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
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default StudentInCourse;
