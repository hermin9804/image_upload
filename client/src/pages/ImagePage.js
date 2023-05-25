import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageContext } from "../contexts/ImageContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ImagePage = () => {
  const navigate = useNavigate();
  const { imageId } = useParams();
  const { images, setImages, setMyImages } = useContext(ImageContext);
  const [hasLiked, setHasLiked] = useState(false);
  const [me] = useContext(AuthContext);
  const image = images.find((image) => image._id === imageId);

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
    if (res.data.public)
      setImages((prevData) => updataImage(prevData, res.data));
    setMyImages((prevData) => updataImage(prevData, res.data));
    setHasLiked(!hasLiked);
  };

  const deleteHandler = async () => {
    try {
      if (!window.confirm("정말 해당 이미지를 삭제하시겠습니까?")) return;
      const res = await axios.delete(`/images/${imageId}`);
      toast.success(res.data.message);
      setImages((prevData) =>
        prevData.filter((image) => image._id !== imageId)
      );
      setMyImages((prevData) =>
        prevData.filter((image) => image._id !== imageId)
      );
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
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
      {me && image.user._id === me.userId && (
        <button
          style={{ float: "right", marginLeft: 10 }}
          onClick={deleteHandler}
        >
          삭제
        </button>
      )}
      <button style={{ float: "right" }} onClick={onSubmit}>
        {hasLiked ? "좋아요취소" : "좋아요"}
      </button>
    </div>
  );
};

export default ImagePage;
