import { json } from "stream/consumers";
import { jsonResponse } from "../lib/jsonResponse";
import { getTokenFromHeader } from "./getTokenFromHeader";
import { verifyAccessToken } from "./verifyToken";
import { Request, Response, NextFunction } from "express";

export function authenticate(req, res, next) {
  const token = getTokenFromHeader(req.headers);

  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = { ...decoded.user };
      next();
    } else {
      return res
        .status(401)
        .json(jsonResponse(401, { message: "No token provided" }));
    }
  } else {
    res
      .status(401)
      .json(jsonResponse(401, { message: " No token provided in auth" }));
  }
}
