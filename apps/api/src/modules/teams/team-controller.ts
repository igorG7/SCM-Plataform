import type { Request, Response } from "express";
import { ResolveError } from "../../shared/utils/resolveError.js";
import type TeamService from "./team-service.js";

class TeamController {
  constructor(private readonly service: TeamService) {}

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const team = await this.service.create(data);

      return res.status(201).json({ message: "Time criado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  findBySlug = async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;

      const team = await this.service.findBySlug(slug);

      return res.status(200).json({ message: "Time encontrado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);

      const teams = await this.service.findAll(limit, page);

      return res.status(200).json({ message: "Times encontrados com sucesso!", data: teams });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  findAvailable = async (req: Request, res: Response) => {
    try {
      const { limit, page, ...query } = req.query;

      const teams = await this.service.findAvailable(query, Number(limit), Number(page));

      return res.status(200).json({ message: "Times encontrados com sucesso!", data: teams });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const team = await this.service.findById(id);

      return res.status(200).json({ message: "Time encontrado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const team = await this.service.delete(id);

      return res.status(204).json({ message: "Time deletado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const id = req.params.id as string;

      const team = await this.service.update(id, data);

      return res.status(200).json({ message: "Time atualizado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  claim = async (req: Request, res: Response) => {
    try {
      const teamId = req.params.teamId as string;
      const { userId } = req.body;

      const team = await this.service.claim(teamId, userId);

      return res.status(200).json({ message: "Time vinculado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  release = async (req: Request, res: Response) => {
    try {
      const teamId = req.params.teamId as string;
      const { userId } = req.body;

      const team = await this.service.release(teamId, userId);

      return res.status(200).json({ message: "Time desvinculado com sucesso!", data: team });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };
}

export default TeamController;
