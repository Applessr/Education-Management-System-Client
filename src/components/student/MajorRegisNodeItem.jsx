import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust the import path based on your file structure
import { Button } from "@/components/ui/button"; // Adjust the import path based on your file structure

const courseData = {
  courseId: "01101491",
  courseName: "Research Methods in Economics",
  sections: [
    {
      id: 1,
      code: 316,
      name: "Research Methods in Economics",
      credit: 3,
      section: 801,
      studyDay: "Mon 9:00 - 12:00",
      room: "170102",
    },
    {
      id: 2,
      code: 316,
      name: "Research Methods in Economics",
      credit: 3,
      section: 802,
      studyDay: "Mon 13:00 - 16:00",
      room: "170102",
    },
  ],
};

function MajorRegisNodeItem({ courseId }) {
  const [selectedSection, setSelectedSection] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Selected Section : ${selectedSection} // CourseCode is : ${courseId}`
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">
        Register for {courseData.courseName}
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="section" className="block mb-2 font-medium">
          Choose a section:
        </label>
        <Select onValueChange={setSelectedSection}>
          <SelectTrigger id="section" className="w-full mb-4">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {courseData.sections.map((section) => (
              <SelectItem key={section.id} value={section.section.toString()}>
                Section {section.section} - {section.studyDay} - Room{" "}
                {section.room}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default MajorRegisNodeItem;
