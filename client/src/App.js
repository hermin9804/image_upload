import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ToolBar from "./components/ToolBar";

const App = () => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <ToolBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
