import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuthAction } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginComponents = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        loginAuthAction({ email: email, password: password })
      );

      if (res) {
        if (res.data.users.roles[0].roles === "Admin") {
          navigate("/admin");
        } else {
          navigate("/users");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <br />
        <button> Daftar </button>
      </form>
    </div>
  );
};

export default LoginComponents;
