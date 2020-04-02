import { injectable } from "inversify";
import Profile from '../models/profile.model';

export interface ProfileRepository {
  findOneByUserId(_id: string): Promise<any>
}

@injectable()
export class ProfileRepositoryImpl implements ProfileRepository {

  async findOneByUserId(_id: string): Promise<any> {
    return await Profile.findOne({ user: _id }).populate('User', [ 'name', 'avatar' ]);
  }
}