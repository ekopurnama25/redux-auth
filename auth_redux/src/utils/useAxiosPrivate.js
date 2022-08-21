import { axiosPrivate } from "./useAxios";
import { useSelector } from "react-redux";
import { refreshTokenAction } from "../redux/actions/refreshTokenAction";

const useAxiosPrivate = (store) => {
  const { users } = useSelector((state) => state.authReducers);
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (users) {
        config.headers["authorization"] = `Bearer ${users?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const { dispatch } = store;
  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (originalConfig.url !== "/auth" && err.response) {
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            const rs = await axiosPrivate.post("/refresh_token/", {
              refreshToken: users.refreshTOken,
            });
            const { accessToken } = rs.data;
            dispatch(refreshTokenAction(accessToken));
            return axiosPrivate(prevRequest);
          } catch {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default useAxiosPrivate;
