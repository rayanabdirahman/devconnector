import { UserModel } from './../domain/interfaces';
import Profile from '../data_access/models/profile.model';
import User from '../data_access/models/user.model';

export class ProfileService {
  findCurrentUserProfile = async (id: string) => {
    return await Profile.findOne({ user: id }).populate('user', ['name', 'avatar']);
  } 
};