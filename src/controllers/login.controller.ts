import { Request, Response } from "express";
import { Users } from "../entities/user";
import { json } from "stream/consumers";
import { jsonResponse } from "../lib/jsonResponse";
import { AppDataSource } from "../database/data-source";
import { comparePassword, getLoginUser, hashPassword } from "./user.controller";
import { createAccessToken, createRefreshtoken } from "./tokens.controllers";
import { getuserInfo } from "../auth/generateUserInfo";

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Por favor rellene los campos" }));
  }

  const user: Users = await getLoginUser(email);

  if (!user) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Usuario no encontrado" }));
  }

  const passwordMatch: boolean = await comparePassword(
    password,
    user.password_hash
  );

  if (passwordMatch) {
    const accesstoken: string = createAccessToken(user);
    const refreshToken: string = await createRefreshtoken(user);

    return res.status(200).json(
      jsonResponse(200, {
        user: getuserInfo(user),
        accesstoken,
        refreshToken,
      })
    );
  } else {
    return res
      .status(500)
      .json(jsonResponse(500, { message: `Usuario o contraseña incorrectos` }));
  }
}
