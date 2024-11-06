import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function CourseDetail({ courseData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    seat: courseData.seat,
    teacherId: courseData.teacherId,
    studyDay: courseData.classSchedule.day,
    studyStartTime: courseData.classSchedule.startTime,
    studyEndTime: courseData.classSchedule.endTime,
    studyRoom: courseData.classSchedule.room,
    examDate: courseData.examSchedule.examDate,
    examStartTime: courseData.examSchedule.startTime,
    examEndTime: courseData.examSchedule.endTime,
    examRoom: courseData.examSchedule.room,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Edited data:", formData); // Console the edited data
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col mx-auto items-start justify-center text-gray-600 space-y-2">
      <p>
        <span className="font-semibold">Credits:</span> {courseData.credits}
      </p>
      <p>
        <span className="font-semibold">Seats Available:</span>{" "}
        {courseData.seat}
      </p>
      <p>
        <span className="font-semibold">Teacher ID:</span>{" "}
        {courseData.teacherId} ({courseData.employee.firstName}{" "}
        {courseData.employee.lastName})
      </p>
      <p>
        <span className="font-semibold">Study day:</span>{" "}
        {courseData.classSchedule.day} {courseData.classSchedule.startTime} -{" "}
        {courseData.classSchedule.endTime}
      </p>
      <p>
        <span className="font-semibold">Study room:</span>{" "}
        {courseData.classSchedule.room}
      </p>
      <p>
        <span className="font-semibold">Exam day:</span>{" "}
        {courseData.examSchedule.examDate} {courseData.examSchedule.startTime} -{" "}
        {courseData.examSchedule.endTime}
      </p>
      <p>
        <span className="font-semibold">Exam room:</span>{" "}
        {courseData.examSchedule.room}
      </p>

      <Button onClick={() => setIsEditing(true)}>Edit</Button>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Seats Available</Label>
              <Input
                name="seat"
                value={formData.seat}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Teacher ID</Label>
              <Input
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study Day</Label>
              <Input
                name="studyDay"
                value={formData.studyDay}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study Start Time</Label>
              <Input
                name="studyStartTime"
                value={formData.studyStartTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Study End Time</Label>
              <Input
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
                name="examDate"
                value={formData.examDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Exam Start Time</Label>
              <Input
                name="examStartTime"
                value={formData.examStartTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Exam End Time</Label>
              <Input
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
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CourseDetail;
