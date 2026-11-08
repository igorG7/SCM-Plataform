import mongoose from "mongoose";
import { NotFound } from "../../shared/utils/appErrors.js";
import type {
  ITeamRepository,
  TypeCreateTeamData,
  TypeUpdateTeamData,
} from "./domain/team-repository-interface.js";
import type { IUserRepository } from "../users/domain/user-repository-interface.js";

class TeamService {
  constructor(
    private readonly repository: ITeamRepository,
    private readonly userService: IUserRepository,
  ) {}

  private processSlug = (slug: string) => {
    const processed = slug.toLocaleLowerCase().trim().replace(/\s/g, "-");
    return processed;
  };

  create = async (data: any) => {
    data.slug = this.processSlug(data.name);

    const team = await this.repository.create(data);

    return team;
  };

  findBySlug = async (slug: string) => {
    const team = await this.repository.findBySlug(this.processSlug(slug));

    if (!team) throw new NotFound("Time não encontrado.");

    return team;
  };

  findAll = async (limit: number, page: number) => {
    const skip = (page - 1) * limit;

    const teams = await this.repository.findAll(limit, skip);

    return teams;
  };

  findAvailable = async (query: any, limit: number, page: number) => {
    const skip = (page - 1) * limit;
    query = !query ? { available: true, query } : { available: true };

    const teams = await this.repository.findAvailable(query, limit, skip);
    return teams;
  };

  findById = async (id: string) => {
    const team = await this.repository.findById(id);

    if (!team) throw new NotFound("Time não encontrado.");

    return team;
  };

  delete = async (id: string) => {
    const team = await this.repository.delete(id);

    if (!team) throw new NotFound("Time não encontrado.");

    return team;
  };

  update = async (id: string, data: TypeUpdateTeamData) => {
    const team = await this.repository.update(id, data);

    if (!team) throw new NotFound("Time não encontrado.");

    return team;
  };

  claim = async (teamId: string, userId: string) => {
    return mongoose.connection.transaction(async (session) => {
      const team = await this.repository.claim(teamId, session);

      if (!team) throw new NotFound("Time não encontrado.");

      await this.userService.update({ team_id: teamId }, userId, session);

      return team;
    });
  };

  release = async (teamId: string, userId: string) => {
    return mongoose.connection.transaction(async (session) => {
      const team = await this.repository.release(teamId, session);

      if (!team) throw new NotFound("Time não encontrado.");

      await this.userService.update({ team_id: null }, userId, session);

      return team;
    });
  };
}

export default TeamService;
