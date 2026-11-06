import type { ClientSession } from "mongoose";
import type { ITeam } from "./team-interface.js";

export type TypeCreateTeamData = Pick<ITeam, "name" | "slug" | "emblem">;

// slug fica fixo depois de criado
export type TypeUpdateTeamData = Partial<Pick<ITeam, "name" | "emblem">>;

export interface ITeamRepository {
  create(data: TypeCreateTeamData): Promise<ITeam>;

  findById(id: string): Promise<ITeam | null>;
  findBySlug(slug: string): Promise<ITeam | null>;
  findAll(limit: number, skip: number): Promise<ITeam[]>;
  findAvailable(query: any): Promise<ITeam[]>;

  update(id: string, data: TypeUpdateTeamData): Promise<ITeam | null>;

  /** Reivindica o time de forma atômica (available: true → false).
   *  Retorna null se o time não existe ou já foi pego. */
  claim(id: string, session?: ClientSession): Promise<ITeam | null>;

  /** Devolve o time (available: false → true), por exemplo ao desvincular
   *  o manager ou reverter um claim que falhou no meio do fluxo. */
  release(id: string, session: ClientSession): Promise<ITeam | null>;

  delete(id: string): Promise<boolean>;
}
