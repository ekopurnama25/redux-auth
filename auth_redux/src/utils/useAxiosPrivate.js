import { axiosPrivate } from "./useAxios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.authReducers);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${users?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = "hallo";
          prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [users]);
  return axiosPrivate;
};

export default useAxiosPrivate;
z;
