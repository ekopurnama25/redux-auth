import Cookies from "js-cookie";

export const setCookie = (data) => {
  let setencodedCookiesToken = JSON.stringify(data);
  Cookies.set("authToken", setencodedCookiesToken);
};

export const getCookie = () => {
  if (typeof myVar !== "undefined") {
    return JSON.parse(Cookies.get("authToken"));
  }
  return null;
};
