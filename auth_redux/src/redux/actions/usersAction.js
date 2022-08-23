import axiosInstance from "../../utils/useAxios";
import { ACCESS_TOKEN_USER } from "../types";

export const getUsers = (data) => async (dispatch) => {
  try {
    const req = await axiosInstance.post("/checkusers/");
    console.log("3. Get Contact Berhasil :", req);
    dispatch({
      type: ACCESS_TOKEN_USER,
      payload: { token: req.data },
    });
    //return Promise.resolve(req.data);
  } catch (error) {
    console.log(error);
  }
};
