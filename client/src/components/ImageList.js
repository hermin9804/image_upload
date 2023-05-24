import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ImageContext } from "../contexts/ImageContext";
import "./ImageList.css";

const ImageList = () => {
  const { images, myImages, isPublic, setIsPublic } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  const navigate = useNavigate();

  const imgList = (isPublic ? images : myImages).map((image) => (
    <img
      key={image.key}
      src={`http://localhost:5001/uploads/${image.key}`}
      alt={image.name}
      onClick={() => {
        navigate(`/images/${image._id}`);
      }}
    />
  ));

  return (
    <div>
      <h3
        style={{
          display: "inline-block",
          marginRight: 10,
        }}
      >
        ImageList ({isPublic ? "공개" : "비공개"})
      </h3>
      {me && (
        <button
          onClick={() => {
            setIsPublic(!isPublic);
          }}
        >
          {(isPublic ? "개인" : "공개") + " 사진 보기"}
        </button>
      )}
      <div className="image-list-container">{imgList}</div>
    </div>
  );
};

export default ImageList;
