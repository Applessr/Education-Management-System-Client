import React from "react";

import StudentSemisterGrade from "../../components/student/StudentSemisterGrade";

// import { html2pdf } from "html2pdf.js";

function StudentEnrollResult() {
  const savePdf = () => {
    const element = document.getElementById("transcript");
    const options = {
      margin: 1,
      filename: "transcript.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <div id="transcript" className="w-[50%] border mx-auto ">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <div>logo</div>
            <div className="flex flex-col">
              <p>Pierre University</p>
              <p>OFFICE OF EDUCATIONAL ADMINISTRATION</p>
              <p>BANGKOK 10900, THAILAND</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <p>Student No :</p> <span>xxxxxxxxxx</span>
              </div>
              <div className="flex gap-3">
                <p>Field Of Study :</p> <span>xxxxxxx</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-3">
                <p>Name :</p> <span>xxxxxxxxxx</span>
              </div>
              <div className="flex gap-3">
                <p>Degree Conferred :</p> <span>xxxxxx</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-3">
                <p>Date of Birth :</p> <span>xxxxxxxx</span>
              </div>
              <div className="flex gap-3">
                <p>Date of Admission :</p> <span>xxxxxx</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-3">
                <p>Place Of Birth :</p> <span>xxxxxxxxxx</span>
              </div>
              <div className="flex gap-3">
                <p>Date Of Graduation :</p> <span>xxxxxx</span>
              </div>
            </div>
          </div>
          <div>
            <StudentSemisterGrade />
          </div>
        </div>
      </div>
      {/* ปุ่ม Download PDF */}
      <div className="flex justify-center mt-5">
        <button
          onClick={savePdf}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Transcript PDF
        </button>
      </div>
    </div>
  );
}

export default StudentEnrollResult;
