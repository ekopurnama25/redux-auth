import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuthAction } from "../../redux/actions/authActions";
const LoginComponents = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("1. Hendle Keaction");
    dispatch(loginAuthAction({ email: email, password: password }));
  };
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          name="email"
          placeholder="email ..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password ..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};

export default LoginComponents;
