import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//import { getCookie } from "./setCookie";

const PrivateRoute = ({ children, allowRoles }) => {
  const { isLoggedIn, users } = useSelector((state) => state.authReducers);
  const userHasRequired =
    users && allowRoles.includes(users?.users?.roles[0]?.roles) ? true : false;

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (isLoggedIn && !userHasRequired) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
