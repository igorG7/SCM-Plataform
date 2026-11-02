import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.js";

export const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const validators = {
    password_hash: { type: "string", required: true },
  };

  Key.validate(validators, body);
  next();
};
