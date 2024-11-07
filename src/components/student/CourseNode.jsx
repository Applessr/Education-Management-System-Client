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
import MajorRegisNodeItem from "./MajorRegisNodeItem";

const MajorRegisNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="relative "
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-blue-500"
            id={`target-top-${data.code}`}
          />

          <Handle
            type="target"
            position={Position.Bottom}
            className="w-3 h-3 bg-blue-500"
            id={`target-bottom-${data.code}`}
          />
          <Handle
            type="target"
            position={Position.Left}
            className="w-3 h-3 bg-blue-500"
            id={`target-left-${data.code}`}
          />
          <Handle
            type="source"
            position={Position.Right}
            className="w-3 h-3 bg-blue-500"
            id={`source-right-${data.code}`}
          />

          <Handle
            type="source"
            position={Position.Top}
            className="w-3 h-3 bg-blue-500"
            id={`source-top-${data.code}`}
          />

          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-blue-500"
            id={`source-bottom-${data.code}`}
          />

          <div className=" flex items-center gap-4 bg-white rounded-xl border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 w-[700px]">
            <div className="`w-48 h-full py-12 flex items-center justify-center text-white bg-gray-300">
              <div className="text-center">
                <span className="font-bold text-6xl">{data.grade}</span>
                <div className="text-6xl mt-2">({data.credits} cr)</div>
              </div>
            </div>
            <div className="p-12 flex-1">
              <p className="text-7xl font-mono text-gray-600 mb-4">
                {data.code}
              </p>
              <p className="text-6xl font-medium text-gray-900">{data.name}</p>
            </div>
          </div>

          {showTooltip && data.prerequisites && (
            <div className="absolute z-10 bg-black bg-opacity-75 text-white p-4 rounded text-lg -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Prerequisites: {data.prerequisites.join(", ")}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register form</DialogTitle>
        </DialogHeader>
        <MajorRegisNodeItem courseId={data.code} />
      </DialogContent>
    </Dialog>
  );
};

const PastSubject = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="relative "
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-blue-500"
            id={`target-top-${data.code}`}
          />

          <Handle
            type="target"
            position={Position.Bottom}
            className="w-3 h-3 bg-blue-500"
            id={`target-bottom-${data.code}`}
          />
          <Handle
            type="target"
            position={Position.Left}
            className="w-3 h-3 bg-blue-500"
            id={`target-left-${data.code}`}
          />
          <Handle
            type="source"
            position={Position.Right}
            className="w-3 h-3 bg-blue-500"
            id={`source-right-${data.code}`}
          />

          <Handle
            type="source"
            position={Position.Top}
            className="w-3 h-3 bg-blue-500"
            id={`source-top-${data.code}`}
          />

          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-blue-500"
            id={`source-bottom-${data.code}`}
          />

          <div className=" flex items-center gap-4 bg-white rounded-xl border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 w-[700px]">
            <div
              className={`w-48 h-full py-12 flex items-center justify-center text-white ${
                data.grade === "A"
                  ? "bg-green-500"
                  : data.grade === "B"
                  ? "bg-blue-600"
                  : data.grade === "C"
                  ? "bg-blue-500"
                  : data.grade === "D"
                  ? "bg-purple-500"
                  : "bg-gray-400"
              }`}
            >
              <div className="text-center">
                <span className="font-bold text-6xl">{data.grade}</span>
                <div className="text-6xl mt-2">({data.credits} cr)</div>
              </div>
            </div>
            <div className="p-12 flex-1">
              <p className="text-7xl font-mono text-gray-600 mb-4">
                {data.code}
              </p>
              <p className="text-6xl font-medium text-gray-900">{data.name}</p>
            </div>
          </div>

          {showTooltip && data.prerequisites && (
            <div className="absolute z-10 bg-black bg-opacity-75 text-white p-4 rounded text-lg -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Prerequisites: {data.prerequisites.join(", ")}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Score Report</DialogTitle>
        </DialogHeader>
        <SubjectReport courseId={data.code} />
      </DialogContent>
    </Dialog>
  );
};

const OptionalCourseNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog open state
  const [selectedSubject, setSelectedSubject] = useState(""); // Track selected subject
  const [selectedSection, setSelectedSection] = useState(""); // Track selected section
  const [alternativeSubjects, setAlternativeSubjects] = useState([]); // Store the list of alternative subjects

  // Example subject data
  //have to  fetch new to check is it already register
  const subjectDetails = [
    {
      subject: "Math 1",
      code: "123456",
      sections: [
        { time: "9:00-12:00", availability: "18/50", id: "section1" },
        { time: "13:00-16:00", availability: "18/50", id: "section2" },
      ],
    },
    {
      subject: "Phy 1",
      code: "123457",
      sections: [
        { time: "9:00-12:00", availability: "28/50", id: "section1" },
        { time: "13:00-16:00", availability: "38/50", id: "section2" },
      ],
    },
    {
      subject: "Chem 1",
      code: "123451",
      sections: [
        { time: "9:00-12:00", availability: "8/50", id: "section1" },
        { time: "13:00-16:00", availability: "18/50", id: "section2" },
      ],
    },
  ];

  const handleAddSubject = () => {
    if (selectedSubject && selectedSection) {
      const subject = subjectDetails.find((s) => s.code === selectedSubject);
      const selectedSectionData = subject.sections.find(
        (section) => section.id === selectedSection
      );

      const newSubject = {
        subject: subject.subject,
        code: subject.code,
        time: selectedSectionData.time,
      };

      console.log("Adding subject:", newSubject);
      setAlternativeSubjects([...alternativeSubjects, newSubject]); // Add the new subject to the list
      setSelectedSubject(""); // Clear selected subject
      setSelectedSection(""); // Clear selected section
      setDialogOpen(false); // Close dialog
    }
  };

  const handleCancel = () => {
    setSelectedSubject("");
    setSelectedSection("");
    setDialogOpen(false); // Close dialog
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center justify-center p-12 gap-2 bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow w-[700px]">
        <div className="p-3">
          <p className="text-6xl font-medium text-gray-900">
            Add optional subject
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="bg-blue-500 text-white  py-8 px-12 rounded-lg hover:bg-blue-600 transition-colors">
              <CirclePlus size={100} />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add optional Subject</DialogTitle>
              <DialogDescription>
                Search for an optional subject and select the section you want,
                then press OK.
              </DialogDescription>
            </DialogHeader>

            {/* Subject selection */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjectDetails.map((subject) => (
                <option key={subject.code} value={subject.code}>
                  {subject.subject} ({subject.code})
                </option>
              ))}
            </select>

            {/* Section selection */}
            {selectedSubject && (
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              >
                <option value="" disabled>
                  Select a section
                </option>
                {subjectDetails
                  .find((s) => s.code === selectedSubject)
                  .sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      Section {section.id.split("section")[1]} - {section.time}{" "}
                      ({section.availability})
                    </option>
                  ))}
              </select>
            )}

            <DialogFooter>
              <button
                onClick={handleAddSubject}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Add Subject
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 transition-colors ml-2"
              >
                Cancel
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const MajorSelection = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog open state
  const [selectedSubject, setSelectedSubject] = useState(""); // Track selected subject
  const [selectedSection, setSelectedSection] = useState(""); // Track selected section
  const [alternativeSubjects, setAlternativeSubjects] = useState([]); // Store the list of alternative subjects

  // Example subject data
  const subjectDetails = [
    {
      subject: "Math 1",
      code: "123456",
      sections: [
        { time: "9:00-12:00", availability: "18/50", id: "section1" },
        { time: "13:00-16:00", availability: "18/50", id: "section2" },
      ],
    },
    {
      subject: "Phy 1",
      code: "123457",
      sections: [
        { time: "9:00-12:00", availability: "28/50", id: "section1" },
        { time: "13:00-16:00", availability: "38/50", id: "section2" },
      ],
    },
    {
      subject: "Chem 1",
      code: "123451",
      sections: [
        { time: "9:00-12:00", availability: "8/50", id: "section1" },
        { time: "13:00-16:00", availability: "18/50", id: "section2" },
      ],
    },
  ];

  const handleAddSubject = () => {
    if (selectedSubject && selectedSection) {
      const subject = subjectDetails.find((s) => s.code === selectedSubject);
      const selectedSectionData = subject.sections.find(
        (section) => section.id === selectedSection
      );

      const newSubject = {
        subject: subject.subject,
        code: subject.code,
        time: selectedSectionData.time,
      };

      console.log("Adding subject:", newSubject);
      setAlternativeSubjects([...alternativeSubjects, newSubject]); // Add the new subject to the list
      setSelectedSubject(""); // Clear selected subject
      setSelectedSection(""); // Clear selected section
      setDialogOpen(false); // Close dialog
    }
  };

  const handleCancel = () => {
    setSelectedSubject("");
    setSelectedSection("");
    setDialogOpen(false); // Close dialog
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center justify-center p-12 gap-2 bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow w-[700px]">
        <div className="p-3">
          <p className="text-6xl font-medium text-gray-900">
            Add Major Selection
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="bg-red-500 text-white py-8 px-12 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setDialogOpen(true)}
            >
              <CirclePlus size={100} />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Major Selection Subject</DialogTitle>
              <DialogDescription>
                Select a subject and section, then press OK.
              </DialogDescription>
            </DialogHeader>

            {/* Subject selection */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjectDetails.map((subject) => (
                <option key={subject.code} value={subject.code}>
                  {subject.subject} ({subject.code})
                </option>
              ))}
            </select>

            {/* Section selection */}
            {selectedSubject && (
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              >
                <option value="" disabled>
                  Select a section
                </option>
                {subjectDetails
                  .find((s) => s.code === selectedSubject)
                  .sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      Section {section.id.split("section")[1]} - {section.time}{" "}
                      ({section.availability})
                    </option>
                  ))}
              </select>
            )}

            <DialogFooter>
              <button
                onClick={handleAddSubject}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Add Subject
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 transition-colors ml-2"
              >
                Cancel
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const SemesterHeader = ({ data }) => (
  <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-200 shadow-sm w-[725px]">
    <h3 className="font-bold text-7xl text-blue-800">{data.label}</h3>
    <div className="text-7xl text-blue-600">
      GPA: {data.gpa} | Credits: {data.credits}
    </div>
  </div>
);

const nodeTypes = {
  majorRegisNode: MajorRegisNode,
  pastSubject: PastSubject,
  semesterHeader: SemesterHeader,
  optionalCourseNode: OptionalCourseNode,
  majorSelection: MajorSelection,
};

const SEMESTER_SPACING = 800;
const VERTICAL_SPACING = 300;
const HEADER_SPACING = 5;

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
      id: "alternativeCourse1",
      type: "optionalCourseNode",
      position: createNodePosition(0, 6),
      data: {
        // code: "alternativeCourse1",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "alternativeCourse2",
      type: "optionalCourseNode",
      position: createNodePosition(0, 7),
      data: {
        // code: "alternativeCourse2",
        // name: "Alternative",
        // grade: "alternativeCourse",
        // credits: "alternativeCourse",
        // prerequisites: [],
      },
    },

    {
      id: "alternativeCourse3",
      type: "majorSelection",
      position: createNodePosition(0, 8),
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

        <div className="flex gap-4 mt-4 text-sm">
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
        </div>
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
