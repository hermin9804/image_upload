import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UploadForm from "./components/UploadForm";
import ImageList from "./components/ImageList";

const App = () => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <ToastContainer />
      <h2>사진첩</h2>
      <UploadForm />
      <ImageList />
    </div>
  );
};

export default App;
