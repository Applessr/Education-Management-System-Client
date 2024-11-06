
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import StudentSemesterGrade from "../../components/student/StudentSemisterGrade";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function StudentEnrollResult() {
  // State for student info and grades
  const [studentInfo, setStudentInfo] = useState({
    studentNo: "",
    name: "",
    dateOfBirth: "",
    placeOfBirth: "",
    fieldOfStudy: "",
    degreeConferred: "",
    dateOfAdmission: "",
    dateOfGraduation: ""
  });

  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      // In the future, replace these with actual API calls
      // const studentResponse = await fetch('/api/student/info');
      // const semestersResponse = await fetch('/api/student/grades');
      
      // Temporary mock data
      const mockStudentInfo = {
        studentNo: "xxxxxxxxxx",
        name: "xxxxxxxxxx",
        dateOfBirth: "xxxxxxxx",
        placeOfBirth: "xxxxxxxxxx",
        fieldOfStudy: "xxxxxxx",
        degreeConferred: "xxxxxx",
        dateOfAdmission: "xxxxxx",
        dateOfGraduation: "xxxxxx"
      };

      const mockSemesters = [
        {
          semester: "First Semester 2019",
          courses: [
            {
              code: "01213211",
              title: "Materials Science for Engineers",
              grade: "S",
              credit: 3,
            },
            // ... other courses
          ],
          gpaInfo: {
            semGpa: 3.43,
            semCredit: 7,
            cumGpa: 3.43,
            cumCredit: 7,
          },
        },
        // ... other semesters
      ];

      setStudentInfo(mockStudentInfo);
      setSemesters(mockSemesters);
    } catch (err) {
      setError('Failed to fetch student data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add university header
      doc.setFontSize(20);
      doc.text('Pierre University', doc.internal.pageSize.width / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text('OFFICE OF EDUCATIONAL ADMINISTRATION', doc.internal.pageSize.width / 2, 30, { align: 'center' });
      doc.text('BANGKOK 10900, THAILAND', doc.internal.pageSize.width / 2, 40, { align: 'center' });

      // Add student information
      const startY = 60;
      const leftX = 20;
      const rightX = doc.internal.pageSize.width / 2 + 10;

      // Left column student info
      doc.text(`Student No: ${studentInfo.studentNo}`, leftX, startY);
      doc.text(`Name: ${studentInfo.name}`, leftX, startY + 10);
      doc.text(`Date of Birth: ${studentInfo.dateOfBirth}`, leftX, startY + 20);
      doc.text(`Place Of Birth: ${studentInfo.placeOfBirth}`, leftX, startY + 30);

      // Right column student info
      doc.text(`Field Of Study: ${studentInfo.fieldOfStudy}`, rightX, startY);
      doc.text(`Degree Conferred: ${studentInfo.degreeConferred}`, rightX, startY + 10);
      doc.text(`Date of Admission: ${studentInfo.dateOfAdmission}`, rightX, startY + 20);
      doc.text(`Date Of Graduation: ${studentInfo.dateOfGraduation}`, rightX, startY + 30);

      // Add semester grades
      let yPosition = startY + 50;

      semesters.forEach((semester) => {
        // Add semester header
        doc.setFontSize(14);
        doc.text(semester.semester, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
        
        // Add courses table
        doc.autoTable({
          startY: yPosition + 10,
          head: [['Course Code', 'Course Title', 'Grade', 'Credit']],
          body: semester.courses.map(course => [
            course.code,
            course.title,
            course.grade,
            course.credit
          ]),
          theme: 'plain',
          styles: { fontSize: 10 },
          headStyles: { fillColor: [200, 200, 200] }
        });

        // Add GPA information
        yPosition = doc.previousAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.text(`sem. G.P.A. = ${semester.gpaInfo.semGpa} Credit = ${semester.gpaInfo.semCredit}`, 
          leftX, yPosition);
        doc.text(`cum. G.P.A. = ${semester.gpaInfo.cumGpa} Credit = ${semester.gpaInfo.cumCredit}`, 
          leftX, yPosition + 10);

        yPosition += 30;

        if (yPosition > doc.internal.pageSize.height - 40) {
          doc.addPage();
          yPosition = 20;
        }
      });

      doc.save('transcript.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
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
      <Card className="w-[50%] mx-auto p-8 bg-white mb-8">
        <div className="flex flex-col gap-5">
          {/* University Header */}
          <div className="flex justify-between items-center">
            <div className="w-24 h-24">logo</div>
            <div className="flex flex-col text-center">
              <p className="font-bold text-xl">Pierre University</p>
              <p className="font-semibold">OFFICE OF EDUCATIONAL ADMINISTRATION</p>
              <p>BANGKOK 10900, THAILAND</p>
            </div>
            <div className="w-24"></div>
          </div>

          {/* Student Information */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <p className="font-semibold">Student No:</p>
                  <span>{studentInfo.studentNo}</span>
                </div>
                {/* ... other student info fields */}
              </div>
            </div>
          </div>

          {/* Semester Grades */}
          <div className="mt-4">
            <StudentSemesterGrade semesters={semesters} />
          </div>
        </div>
      </Card>

      <div className="flex justify-center mb-8">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Download Transcript
        </button>
      </div>
    </div>
  );
}

export default StudentEnrollResult;