import { UserModel } from './../domain/interfaces';
import Profile from '../data_access/models/profile.model';
import User from '../data_access/models/user.model';

export class ProfileService {
  /**
   * Find profile of current user
   * @param { string } id 
   */
  async findCurrentUserProfile(id: string) {
    return await Profile.findOne({ user: id }).populate('user', ['name', 'avatar']);
  } 
};