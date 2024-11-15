
import { useEffect, useState, useMemo } from "react";
import { ChevronDownIcon, ChevronRightIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import useTeacher from "@/src/hooks/useTeacher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CourseDetail from "@/src/pages/teacher/Teacher_Course/CourseDetail";

export default function DataTableCourse() {
  const [openCourses, setOpenCourses] = useState({});
  const [editingCourse, setEditingCourse] = useState(null);
  const { teacherCourse, course, setSelectCourse } = useTeacher();
  const token = localStorage.getItem('token');

  const dayOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
  };

  const formatDay = (day) => {
    return dayOfWeek[day] || "N/A";
  };

  useEffect(() => {
    teacherCourse(token);
  }, [token]);

  const memoizedOpenCourses = useMemo(() => openCourses, [openCourses]);

  const toggleCourse = (courseId) => {
    setOpenCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const courseSelect = (courseId) => {
    setSelectCourse(courseId);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatStudyTime = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";
    const start = formatTime(startTime);
    const end = formatTime(endTime);
    return `${start} - ${end}`;
  };

  const handleEdit = (e, section) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingCourse(section);
  };

  const memoizedCourse = useMemo(() => {
    if (!course || Object.keys(course).length === 0) {
      return null;
    }
    return Object.keys(course).map((courseId) => (
      <div key={courseId} className="rounded-md shadow border mb-4">
        <div
          className="flex items-center bg-[#AB842E] rounded-md text-white p-4 cursor-pointer"
          onClick={() => toggleCourse(courseId)}
        >
          {memoizedOpenCourses[courseId] ? (
            <ChevronDownIcon className="h-5 w-5 mr-2" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 mr-2" />
          )}


          <span className="font-bold">
            {courseId} {course[courseId][0]?.courseName} ({course[courseId].length} Section{course[courseId].length > 1 ? "s" : ""})
          </span>
        </div>
        {memoizedOpenCourses[courseId] && (
          <div className="p-4 text-[#041942]">
            <Table>
              <TableHeader>
                <TableRow className="text-[#041942]">
                  <TableHead>#</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Cr.</TableHead>
                  <TableHead>Sec.</TableHead>
                  <TableHead>Study Day</TableHead>
                  <TableHead>Study Time</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Exam Day</TableHead>
                  <TableHead>Exam Time</TableHead>
                  <TableHead>Exam Room</TableHead>
                  <TableHead>Seat</TableHead>
                  <TableHead>Enroll</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course[courseId].map((section, index) => {
                  const classSchedule = section.classSchedules?.[0];
                  const examSchedule = section.examSchedule?.[0];

                  return (
                    <TableRow key={section.id} className='hover:bg-slate-200' onClick={() => courseSelect(section.id)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link
                          className="hover:underline font-bold hover:text-blue-700"
                          to={`${section.courseCode}/${section.section}`}>
                          {section.courseCode}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          className="hover:underline font-bold hover:text-blue-700"
                          to={`${section.courseCode}/${section.section}`}>
                          {section.courseName}
                        </Link>
                      </TableCell>
                      <TableCell>{section.credits}</TableCell>
                      <TableCell>{section.section}</TableCell>
                      <TableCell>{formatDay(classSchedule?.day)}</TableCell>
                      <TableCell>
                        {formatStudyTime(classSchedule?.startTime, classSchedule?.endTime)}
                      </TableCell>
                      <TableCell>{classSchedule?.room || "N/A"}</TableCell>
                      <TableCell>{examSchedule ? formatDate(examSchedule.examDate) : "N/A"}</TableCell>
                      <TableCell>
                        {formatStudyTime(examSchedule?.startTime, examSchedule?.endTime)}
                      </TableCell>
                      <TableCell>{examSchedule?.room || "N/A"}</TableCell>
                      <TableCell>{section.seat}</TableCell>
                      <TableCell>{section.enrollments.length}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          onClick={(e) => handleEdit(e, section)}
                          className="hover:bg-amber-100"
                        >
                          <Pencil2Icon className="h-4 w-4 text-amber-600" />
                          Edit Course
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    ));
  }, [course, memoizedOpenCourses]);

  if (!course || Object.keys(course).length === 0) {
    return <p>No courses available at the moment.</p>;
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-[#ab842e] mb-4">Course</h1>
      {memoizedCourse}

      <Dialog open={!!editingCourse} onOpenChange={(open) => { if (!open) setEditingCourse(null) }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCourse?.courseCode} {editingCourse?.courseName} (Section {editingCourse?.section})
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CourseDetail
              courseData={editingCourse}
              onClose={() => setEditingCourse(null)}
              onSuccess={() => {
                teacherCourse(token);
                setEditingCourse(null);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}