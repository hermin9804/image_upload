import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ImageContext } from "../contexts/ImageContext";
import "./ImageList.css";

const ImageList = () => {
  const {
    images,
    myImages,
    isPublic,
    setIsPublic,
    loadMoreImages,
    imageLoading,
    imageError,
  } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  const navigate = useNavigate();
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      console.log("intersection", entry.isIntersecting);
      if (entry.isIntersecting) {
        loadMoreImages();
      }
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [loadMoreImages]);

  const imgList = isPublic
    ? images.map((image, index) => (
        <img
          key={image.key}
          src={`http://localhost:5001/uploads/${image.key}`}
          alt={image.name}
          ref={index > images.length - 5 ? elementRef : null}
          onClick={() => {
            navigate(`/images/${image._id}`);
          }}
        />
      ))
    : myImages.map((image, index) => (
        <img
          key={image.key}
          src={`http://localhost:5001/uploads/${image.key}`}
          alt={image.name}
          ref={index > myImages.length - 5 ? elementRef : null}
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
      {imageError && <div>Error...</div>}
      {imageLoading && <div>Loading...</div>}
    </div>
  );
};

export default ImageList;
