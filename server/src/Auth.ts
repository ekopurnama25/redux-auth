import { Users } from "./entities/UserEntities";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: Users) => {
  return sign({ userId: user.id_users }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30s"
  });
};

export const createRefreshToken = (user: Users) => {
  return sign(
    { userId: user.id_users }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "1h"
    }
  );
};