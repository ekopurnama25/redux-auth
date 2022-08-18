import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPages, HomePages, RoleAdmin, RoleUsers } from "./pages";
import CheckUsers from "./useEffect/CheckUsers";
import PrivateRoute from "./utils/PrivateRoute";
import { Role } from "./utils/Role";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowRoles={[Role.Admin]}>
              <CheckUsers>
                <RoleAdmin />
              </CheckUsers>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute allowRoles={[Role.Users]}>
              <CheckUsers>
                <RoleUsers />
              </CheckUsers>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
