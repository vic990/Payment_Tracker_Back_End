import { Router, Request, Response } from "express";
import {
  getRoles,
  getRolesById,
  insertRoles,
  deleteRole,
  updateRole,
} from "../controllers/roles.controller";
import { Roles } from "../entities/roles";
import { AppDataSource, getconnection } from "../database/data-source";

const router = Router();

router.get("/roles", getRoles);
router.get("/roles/:id", getRolesById);
router.post("/createRole", insertRoles);
router.delete("/deleteRole/:id", deleteRole);
router.put("/updateRole/:id", updateRole);

export default router;
