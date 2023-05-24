import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImageContext } from "../contexts/ImageContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const ImagePage = () => {
  const { imageId } = useParams();
  const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
  const [hasLiked, setHasLiked] = useState(false);
  const [me] = useContext(AuthContext);
  const image =
    images.find((image) => image._id === imageId) ||
    myImages.find((image) => image._id === imageId);

  useEffect(() => {
    if (image && me && image.likes.includes(me.userId)) setHasLiked(true);
  }, [me, image]);

  if (!image) {
    return <h3>Loading...</h3>;
  }

  const updataImage = (images, image) =>
    [...images.filter((image) => image._id !== imageId), image].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const onSubmit = async () => {
    const res = await axios.patch(
      `/images/${imageId}/${hasLiked ? "unlike" : "like"}`
    );
    if (res.data.public) setImages(updataImage(images, res.data));
    else setMyImages(updataImage(myImages, res.data));
    setHasLiked(!hasLiked);
  };

  return (
    <div>
      <h3>ImagePage - {imageId}</h3>
      <img
        style={{ width: "100%" }}
        alt={imageId}
        src={`http://localhost:5001/uploads/${image.key}`}
      />
      <span>좋아요{image.likes.length}</span>
      <button style={{ float: "right" }} onClick={onSubmit}>
        {hasLiked ? "좋아요취소" : "좋아요"}
      </button>
    </div>
  );
};

export default ImagePage;
