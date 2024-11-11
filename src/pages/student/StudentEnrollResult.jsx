import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import StudentSemesterGrade from "../../components/student/StudentSemisterGrade";
import jsPDF from "jspdf";
import "jspdf-autotable";
import useStudent from "@/src/hooks/useStudent";
import { Printer } from "lucide-react";

function StudentEnrollResult() {
  // State for student info and grades
  const {
    getStudentProfile,
    studentInfo,
    studentGrade,
    getStudentGetGrade,
    studentCredit,
    getStudentGetCredit,
    getStudentGetCPA,
    getStudentGetGPA,
    studentGPA,
    studentCPA
  } = useStudent()
  const token = localStorage.getItem('token');

  const [semesters, setSemesters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Fetch data when component mounts
  useEffect(() => {
    fetchStudentData();
    getStudentProfile(token);
    getStudentGetGrade(token);
    getStudentGetCredit(token);
    getStudentGetCPA(token);
    getStudentGetGPA(token);
  }, []);

  useEffect(() => {
    if (studentGrade && studentGPA && studentCPA) {
      fetchStudentData();
    }
  }, [studentGrade, studentGPA, studentCPA]);

  const mockStudentInfo = {
    studentNo: studentInfo?.studentId,
    name: `${studentInfo?.firstName} ${studentInfo?.lastName}`,
    dateOfBirth: new Date(studentInfo?.dateOfBirth).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    placeOfBirth: studentInfo?.address || "N/A",
    fieldOfStudy: studentInfo?.major?.faculty?.name || "N/A",
    degreeConferred: studentInfo?.major?.name || "N/A",
    dateOfAdmission: new Date(studentInfo?.admitDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    dateOfGraduation: "N/A"
  };

  const fetchStudentData = async () => {
    try {
      setLoading(true);

      const semesterData = studentGrade?.map((grade) => ({
        semester: grade.semester,
        courses: [
          {
            code: grade.course?.courseCode || "N/A",
            title: grade.course?.courseName || "N/A",
            grade: grade.letterGrade || "N/A",
            credit: grade.course?.credits || 0,
          },
        ],
        gpaInfo: {
          semGpa: studentGPA?.GPA?.find((g) => g.semester === grade.semester)?.gpa || 0,
          semCredit: studentGPA?.GPA?.find((g) => g.semester === grade.semester)?.credits || 0,
          cumGpa: studentCPA?.AllTermGPA || 0,
          cumCredit: studentGPA?.GPA?.reduce((total, g) => total + (g?.credits || 0), 0),
        },
      })) || [];

      setSemesters(semesterData);
      console.log('semesters :>> ', semesterData);
    } catch (err) {
      setError("Failed to fetch student data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();

      const logoURL = "https://res.cloudinary.com/djudr1vzc/image/upload/v1730788865/Pierre_LOGO_rgsgob.png";
      const imageWidth = 25;
      const imageHeight = 25;

      // Add logo on the left side
      doc.addImage(logoURL, "PNG", 20, 10, imageWidth, imageHeight);

      // Add header text in the center
      doc.setFontSize(16);
      doc.text("Pierre University", doc.internal.pageSize.width / 2, 30, { align: "center" });
      doc.setFontSize(12);
      doc.text("OFFICE OF EDUCATIONAL ADMINISTRATION", doc.internal.pageSize.width / 2, 40, { align: "center" });
      doc.text("BANGKOK 10900, THAILAND", doc.internal.pageSize.width / 2, 50, { align: "center" });

      const startY = 70;
      const leftX = 20;
      const rightX = doc.internal.pageSize.width / 2 + 10;

      doc.setFontSize(10);

      // Left column
      doc.text(`Student No: ${mockStudentInfo.studentNo}`, leftX, startY);
      doc.text(`Name: ${mockStudentInfo.name}`, leftX, startY + 10);
      doc.text(`Date of Birth: ${mockStudentInfo.dateOfBirth}`, leftX, startY + 20);

      const addressText = mockStudentInfo.placeOfBirth.length > 20
        ? `${mockStudentInfo.placeOfBirth.slice(0, 20)}...`
        : mockStudentInfo.placeOfBirth;
      doc.text(`Address: ${addressText}`, leftX, startY + 30);

      // Right column
      doc.text(`Field Of Study: ${mockStudentInfo.fieldOfStudy}`, rightX, startY);
      doc.text(`Degree Conferred: ${mockStudentInfo.degreeConferred}`, rightX, startY + 10);
      doc.text(`Date of Admission: ${mockStudentInfo.dateOfAdmission}`, rightX, startY + 20);
      doc.text(`Date Of Graduation: ${mockStudentInfo.dateOfGraduation}`, rightX, startY + 30);

      let yPosition = startY + 50;
      semesters.forEach((semester) => {
        doc.setFontSize(14);
        doc.text(semester.semester, doc.internal.pageSize.width / 2, yPosition, { align: "center" });

        doc.autoTable({
          startY: yPosition + 10,
          head: [["Course Code", "Course Title", "Grade", "Credit"]],
          body: semester.courses.map((course) => [
            course.code,
            course.title,
            course.grade,
            course.credit,
          ]),
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: { fillColor: [238, 220, 181] },
        });

        yPosition = doc.previousAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.text(
          `Semester GPA = ${semester.gpaInfo.semGpa} | Semester Credits = ${semester.gpaInfo.semCredit}`,
          leftX,
          yPosition
        );
        doc.text(
          `Cumulative GPA = ${semester.gpaInfo.cumGpa} | Cumulative Credits = ${semester.gpaInfo.cumCredit}`,
          leftX,
          yPosition + 10
        );

        yPosition += 30;
        if (yPosition > doc.internal.pageSize.height - 40) {
          doc.addPage();
          yPosition = 20;
        }
      });

      doc.save("transcript.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Card className="w-[85%] mx-auto p-8 bg-white mb-8  ">
        <div className="flex flex-col gap-5 mx-8">
          {/* University Header */}
          <div className="flex justify-between items-center">
            <div className="w-28 h-auto">
              <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730788865/Pierre_LOGO_rgsgob.png" alt="logo" />
            </div>
            <div className="flex flex-col text-center">
              <p className="font-bold text-xl">Pierre University</p>
              <p className="font-semibold">
                OFFICE OF EDUCATIONAL ADMINISTRATION
              </p>
              <p>BANGKOK 10900, THAILAND</p>
            </div>
            <div className="w-24"></div>
          </div>

          {/* Student Information */}
          <div className="mt-8">
            <div className="flex justify-between gap-4  ">

              <div className="space-y-4 w-1/2">
                <div className="flex gap-3">
                  <p className="font-semibold">Student ID</p>
                  <span>{mockStudentInfo.studentNo}</span>
                </div>
                <div className="flex gap-3">
                  <p className="font-semibold">Name </p>
                  <span>{mockStudentInfo.name}</span>
                </div>
                <div className="flex gap-3">
                  <p className="font-semibold">Date of Birth</p>
                  <span>{mockStudentInfo.dateOfBirth}</span>
                </div>
                <div className="flex gap-3">
                  <p className="font-semibold">Address</p>
                  <span>{mockStudentInfo.placeOfBirth}</span>
                </div>
                {/* ... other student info fields */}
              </div>

              <div className="space-y-4 w-1/2 ">
                <div className="flex gap-3">
                  <p className="font-semibold">Faculty</p>
                  <span>{mockStudentInfo.fieldOfStudy}</span>
                </div>
                <div className="flex gap-3">
                  <p className="font-semibold">Field of Study</p>
                  <span>{mockStudentInfo.degreeConferred}</span>
                </div>
                <div className="flex gap-3">
                  <p className="font-semibold">Date of Admission</p>
                  <span>{mockStudentInfo.dateOfAdmission}</span>
                </div>
                <div className="flex gap-3">
                  <p className="font-semibold">Date of Graduation</p>
                  <span>{mockStudentInfo.dateOfGraduation}</span>
                </div>
                {/* ... other student info fields */}
              </div>
            </div>
          </div>

          {/* Semester Grades */}
          <div className="mt-4 ">
            <StudentSemesterGrade semester={semesters} />
          </div>
        </div>
      </Card>

      <div className="flex justify-center mb-8">
        <button
          onClick={generatePDF}
          className="flex gap-3 px-6 py-3 bg-[#272988] text-white rounded  hover:bg-[#20216d] transition-colors duration-200"
        >
            <Printer />
          Download Transcript
        </button>
      </div>
    </div>
  );
}

export default StudentEnrollResult;
