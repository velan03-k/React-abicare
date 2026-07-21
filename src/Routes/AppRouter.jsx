import { Routes, Route } from "react-router-dom";

import UserLayout from "../Layouts/UserLayout";
import AdminLayout from "../Layouts/AdminLayout";

import Homepage from "../Pages/Home";
import AboutPage from "../Pages/About";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import ForgotPassword from "../Pages/ForgotPassword";

import Dashboard from "../Pages/Admin/Dashboard";
import Doctoresadmin from "../Pages/Admin/Doctoresadmin";
import Doctors from "../Pages/Doctors";
import Departments from "../Pages/Departments";
import Applications from "../Pages/Applications";
function AppRouter() {
  return (
    <Routes>

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/departments" element={<Departments  />} />
        <Route path="/applications" element={<Applications />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Homepage />}/>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/doctores" element={<Doctoresadmin />} />
      </Route>

    </Routes>
  );
}

export default AppRouter;