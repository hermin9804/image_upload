import React, { useEffect, useState } from "react";

const ImageList = ({ images }) => {
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
