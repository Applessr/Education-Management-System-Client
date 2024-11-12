import {
  studentCancelEnrollRequest,
  studentGetEnrollCourseBySemester,
} from "@/src/api/course";
import useStudent from "@/src/hooks/useStudent";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function CurrentSemesterEnrollment() {
  // const [enrollList, setEnrollList] = useState([]); // Change to array
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog visibility
  const [selectedEnrollment, setSelectedEnrollment] = useState(null); // To store selected enrollment ID for cancellation
  const { studentInfo, fetchPendingEnrollment, enrollList } = useStudent();
  const token = localStorage.getItem("token");

  const currentSemester = {
    semester: "1/2567",
  };

  useEffect(() => {
    fetchPendingEnrollment();
  }, []);

  // Filter enrollments to show only APPROVE or PENDING
  const filteredEnrollments = enrollList.filter(
    (enrollment) =>
      enrollment.status === "APPROVED" || enrollment.status === "PENDING"
  );

  // Handle the cancel enrollment button click
  const handleCancelEnrollment = (enrollmentId) => {
    setSelectedEnrollment(enrollmentId); // Store the selected enrollment ID
    setIsDialogOpen(true); // Open the dialog
  };

  // Handle the Confirm action in the dialog
  const handleConfirmCancel = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (selectedEnrollment) {
      console.log("Cancelled Enrollment ID:", selectedEnrollment); // Log the selected enrollment ID
    }
    await studentCancelEnrollRequest(token, selectedEnrollment);
    fetchPendingEnrollment();
    setIsDialogOpen(false); // Close the dialog after confirmation
  };

  // Handle the Cancel action in the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Simply close the dialog without doing anything
  };

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Current Semester Enrollment
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Course Name
            </th>
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Credit
            </th>
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Section
            </th>
            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Enroll Status
            </th>

            <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEnrollments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No enrollment data
              </td>
            </tr>
          ) : (
            filteredEnrollments.map((enrollment) => (
              <tr key={enrollment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {enrollment.course?.courseName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {enrollment.course?.credits}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {enrollment.course?.section}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <span
                    className={
                      enrollment.status === "APPROVED"
                        ? "text-green-500"
                        : enrollment.status === "PENDING"
                        ? "text-yellow-500"
                        : "text-gray-700"
                    }
                  >
                    {enrollment.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {/* Shadcn Dialog for Confirmation */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                      <Button
                        onClick={() => handleCancelEnrollment(enrollment.id)}
                      >
                        Cancel Enroll
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure to cancel enrollment of{" "}
                          {enrollment.course?.courseName} section :{" "}
                          {enrollment.course?.section}?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone.
                        </DialogDescription>
                        <DialogFooter>
                          <Button onClick={handleCloseDialog}>Cancel</Button>
                          <Button onClick={handleConfirmCancel}>Confirm</Button>
                        </DialogFooter>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentSemesterEnrollment;
