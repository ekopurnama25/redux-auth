import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginAuthAction } from "../../redux/actions/authActions";
//import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../utils/cookies";
const LoginComponents = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUsers] = useState();
  const dispatch = useDispatch();
  const { authReducersResult } = useSelector((state) => state.authReducers);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("1. Hendle Keaction");
    dispatch(loginAuthAction({ email: email, password: password }));
  };

  useEffect(() => {
    if (authReducersResult) {
      const token = getCookie();
      jwt_decode(token);
    }
  }, [authReducersResult, dispatch]);

  const token = getCookie();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {authReducersResult && <Navigate to="/" />}
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
