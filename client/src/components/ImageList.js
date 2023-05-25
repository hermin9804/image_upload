import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ImageContext } from "../contexts/ImageContext";
import "./ImageList.css";

const ImageList = () => {
  const {
    images,
    isPublic,
    setIsPublic,
    imageLoading,
    imageError,
    setImageUrl,
  } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  const navigate = useNavigate();
  const elementRef = useRef(null);

  const loadMoreImages = useCallback(() => {
    if (images.length === 0 || imageLoading) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`${isPublic ? "" : "/users/me"}/images?lastId=${lastImageId}`);
  }, [images, imageLoading, isPublic, setImageUrl]);

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

  const imgList = images.map((image, index) => (
    <img
      key={index}
      src={`http://localhost:5001/uploads/${image.key}`}
      alt={image.name}
      ref={index === images.length - 1 ? elementRef : null}
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
