import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { jsonResponse } from "../lib/jsonResponse";
import { generateAccessToken, generateRefreshToken } from "../lib/authenticate";
import { userInfo } from "../lib/type";

export class LoginController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json(
        jsonResponse(400, {
          success: false,
          message: "Campos son requeridos",
        })
      );
    }
    const { success, message, user } = await this.authService.login(
      email,
      password
    );

    if (success && user) {
      const accessToken = generateAccessToken(user);
      const refresToken = generateRefreshToken(user); //hay que implementar el signup para guardar el token y despues poder hacer los updates
      res.status(200).json(
        jsonResponse(200, {
          user: user,
          accessToken: accessToken,
          refreshToken: await refresToken,
        })
      );
    } else {
      res
        .status(400)
        .json(jsonResponse(400, { success: success, message: message }));
    }
  };
}
