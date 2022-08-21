import Cookies from "js-cookie";

export const setCookie = (data) => {
  let setencodedCookiesToken = JSON.stringify(data);
  Cookies.set("authToken", setencodedCookiesToken);
};

export const getCookie = () => {
  let users = Cookies.get("authToken");
  if (typeof users !== "undefined") {
    return JSON.parse(Cookies.get("authToken"));
  }
  return null;
};
