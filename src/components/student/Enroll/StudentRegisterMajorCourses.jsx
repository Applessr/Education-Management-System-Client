import React, { useState, useMemo } from "react";
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
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useStudent from "@/src/hooks/useStudent";

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
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const schedule = row.getValue("schedule");
      return (
        <div>
          {schedule.map(({ day, startTime, endTime }) => (
            <div key={`${day}-${startTime}`}>
              {day} {format(new Date(startTime), "HH:mm")} -{" "}
              {format(new Date(endTime), "HH:mm")}
            </div>
          ))}
        </div>
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
      const token = localStorage.getItem("token");
      const currentYear = 2024;
      const semester = `1/${currentYear}`;
      const {
        studentSendEnrollRequest,
        studentGetEnrollCourseBySemester,
        fetchPendingEnrollment,
      } = useStudent();

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const courseId = row.getValue("courseId");

      const handleConfirmEnroll = async () => {
        await studentSendEnrollRequest(token, { semester, courseId });
        await studentGetEnrollCourseBySemester(token, { semester });
        await fetchPendingEnrollment();
        setIsDialogOpen(false);
      };

      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>Enroll</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to enroll in this course?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConfirmEnroll}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

function StudentRegisterMajorCourses({ data }) {
  // Preprocess data to combine rows with the same courseId
  const processedData = useMemo(() => {
    const courseMap = new Map();
    const dayAbbreviations = ["MON", "TUE", "WED", "THU", "FRI"];

    data.forEach((row) => {
      const { courseId, day, startTime, endTime } = row;
      const dayAbbreviation = dayAbbreviations[day - 1]; // Map day number to abbreviation

      if (!courseMap.has(courseId)) {
        courseMap.set(courseId, {
          ...row,
          schedule: [{ day: dayAbbreviation, startTime, endTime }],
        });
      } else {
        const existing = courseMap.get(courseId);
        existing.schedule.push({ day: dayAbbreviation, startTime, endTime });
      }
    });

    return Array.from(courseMap.values());
  }, [data]);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: processedData,
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
      <div className="bg bg-yellow-300">Major selection Courses</div>
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
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StudentRegisterMajorCourses;
