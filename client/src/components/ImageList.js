import React, { useContext } from "react";
import { ImageContext } from "../contexts/ImageContext";

const ImageList = () => {
  const [images] = useContext(ImageContext);
  const imgList = images.map((image) => (
    <img
      key={image.key}
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
