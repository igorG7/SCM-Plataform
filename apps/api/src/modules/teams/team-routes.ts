import { Router } from "express";
import { TeamFactory } from "./factory.js";

import { updateCoach, createTeam } from "./middlewares/index.js";

const controller = TeamFactory();
const routes = Router();

// * Rotas com segmentos estáticos
routes.get("/available", controller.findAvailable);
routes.get("/slug/:slug", controller.findBySlug);
routes.patch("/claim/:teamId", updateCoach, controller.claim);
routes.patch("/release/:teamId", updateCoach, controller.release);

// * Rotas dinâmicas
routes.post("/", createTeam, controller.create);
routes.get("/", controller.findAll);
routes.get("/:id", controller.findById);
routes.patch("/:id", controller.update);
routes.delete("/:id", controller.delete);

export default routes;
