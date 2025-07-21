import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const route = Router();
const userController = new UserController();

route.get("/users", userController.getUsers);

export default route;
