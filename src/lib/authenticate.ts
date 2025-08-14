import jwt from "jsonwebtoken";
import { userInfo } from "./type";
import dotenv from "dotenv";
dotenv.config();

function sign(payload: Object, isAccessToken: boolean) {
  const secret = isAccessToken
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;

  if (!secret) {
    throw new Error("jWT secret is not defined");
  }
  return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: 3600 });
}

export function generateAccessToken(user: userInfo) {
  return sign({ user }, true);
}

export function generateRefreshToken(user: userInfo) {
  return sign({ user }, false);
}
