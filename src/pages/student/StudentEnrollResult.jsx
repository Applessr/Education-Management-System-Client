import React from "react";
import StudentSemisterGrade from "../../components/student/StudentSemisterGrade";

function StudentEnrollResult() {
  return (
    <div className="w-[50%] border mx-auto ">
      <div className="flex flex-col gap-5">
        <div className=" flex justify-between">
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
              <p>Data of Admission :</p> <span>xxxxxx</span>
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
  );
}

export default StudentEnrollResult;
