import { LOGIN_SUCCESS } from "../../types";
import { getCookie } from "../../../utils/setCookie";

const users = getCookie();

const initialState = users
  ? { isLoggedIn: true, users }
  : { isLoggedIn: false, users: null };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default auth;
