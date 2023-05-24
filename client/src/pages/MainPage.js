import React from "react";
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";
import { AuthContext } from "../contexts/AuthContext";

const MainPage = () => {
  const [me] = React.useContext(AuthContext);
  return (
    <div>
      <h2>사진첩</h2>
      {me && <UploadForm />}
      <ImageList />
    </div>
  );
};

export default MainPage;
