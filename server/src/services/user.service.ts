import { injectable, inject } from "inversify";
import { SignUpModel } from "../domain/interfaces";
import { UserModel } from "../data_access/interfaces";
import TYPES from "../types";
import { UserRepository } from "../data_access/repositories/user.repository";
import logger from "../util/logger";

export interface UserService {
  createUser(model: SignUpModel): Promise<UserModel>
}

@injectable()
export class UserServiceImpl implements UserService {
  private userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(model: SignUpModel): Promise<UserModel> { 
    try {
      return await this.userRepository.create(model);
    } catch(error) {
      logger.error(`[UserService]: Unabled to create user: ${error}`)
      return error;
    }
  }
}