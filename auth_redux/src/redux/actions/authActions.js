import { LOGIN_SUCCESS } from "../types";
import { setCookie } from "../../utils/setCookie";
import axiosInstance from "../../utils/useAxios";

export const loginAuthAction = (data) => async (dispatch) => {
  try {
    const req = await axiosInstance.post("/auth", data);
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
