import { useState, useCallback, useEffect } from "react";
import { nanoid } from "nanoid"; // ใช้สร้าง ID สำหรับโหนดใหม่
import { CirclePlus } from "lucide-react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { alternatives } from "joi";
import SubjectReport from "../SubjectReport";

//node type
// import MajorRegisNode from "./Enroll/MajorRegisNode";
// import OptionalCourseNode from "./Enroll/OptionalCourseNode";
// import PastSubject from "./Enroll/PastSubject";
// import MajorSelection from "./Enroll/MajorSelection";
import SemesterHeader from "./SemesterHeader";
import MajorNormalNode from "./MajorNormalNode";
import { studentGetAllGrade } from "@/src/api/grade";

const nodeTypes = {
  majorNormalNode: MajorNormalNode,
  semesterHeader: SemesterHeader,
};

const SEMESTER_SPACING = 800;
const VERTICAL_SPACING = 300;
const HEADER_SPACING = 10;

export default function EnrollmentFlow() {
  const [studentGrade, setStudentGrade] = useState([]);

  const [initialNodes, setInitialNodes] = useState([
    // First Semester 2019 Header
    {
      id: "header-1",
      type: "semesterHeader",
      position: createNodePosition(0, 0, true),
      data: {
        label: "First Semester ",
      },
    },
    // First Semester 2019 Courses
    {
      id: "102101",
      type: "majorNormalNode",
      position: createNodePosition(0, 0),
      data: {
        code: "102101",
        name: "General Chemistry",
        grade: "-",
        credits: "3",
        prerequisites: [],
      },
    },
    {
      id: "100101",
      type: "majorNormalNode",
      position: createNodePosition(0, 2),
      data: {
        code: "100101",
        name: "Calculus I",
        grade: "-",
        credits: "3",
        prerequisites: [],
      },
    },
    {
      id: "102102",
      type: "majorNormalNode",
      position: createNodePosition(0, 4),
      data: {
        code: "102102",
        name: "Physics for Chemists I",
        grade: "-",
        credits: "3",
        prerequisites: [],
      },
    },

    // Second Semester 2019 Header
    {
      id: "header-2",
      type: "semesterHeader",
      position: createNodePosition(1, 0, true),
      data: {
        label: "Second Semester",
      },
    },
    // Second Semester 2019 Courses
    {
      id: "102201",
      type: "majorNormalNode",
      position: createNodePosition(1, 0),
      data: {
        code: "102201",
        name: "General Chemistry II",
        grade: "-",
        credits: "3",
        prerequisites: ["102101"],
      },
    },
    {
      id: "100102",
      type: "majorNormalNode",
      position: createNodePosition(1, 2),
      data: {
        code: "100102",
        name: "Calculus II",
        grade: "-",
        credits: "3",
        prerequisites: ["100101"],
      },
    },
    {
      id: "102202",
      type: "majorNormalNode",
      position: createNodePosition(1, 4),
      data: {
        code: "102202",
        name: "Physics for Chemists II",
        grade: "-",
        credits: "3",
        prerequisites: ["102102"],
      },
    },

    // First Semester 2020 Header
    {
      id: "header-3",
      type: "semesterHeader",
      position: createNodePosition(2, 0, true),
      data: {
        label: "Third Semester",
      },
    },
    // First Semester 2020 Courses
    {
      id: "102301",
      type: "majorNormalNode",
      position: createNodePosition(2, 0),
      data: {
        code: "102301",
        name: "Organic Chemistry I",
        grade: "-",
        credits: "3",
        prerequisites: ["102201"],
      },
    },
    {
      id: "102302",
      type: "majorNormalNode",
      position: createNodePosition(2, 2),
      data: {
        code: "102302",
        name: "Analytical Chemistry I",
        grade: "-",
        credits: "3",
        prerequisites: ["102201"],
      },
    },
    {
      id: "102303",
      type: "majorNormalNode",
      position: createNodePosition(2, 4),
      data: {
        code: "102303",
        name: "Physical Chemistry I ",
        grade: "-",
        credits: "3",
        prerequisites: ["102201", "100102"],
      },
    },

    // Second Semester 2020 Header
    {
      id: "header-4",
      type: "semesterHeader",
      position: createNodePosition(3, 0, true),
      data: {
        label: "Forth Semester",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "102401",
      type: "majorNormalNode",
      position: createNodePosition(3, 0),
      data: {
        code: "102401",
        name: "Organic Chemistry II",
        grade: "-",
        credits: "3",
        prerequisites: ["102301"],
      },
    },
    {
      id: "102402",
      type: "majorNormalNode",
      position: createNodePosition(3, 2),
      data: {
        code: "102402",
        name: "Analytical Chemistry II",
        grade: "-",
        credits: "3",
        prerequisites: ["102302"],
      },
    },
    {
      id: "102403",
      type: "majorNormalNode",
      position: createNodePosition(3, 4),
      data: {
        code: "102403",
        name: "Physical Chemistry II",
        grade: "-",
        credits: "3",
        prerequisites: ["102303"],
      },
    },
    {
      id: "102404",
      type: "majorNormalNode",
      position: createNodePosition(3, 6),
      data: {
        code: "102404",
        name: "Biochemistry I",
        grade: "-",
        credits: "3",
        prerequisites: [],
      },
    },

    {
      id: "header-5",
      type: "semesterHeader",
      position: createNodePosition(4, 0, true),
      data: {
        label: "Fifth Semester",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "102501",
      type: "majorNormalNode",
      position: createNodePosition(4, 0),
      data: {
        code: "102501",
        name: "Inorganic Chemistry I",
        grade: "-",
        credits: "3",
        prerequisites: ["102201"],
      },
    },
    {
      id: "102502",
      type: "majorNormalNode",
      position: createNodePosition(4, 2),
      data: {
        code: "102502",
        name: "Advanced Organic Chemistry",
        grade: "-",
        credits: "3",
        prerequisites: ["102401"],
      },
    },

    {
      id: "102503",
      type: "majorNormalNode",
      position: createNodePosition(4, 4),
      data: {
        code: "102503",
        name: "Physical Chemistry III",
        grade: "-",
        credits: "3",
        prerequisites: ["102403"],
      },
    },

    {
      id: "header-6",
      type: "semesterHeader",
      position: createNodePosition(5, 0, true),
      data: {
        label: "Sixth Semester",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "102601",
      type: "majorNormalNode",
      position: createNodePosition(5, 0),
      data: {
        code: "102601",
        name: "Inorganic Chemistry II",
        grade: "-",
        credits: "3",
        prerequisites: ["014"],
      },
    },
    {
      id: "102602",
      type: "majorNormalNode",
      position: createNodePosition(5, 6),
      data: {
        code: "102602",
        name: "Biochemistry II",
        grade: "-",
        credits: "3",
        prerequisites: ["102404"],
      },
    },
    {
      id: "102603",
      type: "majorNormalNode",
      position: createNodePosition(5, 4),
      data: {
        code: "102603",
        name: "Analytical Chemistry III",
        grade: "-",
        credits: "3",
        prerequisites: ["102402"],
      },
    },

    {
      id: "header-7",
      type: "semesterHeader",
      position: createNodePosition(6, 0, true),
      data: {
        label: "Seventh Semester",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "102701",
      type: "majorNormalNode",
      position: createNodePosition(6, 0),
      data: {
        code: "102701",
        name: "Advanced Inorganic Chemistry",
        grade: "-",
        credits: "3",
        prerequisites: ["102601"],
      },
    },
    {
      id: "102702",
      type: "majorNormalNode",
      position: createNodePosition(6, 2),
      data: {
        code: "102702",
        name: "Advanced Organic Synthesis",
        grade: "-",
        credits: "3",
        prerequisites: ["102502"],
      },
    },
    {
      id: "102703",
      type: "majorNormalNode",
      position: createNodePosition(6, 5),
      data: {
        code: "102703",
        name: "Physical Chemistry IV",
        grade: "-",
        credits: "3",
        prerequisites: ["102503"],
      },
    },

    {
      id: "header-8",
      type: "semesterHeader",
      position: createNodePosition(7, 0, true),
      data: {
        label: "Eighth Semester",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "102801",
      type: "majorNormalNode",
      position: createNodePosition(7, 0),
      data: {
        code: "102801",
        name: "Chemistry Capstone Project",
        grade: "-",
        credits: "3",
        prerequisites: [],
      },
    },
    {
      id: "102802",
      type: "majorNormalNode",
      position: createNodePosition(7, 4),
      data: {
        code: "102802",
        name: "Advanced Analytical Chemistry",
        grade: "-",
        credits: "3",
        prerequisites: ["102603"],
      },
    },
    {
      id: "102803",
      type: "majorNormalNode",
      position: createNodePosition(7, 2),
      data: {
        code: "102803",
        name: "Special Topics in Chemistry",
        grade: "-",
        credits: "3",
        prerequisites: [],
      },
    },
  ]);

  const token = localStorage.getItem("token");
  function createNodePosition(semester, index, isHeader = false) {
    return {
      x: semester * SEMESTER_SPACING + 50,
      y: (isHeader ? HEADER_SPACING : VERTICAL_SPACING * (index + 1)) + 50,
    };
  }

  function updateMockNodesWithGrades(mockNodes, studentGrades) {
    // console.log(mockNodes, "111111");
    return mockNodes.map((node) => {
      // console.log(node.data.code);

      const matchingGrade = studentGrades.find(
        (grade) => grade?.course?.courseCode === node?.data?.code
      );

      // If there's a matching course, update the node
      if (matchingGrade) {
        return {
          ...node,
          data: {
            ...node.data,
            code: matchingGrade?.course?.courseCode,
            grade: matchingGrade?.letterGrade,
          },
        };
      }
      // Return node unmodified if no match
      return node;
    });
  }

  // const initialNodes = [
  //   // First Semester 2019 Header
  //   {
  //     id: "header-1",
  //     type: "semesterHeader",
  //     position: createNodePosition(0, 0, true),
  //     data: {
  //       label: "First Semester ",
  //     },
  //   },
  //   // First Semester 2019 Courses
  //   {
  //     id: "102101",
  //     type: "majorNormalNode",
  //     position: createNodePosition(0, 0),
  //     data: {
  //       code: "102101",
  //       name: "General Chemistry",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: [],
  //     },
  //   },
  //   {
  //     id: "100101",
  //     type: "majorNormalNode",
  //     position: createNodePosition(0, 2),
  //     data: {
  //       code: "100101",
  //       name: "Calculus I",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: [],
  //     },
  //   },
  //   {
  //     id: "102102",
  //     type: "majorNormalNode",
  //     position: createNodePosition(0, 4),
  //     data: {
  //       code: "102102",
  //       name: "Physics for Chemists I",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: [],
  //     },
  //   },

  //   // Second Semester 2019 Header
  //   {
  //     id: "header-2",
  //     type: "semesterHeader",
  //     position: createNodePosition(1, 0, true),
  //     data: {
  //       label: "Second Semester",
  //     },
  //   },
  //   // Second Semester 2019 Courses
  //   {
  //     id: "102201",
  //     type: "majorNormalNode",
  //     position: createNodePosition(1, 0),
  //     data: {
  //       code: "102201",
  //       name: "General Chemistry II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102101"],
  //     },
  //   },
  //   {
  //     id: "100102",
  //     type: "majorNormalNode",
  //     position: createNodePosition(1, 2),
  //     data: {
  //       code: "100102",
  //       name: "Calculus II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["100101"],
  //     },
  //   },
  //   {
  //     id: "102202",
  //     type: "majorNormalNode",
  //     position: createNodePosition(1, 4),
  //     data: {
  //       code: "102202",
  //       name: "Physics for Chemists II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102102"],
  //     },
  //   },

  //   // First Semester 2020 Header
  //   {
  //     id: "header-3",
  //     type: "semesterHeader",
  //     position: createNodePosition(2, 0, true),
  //     data: {
  //       label: "Third Semester",
  //     },
  //   },
  //   // First Semester 2020 Courses
  //   {
  //     id: "102301",
  //     type: "majorNormalNode",
  //     position: createNodePosition(2, 0),
  //     data: {
  //       code: "102301",
  //       name: "Organic Chemistry I",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102201"],
  //     },
  //   },
  //   {
  //     id: "102302",
  //     type: "majorNormalNode",
  //     position: createNodePosition(2, 2),
  //     data: {
  //       code: "102302",
  //       name: "Analytical Chemistry I",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102201"],
  //     },
  //   },
  //   {
  //     id: "102303",
  //     type: "majorNormalNode",
  //     position: createNodePosition(2, 4),
  //     data: {
  //       code: "102303",
  //       name: "Physical Chemistry I ",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102201", "100102"],
  //     },
  //   },

  //   // Second Semester 2020 Header
  //   {
  //     id: "header-4",
  //     type: "semesterHeader",
  //     position: createNodePosition(3, 0, true),
  //     data: {
  //       label: "Forth Semester",
  //     },
  //   },
  //   // Second Semester 2020 Courses
  //   {
  //     id: "102401",
  //     type: "majorNormalNode",
  //     position: createNodePosition(3, 0),
  //     data: {
  //       code: "102401",
  //       name: "Organic Chemistry II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102301"],
  //     },
  //   },
  //   {
  //     id: "102402",
  //     type: "majorNormalNode",
  //     position: createNodePosition(3, 2),
  //     data: {
  //       code: "102402",
  //       name: "Analytical Chemistry II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102302"],
  //     },
  //   },
  //   {
  //     id: "102403",
  //     type: "majorNormalNode",
  //     position: createNodePosition(3, 4),
  //     data: {
  //       code: "102403",
  //       name: "Physical Chemistry II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102303"],
  //     },
  //   },
  //   {
  //     id: "102404",
  //     type: "majorNormalNode",
  //     position: createNodePosition(3, 6),
  //     data: {
  //       code: "102404",
  //       name: "Biochemistry I",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: [],
  //     },
  //   },

  //   {
  //     id: "header-5",
  //     type: "semesterHeader",
  //     position: createNodePosition(4, 0, true),
  //     data: {
  //       label: "Fifth Semester",
  //     },
  //   },
  //   // Second Semester 2020 Courses
  //   {
  //     id: "102501",
  //     type: "majorNormalNode",
  //     position: createNodePosition(4, 0),
  //     data: {
  //       code: "102501",
  //       name: "Inorganic Chemistry I",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102201"],
  //     },
  //   },
  //   {
  //     id: "102502",
  //     type: "majorNormalNode",
  //     position: createNodePosition(4, 2),
  //     data: {
  //       code: "102502",
  //       name: "Advanced Organic Chemistry",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102401"],
  //     },
  //   },

  //   {
  //     id: "102503",
  //     type: "majorNormalNode",
  //     position: createNodePosition(4, 4),
  //     data: {
  //       code: "102503",
  //       name: "Physical Chemistry III",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102403"],
  //     },
  //   },

  //   {
  //     id: "header-6",
  //     type: "semesterHeader",
  //     position: createNodePosition(5, 0, true),
  //     data: {
  //       label: "Sixth Semester",
  //     },
  //   },
  //   // Second Semester 2020 Courses
  //   {
  //     id: "102601",
  //     type: "majorNormalNode",
  //     position: createNodePosition(5, 0),
  //     data: {
  //       code: "102601",
  //       name: "Inorganic Chemistry II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["014"],
  //     },
  //   },
  //   {
  //     id: "102602",
  //     type: "majorNormalNode",
  //     position: createNodePosition(5, 6),
  //     data: {
  //       code: "102602",
  //       name: "Biochemistry II",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102404"],
  //     },
  //   },
  //   {
  //     id: "102603",
  //     type: "majorNormalNode",
  //     position: createNodePosition(5, 4),
  //     data: {
  //       code: "102603",
  //       name: "Analytical Chemistry III",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102402"],
  //     },
  //   },

  //   {
  //     id: "header-7",
  //     type: "semesterHeader",
  //     position: createNodePosition(6, 0, true),
  //     data: {
  //       label: "Seventh Semester",
  //     },
  //   },
  //   // Second Semester 2020 Courses
  //   {
  //     id: "102701",
  //     type: "majorNormalNode",
  //     position: createNodePosition(6, 0),
  //     data: {
  //       code: "102701",
  //       name: "Advanced Inorganic Chemistry",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102601"],
  //     },
  //   },
  //   {
  //     id: "102702",
  //     type: "majorNormalNode",
  //     position: createNodePosition(6, 2),
  //     data: {
  //       code: "102702",
  //       name: "Advanced Organic Synthesis",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102502"],
  //     },
  //   },
  //   {
  //     id: "102703",
  //     type: "majorNormalNode",
  //     position: createNodePosition(6, 5),
  //     data: {
  //       code: "102703",
  //       name: "Physical Chemistry IV",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102503"],
  //     },
  //   },

  //   {
  //     id: "header-8",
  //     type: "semesterHeader",
  //     position: createNodePosition(7, 0, true),
  //     data: {
  //       label: "Eighth Semester",
  //     },
  //   },
  //   // Second Semester 2020 Courses
  //   {
  //     id: "102801",
  //     type: "majorNormalNode",
  //     position: createNodePosition(7, 0),
  //     data: {
  //       code: "102801",
  //       name: "Chemistry Capstone Project",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: [],
  //     },
  //   },
  //   {
  //     id: "102802",
  //     type: "majorNormalNode",
  //     position: createNodePosition(7, 4),
  //     data: {
  //       code: "102802",
  //       name: "Advanced Analytical Chemistry",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: ["102603"],
  //     },
  //   },
  //   {
  //     id: "102803",
  //     type: "majorNormalNode",
  //     position: createNodePosition(7, 2),
  //     data: {
  //       code: "102803",
  //       name: "Special Topics in Chemistry",
  //       grade: "-",
  //       credits: "3",
  //       prerequisites: [],
  //     },
  //   },
  // ];

  const initialEdges = [
    {
      id: "102101-102201",
      source: "102101",
      target: "102201",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102101",
      targetHandle: "target-left-102201",
    },

    {
      id: "100101-100102",
      source: "100101",
      target: "100102",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-100101",
      targetHandle: "target-left-100102",
    },

    {
      id: "102102-102202",
      source: "102102",
      target: "102202",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102102",
      targetHandle: "target-left-102202",
    },

    {
      id: "102201-102302",
      source: "102201",
      target: "102302",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102201",
      targetHandle: "target-left-102302",
    },

    {
      id: "102201-102301",
      source: "102201",
      target: "102301",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102201",
      targetHandle: "target-left-102301",
    },

    {
      id: "102201-102303",
      source: "102201",
      target: "102303",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102201",
      targetHandle: "target-left-102303",
    },

    {
      id: "100102-102303",
      source: "100102",
      target: "102303",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-100102",
      targetHandle: "target-bottom-102303",
    },

    {
      id: "102301-102401",
      source: "102301",
      target: "102401",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102301",
      targetHandle: "target-left-102401",
    },

    {
      id: "102302-102402",
      source: "102302",
      target: "102402",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102302",
      targetHandle: "target-left-102402",
    },

    {
      id: "102303-102403",
      source: "102303",
      target: "102403",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102303",
      targetHandle: "target-left-102403",
    },

    {
      id: "102201-102501",
      source: "102201",
      target: "102501",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-top-102201",
      targetHandle: "target-top-102501",
    },

    {
      id: "102401-102502",
      source: "102401",
      target: "102502",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102401",
      targetHandle: "target-left-102502",
    },

    {
      id: "102502-102702",
      source: "102502",
      target: "102702",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102502",
      targetHandle: "target-left-102702",
    },

    {
      id: "102403-102503",
      source: "102403",
      target: "102503",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102403",
      targetHandle: "target-left-102503",
    },

    {
      id: "102503-102703",
      source: "102503",
      target: "102703",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-bottom-102503",
      targetHandle: "target-left-102703",
    },

    {
      id: "102404-0118",
      source: "102404",
      target: "102602",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102404",
      targetHandle: "target-left-102602",
    },

    {
      id: "102402-102603",
      source: "102402",
      target: "102603",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-bottom-102402",
      targetHandle: "target-top-102603",
    },

    {
      id: "102601-102701",
      source: "102601",
      target: "102701",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102601",
      targetHandle: "target-left-102701",
    },

    {
      id: "102501-102601",
      source: "102501",
      target: "102601",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102501",
      targetHandle: "target-left-102601",
    },

    {
      id: "102403-102703",
      source: "102403",
      target: "022",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-bottom-102403",
      targetHandle: "target-left-102703",
    },

    {
      id: "102603-102802",
      source: "102603",
      target: "102802",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-102603",
      targetHandle: "target-left-102802",
    },
  ];
  useEffect(() => {
    const fetchStudentGrade = async () => {
      const resp = await studentGetAllGrade(token);
      setStudentGrade(resp.data);
    };

    fetchStudentGrade();
    // console.log(studentGrade, "9999999");
    // const updatedNodes = updateMockNodesWithGrades(initialNodes, studentGrade);
    // console.log(updatedNodes, "updatedNodes");
    // setTest(updatedNodes);
  }, []);

  useEffect(() => {
    console.log(studentGrade, "9999999");
    const updatedNodes = updateMockNodesWithGrades(initialNodes, studentGrade);
    console.log(updatedNodes, "updatedNodes");
    setInitialNodes(updatedNodes);
  }, [studentGrade]);

  // console.log(initialNodes, "initialNodes");

  //initial  is different  depend on major of the student
  //fetch from db

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#3b82f6",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  console.log(initialNodes, "initialnode");
  return (
    <div className="w-full h-[70vh] ">
      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800">
          Course Prerequisites - Chemistry
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Graduate School, Pierre University
        </p>
        <p>
          Each semester Student have to Enroll (at least 9 credits , maximum 22
          credits)
        </p>

        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-green-500">
              {" "}
              at least 3 Prerequisites Courses
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-red-600"> at least 0 Optional Courses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-blue-500">
              {" "}
              at least 0 Major selection Courses
            </span>
          </div>
        </div>
      </div>

      <div className=" w-full h-[80%] bg-gray-50 rounded-lg shadow overflow-hidden">
        <ReactFlow
          nodes={initialNodes}
          edges={edges}
          // onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background color="#94a3b8" gap={16} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
