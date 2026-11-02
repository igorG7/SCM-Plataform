import { BadRequest, Conflict, NotFound } from "../../shared/utils/appErrors.js";
import { Password } from "../shared/utils/password/password.js";
import cloudinaryService from "../cloudinary/cloudinary-service.js";
import type { IUser } from "./domain/user-interface.js";
import type { IUserRepository } from "./domain/user-repository-interface.js";

class UserService {
  constructor(private readonly repository: IUserRepository) {}

  create = async (data: IUser) => {
    const emailExist = await this.repository.findByEmail(data.email);
    const nicknameExist = await this.repository.findOne(data);

    if (emailExist)
      throw new Conflict("Este email já está cadastrado. Faça login ou recupere sua senha.");

    if (nicknameExist?.nickname) throw new Conflict("Este nickname já está em uso. Tente outro.");

    if (!Password.isStrong(data.password_hash))
      throw new BadRequest("A senha fornecida não atende os requisitos minimos de segurança.");

    data.password_hash = await Password.hash(data.password_hash);

    await this.repository.create(data);
    return;
  };

  update = async (data: Partial<IUser>, id: string) => {
    if (!(await this.repository.findById(id))) throw new NotFound("Usuário não encontrado.");

    const user = await this.repository.update(data, id);

    return user;
  };

  find = async (query: Partial<IUser>, limit = 20, page = 1) => {
    const skip = (page - 1) * limit;
    const users = await this.repository.find(query, limit, skip);

    return users;
  };

  findByEmail = async (email: string) => {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new NotFound("Nenhum usuário com esse email foi encontrado.");

    return user;
  };

  findById = async (id: string) => {
    const user = await this.repository.findById(id);

    if (!user) throw new NotFound("Usuário não encontrado.");

    return user;
  };

  updatePass = async (newPassword: string, id: string) => {
    const user = await this.repository.findById(id);

    if (!user) throw new NotFound("Usuário não encontrado.");

    if (!Password.isStrong(newPassword))
      throw new BadRequest("A senha fornecida não atende os requisitos minimos de segurança.");

    const newHash = await Password.hash(newPassword);

    await this.repository.updatePass(newHash, id);
    return;
  };
}

export default UserService;
