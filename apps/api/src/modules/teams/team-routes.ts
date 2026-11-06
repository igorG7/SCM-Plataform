import { Router } from "express";
import { TeamFactory } from "./factory.js";

const controller = TeamFactory();
const routes = Router();

// * Rotas dinâmicas
routes.post("/", controller.create);
routes.get("/", controller.findAll);
routes.get("/:slug", controller.findBySlug);
routes.get("/:id", controller.findById);
routes.patch("/:id", controller.update);
routes.delete("/:id", controller.delete);

// * Rotas com segmentos estáticos
routes.get("/available", controller.findAvailable);
routes.patch("/:teamId/claim ", controller.claim);
routes.patch("/:teamId/release ", controller.release);

export default routes;
