import { Router } from "express";
import { UserFactory } from "./factory.js";
import { createUser, updateUser, updatePassword } from "./middlewares/index.js";

const controller = UserFactory();

const routes = Router();

routes.post("/", createUser, controller.create);
routes.get("/", controller.find);
routes.get("/:id", controller.findById);
routes.patch("/:id", updateUser, controller.update);

routes.get("/email", controller.findById);
routes.patch("/password/:id", updatePassword, controller.updatePass);

export default routes;
