import { AppDataSource } from "../database/data-source";
import { Users } from "../entities/user";
import { Request, response, Response } from "express";
import { compare, genSalt, hash } from "bcrypt-ts";
import { generateAccessToken } from "../auth/generateToken";
import { getuserInfo } from "../auth/generateUserInfo";

export async function getUsers(request: Request, response: Response) {
  const usersRepository = await AppDataSource.getRepository(Users);
  const users = await usersRepository.find();
  response.send(users.length === 0 ? { message: "No hay usuarios" } : users);
}

export async function getLoginUser(emailReq) {
  const usersRepository = await AppDataSource.getRepository(Users).findOne({
    where: { email: emailReq },
  });

  return usersRepository;
}

export async function getUserById(request: Request, response: Response) {
  const usersRepository = await AppDataSource.getRepository(Users).findOne({
    where: { user_id: parseInt(request.params.id) },
  });
  const userExist = usersRepository
    ? usersRepository
    : { message: "Usuario no encontrado" };

  response.send(userExist);
}

async function emailUserExist(email: string) {
  const usersRepository = AppDataSource.getRepository(Users);
  const allUsers = await usersRepository.findOneBy({ email });
  return !!allUsers;
}

export async function insertUsers(request: Request, response: Response) {
  let savedUser;
  const { email, password } = request.body;
  const passwordhashed = await hashPassword(password);
  request.body.password = passwordhashed;
  const emailFound = await emailUserExist(email);
  if (email) {
    const newUser = await AppDataSource.getRepository(Users).create(
      request.body
    );
    savedUser = await AppDataSource.getRepository(Users).save(newUser);
  }
  response.send(
    savedUser
      ? { message: "User saved" }
      : { message: "This email already exist" }
  );
}

export async function updateUser(request: Request, response: Response) {
  const userRepository = await AppDataSource.getRepository(Users).findOne({
    where: { user_id: parseInt(request.params.id) },
  });

  AppDataSource.getRepository(Users).merge(userRepository, request.body);
  const updatedUser = await AppDataSource.getRepository(Users).save(
    userRepository
  );

  response.send(
    updatedUser
      ? { message: "Usuario actualizado" }
      : { message: "Hubo un problema actualizando el usuario" }
  );
}

export async function deleteUser(request: Request, response: Response) {
  const deletedUser = await AppDataSource.getRepository(Users).delete(
    parseInt(request.params.id)
  );

  response.send(
    deletedUser.affected != 0
      ? { message: "Usuario borrado" }
      : { message: "No se encontró el usuario" }
  );
}

export async function hashPassword(pass) {
  const salt = await genSalt(10);
  const password = pass;
  const result = await hash(password, salt);
  return result;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword); // aqui le quite el await ya que es implicito
}
