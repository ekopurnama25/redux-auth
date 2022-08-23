import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/usersAction";

const CheckUsers = ({ children }) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.authReducers);
  useEffect(() => {
    const ChecksersToken = () => {
      try {
        dispatch(getUsers());
      } catch (error) {
        console.log(error);
      }
    };

    ChecksersToken();
  }, [users, dispatch]);

  return children;
};

export default CheckUsers;
