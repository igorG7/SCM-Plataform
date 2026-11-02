import type { Request, Response, NextFunction, response } from "express";
import { Key } from "../../shared/utils/validations/key.js";

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const validators = {
    email: { type: "string" },
    team_id: { type: "string" },
    description: { type: "string" },
  };

  Key.validate(validators, body);
  next();
};
