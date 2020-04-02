import { injectable } from "inversify";
import Profile from '../models/profile.model';
import { CreateProfileModel } from "../../domain/interfaces";
import { ProfileModel } from "../interfaces";

export interface ProfileRepository {
  create(model: CreateProfileModel): Promise<ProfileModel>
  findOneByUserId(_id: string): Promise<any>
}

@injectable()
export class ProfileRepositoryImpl implements ProfileRepository {

  async create(model: CreateProfileModel): Promise<ProfileModel> {
    const profile = new Profile(model);
    return await profile.save();
  }

  async findOneByUserId(_id: string): Promise<any> {
    return await Profile.findOne({ user: _id }).populate('User', [ 'name', 'avatar' ]);
  }
}