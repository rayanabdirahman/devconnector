import { ErrorMessage, GravatorEnum } from './../domain/enums';
import { SignUpModel, UserModel } from './../domain/interfaces';
import User from '../data_access/models/user.model';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AccountService {
  private setUserAvatar(email: string): string {
    const avatar = gravatar.url(email, {
      s: GravatorEnum.s,
      r: GravatorEnum.r,
      d: GravatorEnum.d
    });

    return avatar;
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    let user = await User.findOne({ email });
    if (user) {
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async getJWTToken(user: UserModel) {
    const JWT_PAYLOAD = {
      user: {
        id: user.id
      }
    };

    const JWT_SECRET: string = `${process.env.JWT_SECRET}`;

    jwt.sign(JWT_PAYLOAD, JWT_SECRET, { expiresIn: 360000 }, (error, token) => {
      if (error) {
        throw new Error(`${error.message}`);
      }
  
      return token;
    });
  } 

  async signUp(model: SignUpModel): UserModel {
    let userModel: UserModel;
    let user: any;

    // check is email exists
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

    // save user to DB
    await user.save();

    // encrypt password
    user.password = await this.encryptPassword(password);

    const token = await this.getJWTToken(user);
    return token;
  }
};