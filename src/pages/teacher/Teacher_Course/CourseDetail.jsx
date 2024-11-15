
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { employeeEditCourse } from "@/src/api/course";

function CourseDetail({ courseData, onSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to format time for display
  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return 'N/A';
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to format time for input fields
  const formatTimeForInput = (timeString) => {
    if (!timeString) return '';
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const [formData, setFormData] = useState({
    seat: courseData?.seat || '',
    teacherId: courseData?.teacherId || "",
    studyDay: courseData?.classSchedules?.[0]?.day || "",
    studyStartTime: formatTimeForInput(courseData?.classSchedules?.[0]?.startTime) || "",
    studyEndTime: formatTimeForInput(courseData?.classSchedules?.[0]?.endTime) || "",
    studyRoom: courseData?.classSchedules?.[0]?.room || "",
    examDate: courseData?.examSchedule?.[0]?.examDate?.split('T')[0] || "",
    examStartTime: formatTimeForInput(courseData?.examSchedule?.[0]?.startTime) || "",
    examEndTime: formatTimeForInput(courseData?.examSchedule?.[0]?.endTime) || "",
    examRoom: courseData?.examSchedule?.[0]?.room || "",
    examType: courseData?.examSchedule?.[0]?.examType || "MIDTERM"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updateData = {
        seat: parseInt(formData.seat),
        teacherId: parseInt(formData.teacherId),
        classSchedules: [{
          day: parseInt(formData.studyDay),
          startTime: formData.studyStartTime,
          endTime: formData.studyEndTime,
          room: formData.studyRoom
        }],
        examSchedule: [{
          examType: formData.examType,
          examDate: formData.examDate,
          startTime: formData.examStartTime,
          endTime: formData.examEndTime,
          room: formData.examRoom
        }]
      };

      const token = localStorage.getItem('token');
      await employeeEditCourse(token, courseData.id, updateData);

      toast.success('Course updated successfully');
      setIsEditing(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setIsLoading(false);
    }
  };

  const dayOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
  };

  return (
    <div className="flex flex-col mx-auto items-start justify-center text-gray-600 gap-8">
      {/* <div className="text-xl font-bold mb-4">
        {courseData?.courseCode} {courseData?.courseName} (Section {courseData?.section})
      </div> */}

      <div className="flex flex-col gap-3 w-full">
        <p>
          <span className="font-bold">Credits:</span> {courseData?.credits || 'N/A'}
        </p>
        <p>
          <span className="font-bold">Seats Available:</span>{" "}
          {courseData?.seat || 'N/A'}
        </p>
        <p>
          <span className="font-bold">Teacher ID:</span>{" "}
          {courseData?.teacherId || 'N/A'}
          {courseData?.employee && ` (${courseData.employee.firstName} ${courseData.employee.lastName})`}
        </p>

        {courseData?.classSchedules?.[0] && (
          <>
            <p>
              <span className="font-bold">Study day:</span>{" "}
              {dayOfWeek[courseData.classSchedules[0].day]}{" "}
              {formatTimeForDisplay(courseData.classSchedules[0].startTime)} -{" "}
              {formatTimeForDisplay(courseData.classSchedules[0].endTime)}
            </p>
            <p>
              <span className="font-bold">Study room:</span>{" "}
              {courseData.classSchedules[0].room}
            </p>
          </>
        )}

        {courseData?.examSchedule?.[0] && (
          <>
            <p>
              <span className="font-bold">Exam day:</span>{" "}
              {formatDate(courseData.examSchedule[0].examDate)}{" "}
              {formatTimeForDisplay(courseData.examSchedule[0].startTime)} -{" "}
              {formatTimeForDisplay(courseData.examSchedule[0].endTime)}
            </p>
            <p>
              <span className="font-bold ">Exam room:</span>{" "}
              {courseData.examSchedule[0].room}
            </p>
          </>
        )}
      </div>

      <div className="flex w-full justify-center ">
        <Button onClick={() => setIsEditing(true)} className=" bg-[#1B1C52]" variant="default">Edit</Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-h-[90vh] overflow-y-auto min-w-[50vw] hide-scrollbar">
          <DialogHeader>
            <DialogTitle><h1 className="text-2xl font-bold ">Edit Course Details</h1></DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Seats Available</Label>
              <Input
                type="number"
                name="seat"
                value={formData.seat}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Teacher ID</Label>
              <Input
                type="number"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study Day (1-7)</Label>
              <Input
                type="number"
                min="1"
                max="7"
                name="studyDay"
                value={formData.studyDay}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study Start Time (HH:mm)</Label>
              <Input
                type="time"
                name="studyStartTime"
                value={formData.studyStartTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study End Time (HH:mm)</Label>
              <Input
                type="time"
                name="studyEndTime"
                value={formData.studyEndTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study Room</Label>
              <Input
                name="studyRoom"
                value={formData.studyRoom}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Exam Date</Label>
              <Input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Exam Start Time (HH:mm)</Label>
              <Input
                type="time"
                name="examStartTime"
                value={formData.examStartTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Exam End Time (HH:mm)</Label>
              <Input
                type="time"
                name="examEndTime"
                value={formData.examEndTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Exam Room</Label>
              <Input
                name="examRoom"
                value={formData.examRoom}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#1B1B52]"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CourseDetail;