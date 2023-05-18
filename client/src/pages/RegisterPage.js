import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [me, setMe] = useContext(AuthContext);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(name, username, password, passwordCheck);
      if (username.length < 3)
        throw new Error("username	은 3글자 이상이어야 합니다.");
      if (password.length < 6)
        throw new Error("password	은 6글자 이상이어야 합니다.");
      if (password !== passwordCheck)
        throw new Error("비밀번호가 일치하지 않습니다.");

      const res = await axios.post("/users/register", {
        name,
        username,
        password,
      });
      setMe({
        userId: res.data.userId,
        sessionId: res.data.sessionId,
        name: res.data.name,
      });

      toast.success("회원가입 성공");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
      <h3> 회권가입</h3>
      <form onSubmit={submitHandler}>
        <CustomInput label="이름" value={name} setValue={setName} />
        <CustomInput label="username" value={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <CustomInput
          label="비밀번호 확인"
          value={passwordCheck}
          setValue={setPasswordCheck}
          type="password"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
