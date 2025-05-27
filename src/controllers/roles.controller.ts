import { getManager, QueryFailedError } from "typeorm";
import { Roles } from "../entities/roles";
import { Request, Response } from "express";
import { AppDataSource, getconnection } from "../database/data-source";
import { json } from "stream/consumers";

export async function getRoles(request: Request, response: Response) {
  const rolesRepository = AppDataSource.getRepository(Roles);

  const roles = await rolesRepository.find();

  response.send(roles);
}

export async function getRolesById(request: Request, response: Response) {
  const rolesRepository = await AppDataSource.getRepository(Roles).findOne({
    where: { id: parseInt(request.params.id) },
  });
  const exist = rolesRepository ? rolesRepository : "not found";
  response.send(exist);
}

async function validateIfNameExist(roleName: string) {
  let nameFlag = false;
  const rolesRepository = AppDataSource.getRepository(Roles);
  const allRoles = await rolesRepository.find();

  allRoles.forEach((names) => {
    if (names.roleName === roleName) {
      nameFlag = true;
    }
  });
  return nameFlag;
}

export async function insertRoles(request: Request, response: Response) {
  const { roleName } = request.body;
  let roleSaved;
  const nameFound = await validateIfNameExist(roleName);

  if (nameFound) {
    response.send("Usuario ya existe");
  } else {
    const newRole = await AppDataSource.getRepository(Roles).create(
      request.body
    );
    roleSaved = await AppDataSource.getRepository(Roles).save(newRole);
  }

  response.send(roleSaved);
}

export async function deleteRole(request: Request, response: Response) {
  const deletedRole = await AppDataSource.getRepository(Roles).delete(
    parseInt(request.params.id)
  );

  console.log("afected: ", typeof deletedRole.affected);
  response.send(deletedRole.affected != 0 ? deletedRole : "usuario no existe");
}

export async function updateRole(request: Request, response: Response) {
  const { roleName } = request.body;
  const nameFound = await validateIfNameExist(roleName);

  if (nameFound) {
    response.send("name already exist");
  }
  const roleRepository = await AppDataSource.getRepository(Roles).findOne({
    where: { id: parseInt(request.params.id) },
  });

  AppDataSource.getRepository(Roles).merge(roleRepository, request.body);
  const updatedRole = await AppDataSource.getRepository(Roles).save(
    roleRepository
  );

  response.send(updatedRole);
}
