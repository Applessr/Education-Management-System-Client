import React from "react";

const SemesterHeader = ({ data }) => (
  <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-200 shadow-sm w-[725px]">
    <h3 className="font-bold text-7xl text-blue-800">{data.label}</h3>
    <div className="text-7xl text-blue-600">
      GPA: {data.gpa} | Credits: {data.credits}
    </div>
  </div>
);

export default SemesterHeader;
