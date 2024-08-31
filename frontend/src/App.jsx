import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";

import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // admin routes pages:

  {
    path:'/admin/companies',
    element : <ProtectedRoute><Companies/></ProtectedRoute> ,
  },
  {
    path:'/admin/companies/create',
    element :<ProtectedRoute><CompanyCreate/></ProtectedRoute> ,
  },
  {
    path:'/admin/companies/:id',
    element : <ProtectedRoute><CompanySetup/></ProtectedRoute> ,
  },
  {
    path:'/admin/jobs',
    element : <ProtectedRoute><AdminJobs/></ProtectedRoute> ,
  },
  {
    path:'/admin/jobs/create',
    element : <ProtectedRoute><PostJob/></ProtectedRoute> ,
  },
  {
    path:'/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants/></ProtectedRoute> 
  }
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App