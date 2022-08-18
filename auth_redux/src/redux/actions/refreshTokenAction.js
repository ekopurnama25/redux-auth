import { LOGIN_SUCCESS } from "../types";
import { setCookie } from "../../utils/setCookie";
import { axiosPrivate } from "../../utils/FetchApi";

export const loginAuthAction = (data) => async (dispatch) => {
  try {
    const req = await axiosPrivate.post("/auth", data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { users: req.data },
    });
    setCookie(req.data);
    return req;
  } catch (error) {
    console.log(error);
  }
};
