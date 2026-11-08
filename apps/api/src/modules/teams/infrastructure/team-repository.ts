import type { ClientSession, Model } from "mongoose";
import type { ITeam } from "../domain/team-interface.js";
import type {
  ITeamRepository,
  TypeCreateTeamData,
  TypeUpdateTeamData,
} from "../domain/team-repository-interface.js";

class TeamRepository implements ITeamRepository {
  constructor(private readonly Team: Model<ITeam>) {}

  create = async (data: TypeCreateTeamData): Promise<ITeam> => {
    const team = await this.Team.create(data);
    return team;
  };

  findBySlug = async (slug: string): Promise<ITeam | null> => {
    const team = await this.Team.findOne({ slug });
    return team;
  };

  findAll = async (limit = 20, skip = 0): Promise<ITeam[]> => {
    const teams = await this.Team.find().limit(limit).skip(skip);
    return teams;
  };

  delete = async (id: string): Promise<boolean> => {
    const team = await this.Team.findByIdAndDelete(id);
    return Boolean(team);
  };

  update = async (id: string, data: TypeUpdateTeamData): Promise<ITeam | null> => {
    const team = await this.Team.findByIdAndUpdate(id, data, { new: true });
    return team;
  };

  findAvailable = async (query: any, limit = 20, skip = 0): Promise<ITeam[]> => {
    const teams = await this.Team.find(query).limit(limit).skip(skip);
    return teams;
  };

  findById = async (id: string): Promise<ITeam | null> => {
    const team = await this.Team.findById(id);
    return team;
  };

  claim = async (id: string, session?: ClientSession): Promise<ITeam | null> => {
    const team = await this.Team.findOneAndUpdate(
      { _id: id, available: true },
      { available: false },
      { new: true, session: session ?? null },
    );

    return team;
  };

  release = async (id: string, session?: ClientSession): Promise<ITeam | null> => {
    const team = await this.Team.findOneAndUpdate(
      { _id: id, available: false },
      { available: true },
      { new: true, session: session ?? null },
    );
    return team;
  };
}

export default TeamRepository;
