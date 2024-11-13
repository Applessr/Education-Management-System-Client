// import { useEffect, useState, useMemo } from "react";
// import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Link, useNavigate } from "react-router-dom";
// import useTeacher from "@/src/hooks/useTeacher";

// export default function DataTableCourse() {
//   const [openCourses, setOpenCourses] = useState({});
//   const { teacherCourse, course, setSelectCourse } = useTeacher();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     teacherCourse(token);
//   }, [token]);

//   const memoizedOpenCourses = useMemo(() => openCourses, [openCourses]);
//   // console.log(memoizedOpenCourses)

//   const toggleCourse = (courseId) => {
//     setOpenCourses((prev) => ({
//       ...prev,
//       [courseId]: !prev[courseId],
//     }));
//   };

//   const courseSelect = (courseId) => {
//     setSelectCourse(courseId);
//   };

//   // console.log('course :>> ', course);


//   const memoizedCourse = useMemo(() => {
//     if (!course || Object.keys(course).length === 0) {
//       return null;
//     }
//     return Object.keys(course).map((courseId) => (
//       <div key={courseId} className="rounded-md shadow border mb-4">
//         <div
//           className="flex items-center bg-[#AB842E] rounded-md text-white p-4 cursor-pointer"
//           onClick={() => toggleCourse(courseId)}
//         >
//           {memoizedOpenCourses[courseId] ? (
//             <ChevronDownIcon className="h-5 w-5 mr-2" />
//           ) : (
//             <ChevronRightIcon className="h-5 w-5 mr-2" />
//           )}

//           <span className="font-bold">
//             {courseId} {course[courseId][0]?.courseName} ({course[courseId].length} Section{course[courseId].length > 1 ? "s" : ""})
//           </span>
//         </div>
//         {memoizedOpenCourses[courseId] && (
//           <div className="p-4 text-[#041942]">
//             <Table>
//               <TableHeader >
//                 <TableRow className="text-[#041942]" >
//                   <TableHead>#</TableHead>
//                   <TableHead>Code</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Cr.</TableHead>
//                   <TableHead>Sec.</TableHead>
//                   <TableHead>Study Day</TableHead>
//                   <TableHead>Room</TableHead>
//                   <TableHead>Exam Day</TableHead>
//                   <TableHead>Seat</TableHead>
//                   <TableHead>Enroll</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {course[courseId].map((section, index) => (
//                   <TableRow key={section.id} className='hover:bg-slate-200' onClick={() => courseSelect(section.id)}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>
//                       <Link to={`${section.courseCode}/${section.section}`}>
//                         {section.courseCode}
//                       </Link>
//                     </TableCell>
//                     <TableCell>
//                       <Link to={`${section.courseCode}/${section.section}`}>
//                         {section.courseName}
//                       </Link>
//                     </TableCell>
//                     <TableCell>{section.credits}</TableCell>
//                     <TableCell>{section.section}</TableCell>
//                     <TableCell>{section.classSchedules.length > 0 ? section.classSchedules[0].studyDay : "N/A"}</TableCell>
//                     <TableCell>{section.classSchedules.length > 0 ? section.classSchedules[0].room : "N/A"}</TableCell>
//                     <TableCell>{section.examSchedule.length > 0 ? section.examSchedule[0].examDay : "N/A"}</TableCell>
//                     <TableCell>{section.seat}</TableCell>
//                     <TableCell>{section.enrollments.length}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </div>
//     ));
//   }, [course, memoizedOpenCourses]);

//   if (!course || Object.keys(course).length === 0) {
//     return <p>No courses available at the moment.</p>;
//   }

//   return (
//     <div className="w-full">
//       <h1 className="text-2xl font-bold text-amber-700 mb-4">Course</h1>
//       {memoizedCourse}
//     </div>
//   );
// }



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


  const handleEdit = (e, section) => {
    e.preventDefault(); // Prevent navigation when clicking edit
    e.stopPropagation(); // Prevent row click event
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
                  <TableHead>Room</TableHead>
                  <TableHead>Exam Day</TableHead>
                  <TableHead>Seat</TableHead>
                  <TableHead>Enroll</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course[courseId].map((section, index) => (
                  <TableRow key={section.id} className='hover:bg-slate-200' onClick={() => courseSelect(section.id)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link to={`${section.courseCode}/${section.section}`}>
                        {section.courseCode}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`${section.courseCode}/${section.section}`}>
                        {section.courseName}
                      </Link>
                    </TableCell>
                    <TableCell>{section.credits}</TableCell>
                    <TableCell>{section.section}</TableCell>
                    <TableCell>{section.classSchedules.length > 0 ? section.classSchedules[0].studyDay : "N/A"}</TableCell>
                    <TableCell>{section.classSchedules.length > 0 ? section.classSchedules[0].room : "N/A"}</TableCell>
                    <TableCell>{section.examSchedule.length > 0 ? section.examSchedule[0].examDay : "N/A"}</TableCell>
                    <TableCell>{section.seat}</TableCell>
                    <TableCell>{section.enrollments.length}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={(e) => handleEdit(e, section)}
                        className="hover:bg-amber-100"
                      >
                        <Pencil2Icon className="h-4 w-4 text-amber-600" />
                        Edit COurse
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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

      <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCourse?.courseCode} {editingCourse?.courseName} (Section {editingCourse?.section})
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CourseDetail courseData={editingCourse} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}