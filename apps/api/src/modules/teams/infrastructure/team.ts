import { model, Schema } from "mongoose";
import type { ITeam } from "../domain/team-interface.js";

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    available: { type: Boolean, default: true },
    emblem: { type: String, default: null },
    slug: { type: String, lowercase: true, trim: true, unique: true },
  },
  { timestamps: true },
);

const Team = model("Team", TeamSchema);
export default Team;
