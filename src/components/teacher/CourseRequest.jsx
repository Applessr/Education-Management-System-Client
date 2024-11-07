import * as React from "react";
import CourseRequestItem from "./CourseRequestItem";

//fetch data
const EnrollData = [
  {
    id: 1,
    section: 801,
    courseCode: 101234,
    courseName: "ECON1",
    enrollments: [
      {
        id: "1",
        studentId: 640210011,
        name: "Paul William",
        faculty: "Business and Economic",
        major: "Business Administration",
        status: "Approved",
        note: "change section",
        score: 76,
      },
      
    ],
  },
  
  
];

const handleApprove = (student) => {
  console.log("Approved studentId:", student.studentId);
  // Implement your approve logic here
};

const handleReject = (student) => {
  console.log("Reject studentId:", student.studentId);
  // Implement your reject logic here
};

//fetch courseRequest

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
    accessorKey: "note",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "note")}
        >
          Note
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("note")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => handleApprove(row.original.studentId)}
        >
          Approved
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleReject(row.original.studentId)}
        >
          Reject
        </Button>
      </div>
    ),
  },
];

function CourseRequest() {
  return (
    <div>
      {EnrollData.map((data) => (
        <CourseRequestItem
          key={data.id}
          course={data}
          data={data.enrollments}
        />
      ))}
    </div>
  );
}

export default CourseRequest;
