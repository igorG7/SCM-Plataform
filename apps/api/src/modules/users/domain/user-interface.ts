import type { ObjectId } from "mongoose";

export const USER_ROLES = ["PLAYER", "ADMIN"] as const;
export type TypeUserRoles = (typeof USER_ROLES)[number];

export const USER_STATUS = ["INVITED", "ACTIVE", "DISABLED"] as const;
export type TypeUserStatus = (typeof USER_STATUS)[number];

export interface IUser {
  nickname: string;
  email: string;
  password_hash: string;
  team_id?: string | ObjectId | null;
  role: TypeUserRoles;
  status: TypeUserStatus;
  description?: string;
  last_login: Date;
  photo?: string;
}
