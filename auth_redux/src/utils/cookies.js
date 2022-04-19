import cookies from "js-cookie";

export const getCookie = () => {
  const cookie = cookies.get("token");
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};
