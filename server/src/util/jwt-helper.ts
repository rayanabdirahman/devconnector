import jwt, { sign } from 'jsonwebtoken';
import { UserModel } from '../data_access/interfaces';

interface JwtHelper {
  sign(user: UserModel): Promise<string>
}

const JwtHelper = {
  async sign(user: UserModel): Promise<string> {
    const payload = {
      user: {
        id: user._id
      }
    }
    return await jwt.sign(payload, `${process.env.JWT_SECRET}`, {expiresIn: `${process.env.JWT_EXPIRES_IN}`})
  }
};

export default JwtHelper;
