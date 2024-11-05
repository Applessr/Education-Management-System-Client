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
import EnrollmentFlow from "../components/student/CourseNode";
import LoginEmployee from "../pages/auth/LoginEmployee";
import { UserContextProvider } from "../contexts/UserContext";
import StudentInfo from "../pages/student/StudentInfo";
import StudentPayment from "../pages/student/StudentPayment";
import AcademicSchedule from "../pages/student/AcademicSchedule";
import StudentDashboard from "../pages/student/StudentDashbard";
import TeacherInfo from "../pages/teacher/TeacherInfo";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherCourse from "../pages/teacher/TeacherCourse";
import TeacherRequestedCourse from "../pages/teacher/TeacherRequestedCourse";
import TeacherAdvisors from "../pages/teacher/TeacherAdvisors";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProfessor from "../pages/admin/AdminProfessor";
import AdminStudent from "../pages/admin/AdminStudent";
import StudentEnrollResult from "../pages/student/StudentEnrollResult";
import ProtectRoute from "./ProtectRoute";
import { StudentContextProvider } from "../contexts/StudentContext";
import { TeacherContextProvider } from "../contexts/TeacherContext";
import { AdminContextProvider } from "../contexts/AdminContext";
import AdminCourse from "../pages/admin/AdminCourse";
import TeacherAcademicSchedule from "../pages/teacher/TeacherAcademicSchedule";
import AboutPage from "../pages/guest/AboutPage";
import AcademicPage from "../pages/guest/AcademicPage";
import CampusPage from "../pages/guest/CampusPage";
import ActivityPage from "../pages/guest/ActivityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
      
      { path: "about", element: <AboutPage /> },
      { path: "academic", element: <AcademicPage /> },
      { path: "campus", element: <CampusPage /> },
      { path: "activities", element: <ActivityPage /> },
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
      </UserContextProvider>),

    children: [
      { index: true, element: <LandingPage /> },
      { path: "profile", element: <StudentInfo /> },
      { path: "enroll", element: <EnrollmentFlow /> },
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
      </UserContextProvider>),
    children: [
      { index: true, element: <LandingPage /> },
      { path: "profile", element: <TeacherInfo /> },
      { path: "dashboard", element: <TeacherDashboard /> },
      { path: "schedule", element: <TeacherAcademicSchedule /> },
      { path: "course", element: <TeacherCourse /> },
      { path: "requested-course", element: <TeacherRequestedCourse /> },
      { path: "advisors", element: <TeacherAdvisors /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <UserContextProvider>
        <AdminContextProvider>
          <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />
        </AdminContextProvider>
      </UserContextProvider>),
    children: [
      { index: true, element: <LandingPage /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "course", element: <AdminCourse /> },
      { path: "professor", element: <AdminProfessor /> },
      { path: "student", element: <AdminStudent /> },
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
