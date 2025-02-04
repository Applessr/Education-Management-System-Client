import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import LandingPage from "../pages/guest/LandingPage";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import AdminLayout from "../layouts/AdminLayout";
import ChooseRole from "../pages/auth/ChooseRole";
import AuthenLayout from "../layouts/AuthenLayout";
import Login from "../pages/auth/Login";
import EnrollmentFlow from "../components/student/Enroll/CourseNode";
import LoginEmployee from "../pages/auth/LoginEmployee";
import { UserContextProvider } from "../contexts/UserContext";
import StudentInfo from "../pages/student/StudentInfo";
import StudentPayment from "../pages/student/StudentPayment";
import AcademicSchedule from "../pages/student/AcademicSchedule";
import StudentDashboard from "../pages/student/StudentDashbard";
import TeacherInfo from "../pages/teacher/TeacherInfo";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherCourse from "../pages/teacher/Teacher_Course/TeacherCourse";
import TeacherRequestedCourse from "../pages/teacher/TeacherRequestedCourse";
import TeacherAdvisors from "../pages/teacher/TeacherAdvisors/TeacherAdvisors";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import AdminStudent from "../pages/admin/AdminStudent/AdminStudent";
import StudentEnrollResult from "../pages/student/StudentEnrollResult";
import ProtectRoute from "./ProtectRoute";
import { StudentContextProvider } from "../contexts/StudentContext";
import { TeacherContextProvider } from "../contexts/TeacherContext";
import { AdminContextProvider } from "../contexts/AdminContext";
import AboutPage from "../pages/guest/AboutPage";
import AcademicPage from "../pages/guest/AcademicPage";
import CampusPage from "../pages/guest/CampusPage";
import ActivityPage from "../pages/guest/ActivityPage";
import ContactPage from "../pages/guest/ContactPage";
import CampusCarryPage from "../pages/guest/CampusCarryPage";
import CounselingPage from "../pages/guest/CounselingPage";
import StudentInCourse from "../pages/teacher/Teacher_Course/StudentInCourse";
import AdminCourseSyllabus from "../pages/admin/AdminCourseSyllabus";
import AdminProfessor from "../pages/admin/AdminProfessor/AdminProfessor";
import TeacherAcademicSchedule from "../pages/teacher/TeacherSchedule/TeacherAcademicSchedule";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import StudentEnrollment from "../pages/student/StudentEnrollment";
import AdminCourse from "../pages/admin/AdminCourse/AdminCourse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "academic", element: <AcademicPage /> },
      { path: "campus", element: <CampusPage /> },
      { path: "activities", element: <ActivityPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "campusCarry", element: <CampusCarryPage /> },
      { path: "counsel", element: <CounselingPage /> },
      { path: "counsel", element: <CounselingPage /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  {
    path: "/authentication",
    element: (
      <UserContextProvider>
        <AuthenLayout />
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <ChooseRole /> },
      { path: "login", element: <Login /> },
      { path: "login-employee", element: <LoginEmployee /> },
      { path: "login/forget-password", element: <ForgetPassword /> },
      { path: "login-employee/forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/student",
    element: (
      <UserContextProvider>
        <StudentContextProvider>
          <ProtectRoute element={<StudentLayout />} allow={["STUDENT"]} />
          {/* <StudentLayout /> */}
        </StudentContextProvider>
      </UserContextProvider>
    ),

    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "profile", element: <StudentInfo /> },
      { path: "enroll", element: <StudentEnrollment /> },
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "enrollResult", element: <StudentEnrollResult /> },
      { path: "academic-schedule", element: <AcademicSchedule /> },
      { path: "payment", element: <StudentPayment /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  {
    path: "/teacher",
    element: (
      <UserContextProvider>
        <TeacherContextProvider>
          <ProtectRoute element={<TeacherLayout />} allow={["TEACHER"]} />
          {/* <TeacherLayout /> */}
        </TeacherContextProvider>
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <TeacherDashboard /> },
      { path: "profile", element: <TeacherInfo /> },
      { path: "dashboard", element: <TeacherDashboard /> },
      { path: "schedule", element: <TeacherAcademicSchedule /> },
      { path: "course", element: <TeacherCourse /> },
      { path: "course/:courseCode/:section", element: <StudentInCourse /> },
      { path: "requested-course", element: <TeacherRequestedCourse /> },
      { path: "advisee", element: <TeacherAdvisors /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <UserContextProvider>
        <AdminContextProvider>
          {/* <AdminLayout /> */}
          <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />
        </AdminContextProvider>
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "course", element: <AdminCourse /> },
      { path: "professor", element: <AdminProfessor /> },
      { path: "student", element: <AdminStudent /> },
      { path: "course-syllabus", element: <AdminCourseSyllabus /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
