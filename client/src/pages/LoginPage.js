import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setMe] = useContext(AuthContext);
	const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
			if (username.length < 3 )
				return toast.error("Username must be at least 3 characters long");
			if (password.length < 6 )
				return toast.error("Password must be at least 6 characters long");

      const res = await axios.patch("/users/login", {
        username,
        password,
      });
      setMe({ 
        userId: res.data.userId,
        sessionId: res.data.sessionId,
        name: res.data.name
			});
      toast.success("Login Success");
			navigate("/");
    } catch (error) {
			console.error(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        marginTop: 100,
        maxWidth: 300,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>로그인</h3>
      <form onSubmit={submitHandler}>
        <CustomInput label="username" value={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
