import { userInfo } from "../lib/type";
import { UserService } from "./userService";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: userInfo }> {
    if (!email || !password) {
      return {
        success: false,
        message: "Campos son requeridos",
      };
    }

    const { success, message, user } = await this.userService.authenticateUser(
      email,
      password
    );

    if (!success) {
      return {
        success: success,
        message: message,
      };
    } else {
      return {
        success: success,
        message: message,
        user: user,
      };
    }
  }
}
