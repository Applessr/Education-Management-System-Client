import React, { useState } from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { format } from "date-fns"; // Import for formatting dates
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useStudent from "@/src/hooks/useStudent";
import {
  studentGetEnrollCourseBySemester,
  studentSendEnrollRequest,
} from "@/src/api/course";

// Column definitions
export const columns = [
  {
    accessorKey: "courseId",
    header: "course Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("courseId")}</div>
    ),
  },
  {
    accessorKey: "courseCode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "courseCode")
        }
      >
        Course Code
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("courseCode")}</div>
    ),
  },
  {
    accessorKey: "courseName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "courseName")
        }
      >
        Subject Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("courseName")}</div>
    ),
  },
  {
    accessorKey: "credits",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "credits")}
      >
        Credits
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("credits")}</div>
    ),
  },
  {
    accessorKey: "seat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "seat")}
      >
        Seat
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("seat")}</div>,
  },
  {
    accessorKey: "section",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "section")}
      >
        Section
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("section")}</div>
    ),
  },
  {
    accessorKey: "teacherName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "teacherName")
        }
      >
        Teacher ID
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("teacherName")}</div>
    ),
  },
  {
    accessorKey: "day",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "day")}
      >
        Study day
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const dayNumber = row.getValue("day");

      // Map the day number (1 to 5) to the day name
      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const dayName = dayNames[dayNumber - 1]; // Adjust for 0-indexing

      return <div className="capitalize">{dayName}</div>;
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "startTime")
        }
      >
        Start Time
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const startTime = row.getValue("startTime");
      return (
        <div className="capitalize">{format(new Date(startTime), "HH:mm")}</div>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "endTime")}
      >
        End Time
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const endTime = row.getValue("endTime");
      return (
        <div className="capitalize">{format(new Date(endTime), "HH:mm")}</div>
      );
    },
  },
  {
    accessorKey: "room",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "room")}
      >
        Room
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("room")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { getStudentProfile, studentInfo } = useStudent();
      const token = localStorage.getItem("token");
      const currentYear = new Date().getFullYear() + 543;
      console.log(currentYear, "current Year");
      const semester = `1/${currentYear}`;

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const courseId = row.getValue("courseId"); // Get courseId for the row

      const handleConfirmEnroll = (courseId) => {
        // Perform your enroll action here (e.g., API call)
        console.log("Enrolling in course:", courseId, semester, token);
        studentSendEnrollRequest(token, { semester, courseId });
        studentGetEnrollCourseBySemester(token, { semester });
        setIsDialogOpen(false); // Close dialog after confirm
      };

      const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close dialog after cancel
      };

      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>Enroll</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to enroll <br />
                {row.original.courseCode} {row.original.courseName} section :{" "}
                {row.original.section} ?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleConfirmEnroll(courseId)}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

function StudentRegisterPrerequisitesCourses({ data }) {
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
    <div className="flex flex-col p-2 border">
      <div className="bg bg-yellow-300">prerequisites course</div>
      <div>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by course name..."
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
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
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

export default StudentRegisterPrerequisitesCourses;
