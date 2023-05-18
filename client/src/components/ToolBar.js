import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ToolBar = () => {
  const [me, setMe] = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await axios.patch("/users/logout");
      setMe(null);
      toast.success("로그아웃 성공");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <span>사진첩</span>
      </Link>
      {me ? (
        <span onClick={logoutHandler} style={{ float: "right" }}>
          로그아웃
        </span>
      ) : (
        <>
          <Link to="/auth/login">
            <span style={{ float: "right" }}>로그인</span>
          </Link>
          <Link to="/auth/register">
            <span style={{ float: "right", marginRight: 15 }}>회원가입</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default ToolBar;
