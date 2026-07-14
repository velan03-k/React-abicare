import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Home";
import AboutPage from "../Pages/About";
import Signup from "../Pages/SignUp";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  );
}

export default AppRouter;