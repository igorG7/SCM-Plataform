import User from "./infrastructure/user.js";
import UserRepository from "./infrastructure/user-repository.js";
import UserService from "./user-service.js";
import UserController from "./user-controller.js";

export function UserFactory(): UserController {
  const userRepository = new UserRepository(User);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return userController;
}
