import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const ImageContext = createContext();

export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrl, setImageUrl] = useState("/images");
  const [me] = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(imageUrl)
      .then((res) => setImages((prevData) => [...prevData, ...res.data]))
      .catch((err) => console.error(err));
  }, [imageUrl]);

  useEffect(() => {
    if (me) {
      setTimeout(() => {
        axios
          .get("users/me/images")
          .then((res) => setMyImages(res.data))
          .catch((err) => console.error(err));
      }, 10);
    } else {
      setMyImages([]);
      setIsPublic(true);
    }
  }, [me]);

  const loadMoreImages = () => {
    if (images.length === 0) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`/images?lastid=${lastImageId}`);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        myImages,
        setMyImages,
        isPublic,
        setIsPublic,
        loadMoreImages,
      }}
    >
      {prop.children}
    </ImageContext.Provider>
  );
};
