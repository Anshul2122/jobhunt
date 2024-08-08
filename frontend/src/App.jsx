import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import Job from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";


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
    element: <Job />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },

  // admin routes pages:

  {
    path:'/admin/companies',
    element : <Companies/>,
  },
  {
    path:'/admin/companies/create',
    element : <CompanyCreate/>,
  },
  {
    path:'/admin/companies/:id',
    element : <CompanySetup/>,
  },
  {
    path:'/admin/jobs',
    element : <AdminJobs/>,
  },
  {
    path:'/admin/jobs/create',
    element : <PostJob/>,
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
