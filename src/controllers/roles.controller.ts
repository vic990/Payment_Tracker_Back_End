import { Roles } from "../entities/roles";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";

export async function getRoles(request: Request, response: Response) {
  const rolesRepository = AppDataSource.getRepository(Roles);

  const roles = await rolesRepository.find();
  console.log("entramos a roles roles");

  response.send(roles.length === 0 ? { message: "no hay roles" } : roles);
}

export async function getRolesById(request: Request, response: Response) {
  const rolesRepository = await AppDataSource.getRepository(Roles).findOne({
    where: { id: parseInt(request.params.id) },
  });
  const exist = rolesRepository
    ? rolesRepository
    : { message: "Rol no encontrado" };
  response.send(exist);
}

async function validateIfRoleExist(roleName: string) {
  const rolesRepository = AppDataSource.getRepository(Roles);
  const allRoles = await rolesRepository.findOneBy({ roleName });
  return !!allRoles;
}

export async function insertRoles(request: Request, response: Response) {
  const { roleName } = request.body;
  let roleSaved;
  const nameFound = await validateIfRoleExist(roleName);
  if (nameFound) {
    const newRole = await AppDataSource.getRepository(Roles).create(
      request.body
    );
    roleSaved = await AppDataSource.getRepository(Roles).save(newRole);
  }

  response.send(
    roleSaved ? { message: "Rol guardado" } : { message: "Rol ya existe" }
  );
}

export async function updateRole(request: Request, response: Response) {
  let updatedRole;
  const { roleName } = request.body;
  const nameFound = await validateIfRoleExist(roleName);

  if (nameFound) {
    const roleRepository = await AppDataSource.getRepository(Roles).findOne({
      where: { id: parseInt(request.params.id) },
    });

    AppDataSource.getRepository(Roles).merge(roleRepository, request.body);
    updatedRole = await AppDataSource.getRepository(Roles).save(roleRepository);
  }

  response.send(
    updatedRole
      ? { message: "Nombre de rol ya existe" }
      : { message: "Rol actualizado" }
  );
}

export async function deleteRole(request: Request, response: Response) {
  const deletedRole = await AppDataSource.getRepository(Roles).delete(
    parseInt(request.params.id)
  );

  response.send(
    deletedRole.affected != 0
      ? { message: "Rol eliminado" }
      : { message: "Rol no existe" }
  );
}
