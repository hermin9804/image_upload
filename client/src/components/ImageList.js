import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  const imgList = images.map((image) => (
    <img
      style={{ width: "100%" }}
      src={`http://localhost:5001/uploads/${image.key}`}
      alt={image.name}
    />
  ));

  return (
    <div>
      <h3>ImageList</h3>
      {imgList}
    </div>
  );
};

export default ImageList;
