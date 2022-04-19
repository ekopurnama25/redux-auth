import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

const HomePages = () => {
  const token = getCookie();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h2>Ini Home </h2>
    </div>
  );
};

export default HomePages;
