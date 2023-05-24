import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ToolBar = () => {
  const navigate = useNavigate();
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
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        사진첩
      </span>
      {me ? (
        <span
          onClick={logoutHandler}
          style={{ float: "right", cursor: "pointer" }}
        >
          로그아웃 ({me.name})
        </span>
      ) : (
        <>
          <span
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            로그인
          </span>
          <span
            style={{ float: "right", marginRight: 15, cursor: "pointer" }}
            onClick={() => {
              navigate("/auth/register");
            }}
          >
            회원가입
          </span>
        </>
      )}
    </div>
  );
};

export default ToolBar;
