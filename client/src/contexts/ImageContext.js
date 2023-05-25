import React, {
  useRef,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const ImageContext = createContext();

export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrl, setImageUrl] = useState("/images");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [me] = useContext(AuthContext);
  const pastImageRef = useRef(null);

  useEffect(() => {
    if (pastImageRef.current === imageUrl) return;
    setImageLoading(true);
    axios
      .get(imageUrl)
      .then((res) =>
        isPublic
          ? setImages((prevData) => [...prevData, ...res.data])
          : setMyImages((prevData) => [...prevData, res.data])
      )
      .catch((err) => {
        console.error(err);
        setImageError(err);
      })
      .finally(() => {
        setImageLoading(false);
        pastImageRef.current = imageUrl;
      });
  }, [imageUrl, isPublic]);

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

  return (
    <ImageContext.Provider
      value={{
        images: isPublic ? images : myImages,
        setImages,
        setMyImages,
        isPublic,
        setIsPublic,
        imageLoading,
        imageError,
        setImageUrl,
      }}
    >
      {prop.children}
    </ImageContext.Provider>
  );
};
