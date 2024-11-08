import { useState, useCallback } from "react";
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
import SubjectReport from "./SubjectReport";

//node type
import MajorRegisNode from "./Enroll/MajorRegisNode";
import OptionalCourseNode from "./Enroll/OptionalCourseNode";
import PastSubject from "./Enroll/PastSubject";
import MajorSelection from "./Enroll/MajorSelection";
import SemesterHeader from "./Enroll/SemesterHeader";

const nodeTypes = {
  majorRegisNode: MajorRegisNode,
  pastSubject: PastSubject,
  semesterHeader: SemesterHeader,
  optionalCourseNode: OptionalCourseNode,
  majorSelection: MajorSelection,
};

const SEMESTER_SPACING = 800;
const VERTICAL_SPACING = 300;
const HEADER_SPACING = 10;

export default function EnrollmentFlow() {
  const createNodePosition = (semester, index, isHeader = false) => ({
    x: semester * SEMESTER_SPACING + 50,
    y: (isHeader ? HEADER_SPACING : VERTICAL_SPACING * (index + 1)) + 50,
  });

  //initial  is different  depend on major of the student
  //fetch from db
  const initialNodes = [
    // First Semester 2019 Header
    {
      id: "header-1",
      type: "semesterHeader",
      position: createNodePosition(0, 0, true),
      data: {
        label: "First Semester ",
        gpa: "3.43",
        credits: "7",
      },
    },
    // First Semester 2019 Courses
    {
      id: "001",
      type: "pastSubject",
      position: createNodePosition(0, 0),
      data: {
        code: "001",
        name: "General Chemistry",
        grade: "C",
        credits: "3",
        prerequisites: [],
      },
    },
    {
      id: "002",
      type: "pastSubject",
      position: createNodePosition(0, 2),
      data: {
        code: "002",
        name: "Calculus I",
        grade: "B",
        credits: "4",
        prerequisites: [],
      },
    },
    {
      id: "003",
      type: "pastSubject",
      position: createNodePosition(0, 4),
      data: {
        code: "003",
        name: "Physics for Chemists I",
        grade: "A",
        credits: "1",
        prerequisites: [],
      },
    },
    {
      id: "optionnalCourseNode1-1",
      type: "optionalCourseNode",
      position: createNodePosition(0, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode1-2",
      type: "optionalCourseNode",
      position: createNodePosition(0, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode1-1",
      type: "majorSelection",
      position: createNodePosition(0, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },
    // Second Semester 2019 Header
    {
      id: "header-2",
      type: "semesterHeader",
      position: createNodePosition(1, 0, true),
      data: {
        label: "Second Semester",
        gpa: "3.79",
        credits: "7",
      },
    },
    // Second Semester 2019 Courses
    {
      id: "004",
      type: "majorRegisNode",
      position: createNodePosition(1, 0),
      data: {
        code: "004",
        name: "General Chemistry II",
        grade: "B+",
        credits: "3",
        prerequisites: ["001"],
      },
    },
    {
      id: "005",
      type: "majorRegisNode",
      position: createNodePosition(1, 2),
      data: {
        code: "005",
        name: "Calculus II",
        grade: "A",
        credits: "3",
        prerequisites: ["002"],
      },
    },
    {
      id: "006",
      type: "majorRegisNode",
      position: createNodePosition(1, 4),
      data: {
        code: "006",
        name: "Physics for Chemists II",
        grade: "A",
        credits: "1",
        prerequisites: ["003"],
      },
    },
    {
      id: "optionnalCourseNode2-1",
      type: "optionalCourseNode",
      position: createNodePosition(1, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode2-2",
      type: "optionalCourseNode",
      position: createNodePosition(1, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-2",
      type: "majorSelection",
      position: createNodePosition(1, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },
    // First Semester 2020 Header
    {
      id: "header-3",
      type: "semesterHeader",
      position: createNodePosition(2, 0, true),
      data: {
        label: "Third Semester",
        gpa: "4.00",
        credits: "13",
      },
    },
    // First Semester 2020 Courses
    {
      id: "007",
      type: "majorRegisNode",
      position: createNodePosition(2, 0),
      data: {
        code: "007",
        name: "Organic Chemistry I",
        grade: "A",
        credits: "3",
        prerequisites: ["004"],
      },
    },
    {
      id: "008",
      type: "majorRegisNode",
      position: createNodePosition(2, 2),
      data: {
        code: "008",
        name: "Analytical Chemistry I",
        grade: "A",
        credits: "3",
        prerequisites: ["004"],
      },
    },
    {
      id: "009",
      type: "majorRegisNode",
      position: createNodePosition(2, 4),
      data: {
        code: "009",
        name: "Physical Chemistry I ",
        grade: "A",
        credits: "1",
        prerequisites: ["004", "005"],
      },
    },
    {
      id: "optionnalCourseNode3-1",
      type: "optionalCourseNode",
      position: createNodePosition(2, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode3-2",
      type: "optionalCourseNode",
      position: createNodePosition(2, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-3",
      type: "majorSelection",
      position: createNodePosition(2, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    // Second Semester 2020 Header
    {
      id: "header-4",
      type: "semesterHeader",
      position: createNodePosition(3, 0, true),
      data: {
        label: "Forth Semester",
        gpa: "4.00",
        credits: "9",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "010",
      type: "majorRegisNode",
      position: createNodePosition(3, 0),
      data: {
        code: "010",
        name: "Organic Chemistry II",
        grade: "A",
        credits: "3",
        prerequisites: ["007"],
      },
    },
    {
      id: "011",
      type: "majorRegisNode",
      position: createNodePosition(3, 2),
      data: {
        code: "011",
        name: "Analytical Chemistry II",
        grade: "S",
        credits: "6",
        prerequisites: ["008"],
      },
    },
    {
      id: "012",
      type: "majorRegisNode",
      position: createNodePosition(3, 4),
      data: {
        code: "012",
        name: "Physical Chemistry II",
        grade: "S",
        credits: "6",
        prerequisites: ["009"],
      },
    },
    {
      id: "013",
      type: "majorRegisNode",
      position: createNodePosition(3, 6),
      data: {
        code: "013",
        name: "Biochemistry I",
        grade: "S",
        credits: "6",
        prerequisites: ["009"],
      },
    },
    {
      id: "optionnalCourseNode4-1",
      type: "optionalCourseNode",
      position: createNodePosition(3, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode4-2",
      type: "optionalCourseNode",
      position: createNodePosition(3, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-4",
      type: "majorSelection",
      position: createNodePosition(3, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "header-5",
      type: "semesterHeader",
      position: createNodePosition(4, 0, true),
      data: {
        label: "Fifth Semester",
        gpa: "4.00",
        credits: "9",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "014",
      type: "majorRegisNode",
      position: createNodePosition(4, 0),
      data: {
        code: "014",
        name: "Inorganic Chemistry I",
        grade: "A",
        credits: "3",
        prerequisites: ["004"],
      },
    },
    {
      id: "015",
      type: "majorRegisNode",
      position: createNodePosition(4, 2),
      data: {
        code: "015",
        name: "Advanced Organic Chemistry",
        grade: "S",
        credits: "6",
        prerequisites: ["010"],
      },
    },
    {
      id: "016",
      type: "majorRegisNode",
      position: createNodePosition(4, 4),
      data: {
        code: "016",
        name: "Physical Chemistry II",
        grade: "S",
        credits: "6",
        prerequisites: ["012"],
      },
    },

    {
      id: "optionnalCourseNode5-1",
      type: "optionalCourseNode",
      position: createNodePosition(4, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode5-2",
      type: "optionalCourseNode",
      position: createNodePosition(4, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-5",
      type: "majorSelection",
      position: createNodePosition(4, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "header-6",
      type: "semesterHeader",
      position: createNodePosition(5, 0, true),
      data: {
        label: "Sixth Semester",
        gpa: "4.00",
        credits: "9",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "017",
      type: "majorRegisNode",
      position: createNodePosition(5, 0),
      data: {
        code: "017",
        name: "Inorganic Chemistry II",
        grade: "A",
        credits: "3",
        prerequisites: ["014"],
      },
    },
    {
      id: "018",
      type: "majorRegisNode",
      position: createNodePosition(5, 6),
      data: {
        code: "018",
        name: "Biochemistry II",
        grade: "S",
        credits: "6",
        prerequisites: ["013"],
      },
    },
    {
      id: "019",
      type: "majorRegisNode",
      position: createNodePosition(5, 4),
      data: {
        code: "019",
        name: "Analytical Chemistry III",
        grade: "S",
        credits: "6",
        prerequisites: ["011"],
      },
    },
    {
      id: "optionnalCourseNode6-1",
      type: "optionalCourseNode",
      position: createNodePosition(5, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode6-2",
      type: "optionalCourseNode",
      position: createNodePosition(5, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-6",
      type: "majorSelection",
      position: createNodePosition(5, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },
    {
      id: "header-7",
      type: "semesterHeader",
      position: createNodePosition(6, 0, true),
      data: {
        label: "Seventh Semester",
        gpa: "4.00",
        credits: "9",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "020",
      type: "majorRegisNode",
      position: createNodePosition(6, 0),
      data: {
        code: "020",
        name: "Advanced Inorganic Chemistry",
        grade: "A",
        credits: "3",
        prerequisites: ["017"],
      },
    },
    {
      id: "021",
      type: "majorRegisNode",
      position: createNodePosition(6, 2),
      data: {
        code: "021",
        name: "Advanced Organic Synthesis",
        grade: "S",
        credits: "6",
        prerequisites: ["015"],
      },
    },
    {
      id: "022",
      type: "majorRegisNode",
      position: createNodePosition(6, 4),
      data: {
        code: "022",
        name: "Physical Chemistry IV",
        grade: "S",
        credits: "6",
        prerequisites: ["016"],
      },
    },
    {
      id: "optionnalCourseNode7-1",
      type: "optionalCourseNode",
      position: createNodePosition(6, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode7-2",
      type: "optionalCourseNode",
      position: createNodePosition(6, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-7",
      type: "majorSelection",
      position: createNodePosition(6, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "header-8",
      type: "semesterHeader",
      position: createNodePosition(7, 0, true),
      data: {
        label: "Eighth Semester",
        gpa: "4.00",
        credits: "9",
      },
    },
    // Second Semester 2020 Courses
    {
      id: "023",
      type: "majorRegisNode",
      position: createNodePosition(7, 0),
      data: {
        code: "023",
        name: "Chemistry Capstone Project",
        grade: "A",
        credits: "3",
        prerequisites: [],
      },
    },
    {
      id: "024",
      type: "majorRegisNode",
      position: createNodePosition(7, 2),
      data: {
        code: "024",
        name: "Advanced Analytical Chemistry",
        grade: "S",
        credits: "6",
        prerequisites: ["019"],
      },
    },
    {
      id: "025",
      type: "majorRegisNode",
      position: createNodePosition(7, 4),
      data: {
        code: "025",
        name: "Special Topics in Chemistry",
        grade: "S",
        credits: "6",
        prerequisites: [],
      },
    },
    {
      id: "optionnalCourseNode8-1",
      type: "optionalCourseNode",
      position: createNodePosition(7, 7),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "optionnalCourseNode8-2",
      type: "optionalCourseNode",
      position: createNodePosition(7, 8),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "majorSelectionNode-8",
      type: "majorSelection",
      position: createNodePosition(7, 9),
      data: {
        // code: "alternativeCourse3",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },
  ];

  const initialEdges = [
    {
      id: "001-004",
      source: "001",
      target: "004",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-001",
      targetHandle: "target-left-004",
    },

    {
      id: "002-005",
      source: "002",
      target: "005",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-002",
      targetHandle: "target-left-005",
    },

    {
      id: "003-006",
      source: "003",
      target: "006",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-003",
      targetHandle: "target-left-006",
    },

    {
      id: "004-008",
      source: "004",
      target: "008",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-004",
      targetHandle: "target-left-008",
    },

    {
      id: "004-009",
      source: "004",
      target: "009",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-004",
      targetHandle: "target-left-009",
    },

    {
      id: "005-009",
      source: "005",
      target: "009",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-005",
      targetHandle: "target-bottom-009",
    },

    {
      id: "007-010",
      source: "007",
      target: "010",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-007",
      targetHandle: "target-left-010",
    },

    {
      id: "008-011",
      source: "008",
      target: "011",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-008",
      targetHandle: "target-left-011",
    },

    {
      id: "009-012",
      source: "009",
      target: "012",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-009",
      targetHandle: "target-left-012",
    },

    {
      id: "009-013",
      source: "009",
      target: "013",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-009",
      targetHandle: "target-left-013",
    },

    {
      id: "004-014",
      source: "004",
      target: "014",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-top-004",
      targetHandle: "target-top-014",
    },

    {
      id: "010-015",
      source: "010",
      target: "015",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-010",
      targetHandle: "target-left-015",
    },

    {
      id: "012-016",
      source: "012",
      target: "016",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-012",
      targetHandle: "target-left-016",
    },

    {
      id: "014-017",
      source: "014",
      target: "017",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-014",
      targetHandle: "target-left-017",
    },

    {
      id: "013-0118",
      source: "013",
      target: "018",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-013",
      targetHandle: "target-left-018",
    },

    {
      id: "011-019",
      source: "011",
      target: "019",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-bottom-011",
      targetHandle: "target-left-019",
    },

    {
      id: "017-020",
      source: "017",
      target: "020",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-017",
      targetHandle: "target-left-020",
    },

    {
      id: "015-021",
      source: "015",
      target: "021",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-015",
      targetHandle: "target-left-021",
    },

    {
      id: "016-022",
      source: "016",
      target: "022",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-right-016",
      targetHandle: "target-left-022",
    },

    {
      id: "019-024",
      source: "019",
      target: "024",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 10 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
      sourceHandle: "source-top-019",
      targetHandle: "target-bottom-024",
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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

  return (
    <div className="w-full h-[calc(100vh-theme(spacing.16))]">
      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800">
          Course Prerequisites - Materials Engineering
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Graduate School, Kasetsart University
        </p>

        {/* <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Grade A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>Grade B+</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Grade B</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Grade S</span>
          </div>
        </div> */}
      </div>

      <div className="w-full h-[calc(100%-theme(spacing.24))] bg-gray-50 rounded-lg shadow overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
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
