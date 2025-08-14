import { UserRepository } from "../repositories/user.repository";
import { Users } from "../entities/user";
import { compare, genSalt, hash } from "bcrypt-ts";
import { getUserInfo } from "../lib/getUserInfo";
import { userInfo } from "../lib/type";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<Users | null> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.userRepository.findByEmail(email);
  }

  async createUser(
    userData: Users
  ): Promise<{ success: boolean; message: string; user?: Users }> {
    const emailExists = await this.userRepository.emailExist(userData.email);
    if (emailExists) {
      return {
        success: false,
        message: "Este email ya está registrado",
      };
    }

    const hashedPassword = await this.hashPassword(userData.password_hash);

    const newUser = await this.userRepository.create({
      ...userData,
      password_hash: hashedPassword,
    });

    return {
      success: true,
      message: "Usuario creado exitosamente",
      user: newUser,
    };
  }

  async updateUser(
    id: number,
    userData: Partial<Users>
  ): Promise<{ success: boolean; message: string; user?: Users }> {
    const updatedUser = await this.userRepository.update(id, userData);

    if (!updatedUser) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    return {
      success: true,
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    };
  }

  async deleteUser(id: number): Promise<{ success: boolean; message: string }> {
    const deleted = await this.userRepository.delete(id);

    return {
      success: deleted,
      message: deleted
        ? "Usuario elimiando exitosamente"
        : "Usuario no encontrado",
    };
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: userInfo }> {
    let userInfoData: userInfo;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "Usuario o constraseña incorrectas",
      };
    }

    const isValidPassword = await this.comparePassword(
      password,
      user.password_hash
    );

    if (!isValidPassword) {
      return {
        success: false,
        message: "Usuario o constraseña incorrectas",
      };
    }

    return {
      success: true,
      message: "Autenticado correctamente",
      user: (userInfoData = {
        user_id: user.user_id,
        user_name: user.user_name,
        user_lastname: user.user_lastname,
      }),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
