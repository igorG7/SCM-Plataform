import { Router } from "express";

import { launchError } from "./shared/middlewares/globalError-middleware.js";

import users from "./modules/users/user-routes.js";
import teams from "./modules/teams/team-routes.js";

const routes = Router();

routes.use("/users", users);
routes.use("/teams", teams);

routes.use(launchError);

export default routes;
