import { REFRESH_TOKEN_SUCCESS } from "../types";
import { UpdatesetCookie } from "../../utils/setCookie";

export const refreshTokenAction = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_SUCCESS,
    payload: { users: accessToken },
  });
  UpdatesetCookie(accessToken);
};
