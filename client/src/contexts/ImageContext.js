import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ImageContext = createContext();

export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ImageContext.Provider value={[images, setImages]}>
      {prop.children}
    </ImageContext.Provider>
  );
};
