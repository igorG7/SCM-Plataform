import { Model, type ClientSession } from "mongoose";
import type { IUser } from "../domain/user-interface.js";
import type { IUserRepository } from "../domain/user-repository-interface.js";

class UserRepository implements IUserRepository {
  constructor(private readonly User: Model<IUser>) {}

  create = async (data: IUser): Promise<IUser | null> => {
    const user = await this.User.create(data);
    return user;
  };

  findById = async (id: string): Promise<IUser | null> => {
    const user = await this.User.findById(id);
    return user;
  };

  find = async (query: Partial<IUser>, limit: number, skip: number): Promise<IUser[] | null> => {
    console.log(query);
    const users = await this.User.find(query).limit(limit).skip(skip);
    return users;
  };

  findOne = async (query: Partial<IUser>): Promise<IUser | null> => {
    const user = await this.User.findOne(query);
    return user;
  };

  update = async (
    data: Partial<IUser>,
    id: string,
    session?: ClientSession,
  ): Promise<IUser | null> => {
    const user = await this.User.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, session: session ?? null },
    );

    return user;
  };

  updatePass = async (newPassword: string, id: string): Promise<IUser | null> => {
    const user = await this.User.findByIdAndUpdate(id, {
      password: newPassword,
    });

    return user;
  };

  findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await this.User.findOne({ email });
    return user;
  };

  updatePhoto = async (file: {}, id: string): Promise<IUser | null> => {
    return null;
  };
}

export default UserRepository;
