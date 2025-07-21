import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { jsonResponse } from "../lib/jsonResponse";
import { json } from "stream/consumers";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json(
        jsonResponse(200, {
          message:
            users.length === 0
              ? "No hay usuarios"
              : "Usuarios obtenidos exitosamente",
          data: users,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error interno del servidor",
          error: error,
        })
      );
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);

      if (isNaN(userId)) {
        res.status(404).json(
          jsonResponse(404, {
            message: "ID de usuario inválido",
          })
        );
      }

      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json(
          jsonResponse(404, {
            message: "usuario no entontrado",
          })
        );
      }

      res.status(200).json(
        jsonResponse(200, {
          message: "Usuario encontrado",
          data: user,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error interno del servidor",
          error: error,
        })
      );
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_name, user_lastname, email, password_hash, role_id } =
        req.body;

      if (
        !user_name ||
        !user_lastname ||
        !email ||
        !password_hash ||
        !role_id
      ) {
        res.status(400).json(
          jsonResponse(400, {
            message: "Todos los campos son requeridos",
          })
        );
      }

      const result = await this.userService.createUser({
        user_name,
        user_lastname,
        email,
        password_hash,
        role_id,
      });

      const statusCode = result ? 201 : 400;

      res.status(statusCode).json(
        jsonResponse(statusCode, {
          message: result.message,
          data: result.user,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error interno del servidor",
          error: error,
        })
      );
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);

      if (isNaN(userId)) {
        res.status(400).json(
          jsonResponse(400, {
            message: "Usuario ivalido",
          })
        );
      }

      const result = await this.userService.updateUser(userId, req.body);

      const statusCode = result ? 200 : 404;

      res.status(statusCode).json(
        jsonResponse(statusCode, {
          message: result.message,
          data: result.user,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error interno del servidor",
          error: error,
        })
      );
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);

      if (isNaN(userId)) {
        res.status(400).json(
          jsonResponse(400, {
            message: "ID de usuario inválido",
          })
        );
      }

      const result = await this.userService.deleteUser(userId);

      const statusCode = result ? 200 : 400;

      res.status(statusCode).json(
        jsonResponse(statusCode, {
          message: result.message,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error interno del servidor",
          error: error,
        })
      );
    }
  };
}
