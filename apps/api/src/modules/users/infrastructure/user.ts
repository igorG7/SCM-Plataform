import { Schema, model } from "mongoose";
import { USER_ROLES, USER_STATUS, type IUser } from "../domain/user-interface.js";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    nickname: { type: String, required: true, trim: true, unique: true, lowercase: true },
    role: { type: String, default: "PLAYER", enum: USER_ROLES },
    password_hash: { type: String, required: true, select: false },
    team_id: { type: String, default: null },
    last_login: { type: Date, default: new Date() },
    description: { type: String, trim: true, default: null },
    status: { type: String, enum: USER_STATUS, default: "INVITED" },
    photo: { type: String, default: null },
  },
  { timestamps: true },
);

const User = model("User", UserSchema);
export default User;
