import axiosInstance from "./useAxios";
import { getCookie } from "./setCookie";
import { refreshTokenAction } from "../redux/actions/refreshTokenAction";

const setupInterceptors = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const users = getCookie();
      if (users) {
        config.headers["Authorization"] = "Bearer " + users?.accessToken; // for Spring Boot back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const users = getCookie();
      const originalConfig = err.config;

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const req = await axiosInstance.post("/refresh_token/", {
            refreshToken: users?.refreshTOken,
          });

          const accessToken = req.data;
          console.log(accessToken);
          dispatch(refreshTokenAction(accessToken));

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setupInterceptors;
