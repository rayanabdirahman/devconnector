import { injectable, inject } from "inversify";
import gravatar from 'gravatar';
import { SignUpModel } from "../domain/interfaces";
import { GravatarEnum } from "../domain/enums";
import { UserModel } from "../data_access/interfaces";
import TYPES from "../types";
import { UserRepository } from "../data_access/repositories/user.repository";
import logger from "../util/logger";
import BycryptHelper from "../util/bcrypt-helper";
import JwtHelper from "../util/jwt-helper";

export interface UserService {
  createUser(model: SignUpModel): Promise<string>
}

@injectable()
export class UserServiceImpl implements UserService {
  private userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  private gravatarProfile(email: string): string {
    return gravatar.url(email, {
      s: GravatarEnum.SIZE,
      r: GravatarEnum.RATING,
      d: GravatarEnum.DEFAULT
    });
  }

  async createUser(model: SignUpModel): Promise<string> { 
    try {
      // check if user email is taken
      if (await this.isEmailTaken(model.email)) {
        throw new Error('A user with this email address already exists');
      }

      // add user avatar from gravatar
      const avatar = this.gravatarProfile(model.email);

      // encrypt user password
      const password = await BycryptHelper.encryptPassword(model.password);

      const user = await this.userRepository.create({ ...model, avatar, password });

      // sign JWT token
      return await JwtHelper.sign(user);

    } catch(error) {
      logger.error(`[UserService]: Unabled to create user: ${error}`)
      throw error;
    }
  }
}