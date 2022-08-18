import React from "react";
import { Link } from "react-router-dom";

const RoleAdmin = () => {
  return (
    <div>
      <h1>INI ADMIN</h1>

      <Link to={"/admin"}>INI admin</Link>
    </div>
  );
};

export default RoleAdmin;
