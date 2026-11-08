import type { Request, Response, NextFunction } from "express";
import { Key } from "../../shared/utils/validations/key.js";

export const updateCoach = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const validators = {
    userId: { type: "string", required: true },
  };

  Key.validate(validators, body);
  next();
};
