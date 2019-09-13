import { ErrorMessage, GravatorEnum } from '../domain/enums';
import { SignUpModel, UserModel } from '../domain/interfaces';
import User from '../data_access/models/user.model';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

export class UserService {

  /**
   * Creates or gets existing user avatar from gravator
   * @returns { string }
   */
  private setUserAvatar(email: string): string {
    const avatar = gravatar.url(email, {
      s: GravatorEnum.s,
      r: GravatorEnum.r,
      d: GravatorEnum.d
    });

    return avatar;
  }

  /**
   * Checks whether user email already exists in database
   * @returns { boolean }
   */
  private async isEmailTaken(email: string): Promise<boolean> {
    let user = await User.findOne({ email });
    if (user) {
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  }

  /**
   * Encrypts user password
   * @returns { string } 
   */
  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Registers users into DB
   * @param { SignUpModel } model
   * @returns { UserModel }
   */
  async signUp(model: SignUpModel): Promise<UserModel> {
    let userModel: UserModel;
    let user: any;

    // check if email exists
    if (await this.isEmailTaken(model.email)) {
      throw new Error(ErrorMessage.EMAIL_IS_TAKEN);
    }

    // set users avatar
    const avatar = this.setUserAvatar(model.email);

    // create new user instance
    const { name, email, password } = model;
    userModel = {
      name,
      email,
      password,
      avatar
    }

    user = new User(userModel);

    // encrypt password
    user.password = await this.encryptPassword(password);

    // save user to DB
    await user.save();

    return user;
  }
};