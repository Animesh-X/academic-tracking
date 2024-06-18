import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import userLoader from './loaders/userLoader';
import userLoginLoader from './loaders/userLoginLoader';
import adminLoader from './loaders/adminLoader';
import adminLoginLoader from './loaders/adminLoginLoader';
import adminUserLoader from './loaders/adminUserLoader.js';
import ErrorPage from './components/ErrorPage.jsx';

import AdminSignIn from './components/_auth/AdminSignIn.jsx';
import SignInSide from './components/_auth/SignInSide.jsx';
import SignUpSide from './components/_auth/SignUpSide.jsx';

import StudentSignup from './components/_auth/StudentSignup.jsx';
import StudentSignin from './components/_auth/StudentSignin.jsx';

import AddAdminPage from './components/dataforms/AddAdminPage.jsx';
import AddUser from './components/dataforms/AddUser.jsx';
import AddInstructorPage from './components/dataforms/AddInstructorPage.jsx';
import AddProgrammePage from './components/dataforms/AddProgrammePage.jsx';
import AddStudentPage from './components/dataforms/AddStudentPage.jsx';
import AddDepartment from './components/dataforms/AddDepartment.jsx';
import AddCoursePage from './components/dataforms/AddCoursePage.jsx';
import AddSession from './components/dataforms/AddSession.jsx';
import AddTakesPage from './components/dataforms/AddTakesPage.jsx';
import AddTeachesPage from './components/dataforms/AddTeachesPage.jsx';

import DepartmentPage from './components/analytics/department/DepartmentPage.jsx';
import DepartmentDetails from './components/analytics/department/DepartmentDetails.jsx';
import DepartmentCourse from './components/analytics/department/DepartmentCourse.jsx';

import InstructorPage from './components/analytics/instructor/InstructorPage.jsx';
import InstructorDetails from './components/analytics/instructor/InstructorDetails.jsx';
import InstructorCourse from './components/analytics/instructor/InstructorCourse.jsx';

import CoursePage from './components/analytics/courses/CoursePage.jsx';
import CourseDetails from './components/analytics/courses/CourseDetails.jsx';

import ProgrammePage from './components/analytics/programme/ProgrammePage.jsx';

import SessionPage from './components/analytics/session/SessionPage.jsx';
import SessionDetails from './components/analytics/session/SessionDetails.jsx';

import AdminDashBoard from './components/AdminDashBoard.jsx';
import Analytics from './components/Analytics.jsx';
import StudentPage from './components/analytics/students/StudentPage.jsx';
import StudentProgramme from './components/analytics/students/StudentProgramme.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/signin",
    element: <SignInSide />,
    errorElement: <ErrorPage />,
    loader: userLoginLoader,
  },
  {
    path: "/signup",
    element: <SignUpSide />,
    errorElement: <ErrorPage />,
    loader: userLoginLoader,
  },
  {
    path: "/admin/signin",
    element: <AdminSignIn />,
    errorElement: <ErrorPage />,
    loader: adminLoginLoader,
  },
  {
    path: "/student/signin",
    element: <StudentSignin />,
    errorElement: <ErrorPage />
  },
  {
    path: "/student/signup",
    element: <StudentSignup />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashBoard />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/add_admin",
    element: <AddAdminPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/departments",
    element: <AddDepartment />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/instructors",
    element: <AddInstructorPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/programmes",
    element: <AddProgrammePage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/sessions",
    element: <AddSession />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/courses",
    element: <AddCoursePage />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "/admin/programme",
    element: <AddProgrammePage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/students",
    element: <AddStudentPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/analytics",
    element: <Analytics />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader,
  },
  {
    path: "/admin/add_user",
    element: <AddUser />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "/admin/teaches",
    element: <AddTeachesPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "/admin/takes",
    element: <AddTakesPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "analytics/instructors",
    element: <InstructorPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/instructor/:id",
    element: <InstructorDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/instructor/:id/course/:courseId/session/:sessionId",
    element: <InstructorCourse />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/courses",
    element: <CoursePage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/course/:id",
    element: <CourseDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/sessions",
    element: <SessionPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/programmes",
    element: <ProgrammePage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/departments",
    element: <DepartmentPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/department/:id",
    element: <DepartmentDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/department/courses/:id",
    element: <DepartmentCourse />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/students",
    element: <StudentPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/students/programme/:id",
    element: <StudentProgramme />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/session/:id",
    element: <SessionDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
