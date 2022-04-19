import axios from "axios";
import { LOGIN_SUCCESS } from "../types";
import Cookies from "js-cookie";

export const loginAuthAction = (data) => {
  return async (dispatch) => {
    //dispatch loading
    console.log("2. Loading");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      //get API
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/auth/",
        timeout: 120000,
        data: data,
      });
      console.log("3. Get Contact Berhasil :", res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          loading: true,
          data: res.data,
          errorMessage: false,
        },
      });
      if (res) {
        const token = JSON.stringify(res.data.accessToken);
        Cookies.set("token", token, { expires: 365 });
      }
      // const token = JSON.stringify(res.data.accessToken);
      // Cookies.set("token", token, { expires: 365 });
    } catch (error) {
      console.log("3. Gagal :", error.message);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          loading: true,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};
