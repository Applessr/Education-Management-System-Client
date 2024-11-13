import React, { useCallback, useEffect, useState } from "react";
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

import { Button } from "@/components/ui/button";
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
import useTeacher from "@/src/hooks/useTeacher";
import Nodata from "../animations/Nodata";
const CourseRequestItem = ({ course, data }) => {
  const { getEnrollRequest, editEnrollStatus } = useTeacher();
  const token = localStorage.getItem("token");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [actionInProgress, setActionInProgress] = useState(false); // New state to prevent multiple actions

  const handleSortingChange = useCallback((newSorting) => setSorting(newSorting), []);
  const handleColumnFiltersChange = useCallback((newFilters) => setColumnFilters(newFilters), []);
  const handleRowSelectionChange = useCallback((newSelection) => setRowSelection(newSelection), []);

  console.log('loop :>> ');
  // useEffect(() => {
  //   getEnrollRequest(token);
  // }, [token]);

  const columns = [
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="success"
            size="sm"
            onClick={() => handleApprove(row.original)}
            className="btn bg-[#37B041] text-white font-semibold"
          >
            Approved
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleReject(row.original)}
            // onClick={()=>alert('click')}
            className="btn bg-[#FF3B30] text-white font-semibold"
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const rowsData = data.map((student) => ({
    id: student?.id || "N/A",
    studentId: student?.student?.studentId || "N/A",
    name: `${student?.student?.firstName} ${student?.student?.lastName}` || "Unknown",
    faculty: student?.student?.major?.faculty?.name || "N/A",
    major: student?.student?.major?.name || "N/A",
    status: student?.status || "Pending",
  }));

  const table = useReactTable({
    data: rowsData,
    columns: columns,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: handleRowSelectionChange,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handleApprove = async (student) => {
    if (actionInProgress) return; // Prevent further actions while one is in progress

    setActionInProgress(true); // Set flag to true when action starts
    console.log("Approved studentId:", student.id);
    await editEnrollStatus(token, student.id, { status: 'APPROVED' });

    // Wait for the status update to complete, then update state
    await teacherGetEnrollRequestStore(token);
    setActionInProgress(false); // Reset flag after action is done
  };

  const handleReject = async (student) => {
    if (actionInProgress) return; // Prevent further actions while one is in progress

    setActionInProgress(true); // Set flag to true when action starts
    console.log("Reject studentId:", student.id);
    await editEnrollStatus(token, student.id, { status: 'REJECTED' });

    // Wait for the status update to complete, then update state
    await teacherGetEnrollRequestStore(token);
    setActionInProgress(false); // Reset flag after action is done
  };


  return (
    <div>
      {table ? (
        <div>
          <p className="bg-orange-300">
            {course.courseCode} {course.courseName} Sec. {course.section}
          </p>
          <div className="w-full">
            <div className="flex items-center py-4">
              {/* <Input
                placeholder="Filter by name or student ID..."
                value={globalFilter}
                onChange={(event) => {
                  setGlobalFilter(event.target.value);
                  table.setGlobalFilter(event.target.value);
                }}
                className="max-w-sm"
              /> */}
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {/* {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))} */}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
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
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                // disabled={()=>!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                // disabled={()=>!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // <div></div>
        <Nodata />
      )}
    </div>
  );
};

export default CourseRequestItem;