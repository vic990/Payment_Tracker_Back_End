import jwt from "jsonwebtoken";
import { Users } from "../entities/user";
import { userInfo } from "../lib/types";

function sign(payload: Object, isAccessToken: boolean) {
  return jwt.sign(
    payload,
    isAccessToken
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    { algorithm: "HS256", expiresIn: 3600 }
  );
}

export function generateAccessToken(user: userInfo) {
  return sign({ user }, true);
}

export function generatefreshToken(user: userInfo) {
  return sign({ user }, false);
}
