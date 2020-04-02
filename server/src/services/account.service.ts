import { injectable, inject } from "inversify";
import { LoginModel } from "../domain/interfaces";
import { UserRepository } from "../data_access/repositories/user.repository";
import TYPES from "../types";
import logger from "../util/logger";
import { LoggedInUserModel } from "../data_access/interfaces";
import BycryptHelper from "../util/bcrypt-helper";
import JwtHelper from "../util/jwt-helper";

export interface AccountService {
  authenticateUser(_id: string): Promise<LoggedInUserModel | null>;
  login(model: LoginModel): Promise<string>
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

  async login(model: LoginModel): Promise<string> {
    try {
      const user = await this.userRepository.findByEmail(model.email);
      if (!user) {
        throw new Error('User not found');
      }

      // check if passwords match
      const doPasswordsMatch = await BycryptHelper.comparePassword(model.password, user.password);
      if (!doPasswordsMatch) {
        throw new Error('Invalid credentials');
      }

      // sign JWT token
      return await JwtHelper.sign(user);

    } catch(error) {
      logger.error(`[AccountService]: Unabled to log user in: ${error}`)
      throw error;
    }
  }
}