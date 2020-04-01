import jwt, { sign } from 'jsonwebtoken';
import { UserModel } from '../data_access/interfaces';

interface JwtHelper {
  sign(user: UserModel): Promise<string>;
  decode(token: string): Promise<string | object>
}

const JwtHelper: JwtHelper = {
  async sign(user: UserModel): Promise<string> {
    const payload = {
      user: {
        _id: user._id
      }
    }
    return await jwt.sign(payload, `${process.env.JWT_SECRET}`, {expiresIn: `${process.env.JWT_EXPIRES_IN}`})
  },

  async decode(token: string): Promise<string | object> {
    return await jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
};

export default JwtHelper;
