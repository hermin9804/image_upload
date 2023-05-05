import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UploadForm.css";
import ProgressBar from "./ProgressBar";

const UploadForm = ({ images, setImages }) => {
  const defaultFileName = "이미지 파일을 업로드 해주세요.";
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [percent, setPercent] = useState(0);

  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          setPercent(Math.round((100 * e.loaded) / e.total));
        },
      });
      setImages([...images, res.data]);

      toast.success("이미지 업로드 성공");
      setTimeout(() => {
        setPercent(0);
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);
    } catch (err) {
      setPercent(0);
      setFileName(defaultFileName);
      setImgSrc(null);
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <img
        src={imgSrc}
        className={`image-preview ${imgSrc && "image-preview-show"}`}
      />
      <ProgressBar percent={percent} />
      <div className="file-dropper">
        {fileName}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={imageSelectHandler}
        />
      </div>
      <button className="submit-button" type="submit">
        제출
      </button>
    </form>
  );
};

export default UploadForm;
