import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.js";
import { USER_ROLES } from "../domain/user-interface.js";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const validators = {
    nickname: { type: "string", required: true },
    email: { type: "string", required: true },
    password_hash: { type: "string", required: true },
    team_id: { type: "string" },
    description: { type: "string" },
    role: { type: "string", enum: USER_ROLES },
  };

  Key.validate(validators, body);
  next();
};
