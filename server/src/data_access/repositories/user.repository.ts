import { injectable } from 'inversify';
import User from '../models/user.model';
import { SignUpModel } from '../../domain/interfaces';
import { UserModel } from '../interfaces';

export interface UserRepository {
  create(model: SignUpModel): Promise<UserModel>
  findByEmail(email: string): Promise<UserModel | null>
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  async create(model: SignUpModel): Promise<UserModel> {
    const user = new User(model);
    return await user.save();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await User.findOne({ email });
  }
}