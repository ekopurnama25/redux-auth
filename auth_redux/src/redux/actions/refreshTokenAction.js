import { REFRESH_TOKEN_SUCCESS } from "../types";
import { setCookie } from "../../utils/setCookie";

export const refreshTokenAction = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_SUCCESS,
    payload: accessToken,
  });
  setCookie(accessToken);
};
