import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import UploadForm from "./components/UploadForm";
import ImageList from "./components/ImageList";

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <ToastContainer />
      <h2>사진첩</h2>
      <UploadForm images={images} setImages={setImages} />
      <ImageList images={images} />
    </div>
  );
};

export default App;
