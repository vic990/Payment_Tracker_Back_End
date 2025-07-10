import { Router, Request, Response } from "express";
import {
  getRoles,
  getRolesById,
  insertRoles,
  deleteRole,
  updateRole,
} from "../controllers/roles.controller";
import {
  getUsers,
  insertUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import {
  getPayments,
  getPaymentsById,
  insertPayments,
  updatePayment,
  deletePayment,
} from "../controllers/payments.controller";
import { login } from "../controllers/login.controller";

const router = Router();

//[login]
router.post("/login", login);

//[Roles]
router.get("/roles", getRoles);
router.get("/roles/:id", getRolesById);
router.post("/createRole", insertRoles);
router.delete("/deleteRole/:id", deleteRole);
router.put("/updateRole/:id", updateRole);

//[Users]
router.get("/users", getUsers);
router.get("/getuser/:id", getUserById);
router.post("/insertUsers", insertUsers);
router.put("/updateUsers/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

//[Payment]
router.get("/getpayments", getPayments);
router.get("/getpayments/:id", getPaymentsById);
router.post("/insertPayments", insertPayments);
router.put("/updatePayments/:id", updatePayment);
router.delete("/deletePayment/:id", deletePayment);

export default router;
