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
import LoginEmployee from "../pages/auth/LoginEmployee";
import { UserContextProvider } from "../contexts/UserContext";
import EnrollmentFlow from "../components/student/CourseNode";
import StudentInfo from "../pages/student/StudentInfo";
import ClassSchedule from "../pages/student/ClassSchedule";
import ExamSchedule from "../pages/student/ExamSchedule";
import StudentPayment from "../pages/student/StudentPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <LandingPage /> },
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
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "profile", element: <StudentInfo /> },
      { path: "enroll", element: <EnrollmentFlow /> },
      { path: "class-schedule", element: <ClassSchedule /> },
      { path: "exam-schedule", element: <ExamSchedule /> },
      { path: "payment", element: <StudentPayment /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "unauthorization", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <LandingPage /> },
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
