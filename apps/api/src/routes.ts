import { Router } from "express";

import { launchError } from "./shared/middlewares/globalError-middleware.js";
import user from "./modules/users/user-routes.js";

const routes = Router();

routes.use("/users", user);

routes.use(launchError);

export default routes;
