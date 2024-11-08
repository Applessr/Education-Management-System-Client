import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

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

export default OptionalCourseNode;
