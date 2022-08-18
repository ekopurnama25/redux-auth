import { combineReducers } from "redux";
import authReducers from "./auth";
import usersReducer from "./users";

export default combineReducers({
  authReducers,
  usersReducer
});
