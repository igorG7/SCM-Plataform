import UserRepository from "../users/infrastructure/user-repository.js";
import User from "../users/infrastructure/user.js";

import TeamRepository from "./infrastructure/team-repository.js";
import Team from "./infrastructure/team.js";
import TeamController from "./team-controller.js";
import TeamService from "./team-service.js";

export const TeamFactory = (): TeamController => {
  const userRepository = new UserRepository(User);

  const teamRepository = new TeamRepository(Team);
  const teamService = new TeamService(teamRepository, userRepository);
  const teamController = new TeamController(teamService);

  return teamController;
};
