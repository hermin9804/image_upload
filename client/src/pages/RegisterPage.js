import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

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
      <form>
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
      </form>
    </div>
  );
};

export default RegisterPage;
