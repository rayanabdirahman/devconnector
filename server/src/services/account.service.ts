import { injectable, inject } from "inversify";
import { LoginModel } from "../domain/interfaces";
import { UserRepository } from "../data_access/repositories/user.repository";
import TYPES from "../types";
import logger from "../util/logger";
import { LoggedInUserModel } from "../data_access/interfaces";

export interface AccountService {
  // login(model: LoginModel): Promise<LoggedInUser>
  authenticateUser(_id: string): Promise<LoggedInUserModel | null>
}

@injectable()
export class AccountServiceImpl implements AccountService {
  private userRepository: UserRepository;

  constructor(
    @inject(TYPES.UserRepository) userRepository: UserRepository
  ) {
    this.userRepository = userRepository
  }

  async authenticateUser(_id: string): Promise<LoggedInUserModel | null> {
    try {
      const user = await this.userRepository.findById(_id);
      if (!user) {
        throw new Error('User not found');
      }

      return user

    } catch(error) {
      logger.error(`[AccountService]: Unabled to authenticate user: ${error}`)
      throw error;
    }
  }

  // login(model: LoginModel): Promise<LoggedInUser> {
    
  // }
}