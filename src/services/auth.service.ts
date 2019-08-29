import User from '../data_access/models/user.model';

export class AuthService {

  async findUserById (id: string) {
    return await User.findById(id).select('-password');
  }

  async findOneUser (email: string) {
    return await User.findOne({ email });
  }
}