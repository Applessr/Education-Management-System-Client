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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const { studentInfo, fetchPendingEnrollment, enrollList } = useStudent();

  useEffect(() => {
    fetchPendingEnrollment();
  }, []);

  // Filter enrollments to show only APPROVED or PENDING
  const filteredEnrollments = enrollList.filter(
    (enrollment) =>
      enrollment.status === "APPROVED" || enrollment.status === "PENDING"
  );

  // Calculate the total credits
  const totalCredits = filteredEnrollments.reduce(
    (sum, enrollment) => sum + (enrollment.course?.credits || 0),
    0
  );

  // Handle the cancel enrollment button click
  const handleCancelEnrollment = (enrollmentId) => {
    setSelectedEnrollment(enrollmentId);
    setIsDialogOpen(true);
  };

  // Handle the Confirm action in the dialog
  const handleConfirmCancel = async () => {
    const token = localStorage.getItem("token");
    if (selectedEnrollment) {
      console.log("Cancelled Enrollment ID:", selectedEnrollment);
    }
    await studentCancelEnrollRequest(token, selectedEnrollment);
    await fetchPendingEnrollment();
    setIsDialogOpen(false);
  };

  // Handle the Cancel action in the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
              <td colSpan="5" className="text-center py-4 text-gray-500">
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
                      { enrollment.status === "PENDING"&&<Button
                        onClick={() => handleCancelEnrollment(enrollment.id)}
                      >
                        Cancel Enroll
                      </Button>}
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
      {/* Display Total Credits and Warnings */}
      <div
        className={`mt-4 text-center font-semibold ${
          totalCredits > 22 || totalCredits < 9
            ? "text-red-500"
            : "text-gray-800"
        }`}
      >
        Total Credits: {totalCredits} / 22
        {totalCredits > 22 && (
          <p className="text-red-500 mt-2">
            Warning: You have enrolled in more than 22 credits.
          </p>
        )}
        {totalCredits < 9 && (
          <p className="text-red-500 mt-2">
            Warning: Your credits are below the minimum required (9 credits) for
            each semester.
          </p>
        )}
      </div>
    </div>
  );
}

export default CurrentSemesterEnrollment;
