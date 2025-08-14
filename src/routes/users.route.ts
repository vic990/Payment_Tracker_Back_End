import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const route = Router();
const userController = new UserController();

route.get("/users", userController.getUsers);
route.post("/users:id", userController.getUserById);
route.post("/users", userController.createUser);
route.put("/users:id", userController.updateUser);
route.delete("/users:id", userController.deleteUser);

export default route;
