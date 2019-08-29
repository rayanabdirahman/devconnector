import jwt from 'jsonwebtoken';
import { UserModel } from '../domain/interfaces';

export const jwtHelper = {
  /**
   * Signs JWT token using user id
   * @returns { string } 
   */
  async signJWTToken(user: UserModel): Promise<string>  {
    const { id } = user;

    const JWT_PAYLOAD = {
      user: {
        id
      }
    };

    return await jwt.sign(JWT_PAYLOAD, `${process.env.JWT_SECRET}`, {expiresIn: `${process.env.JWT_EXPIRES_IN}`});
  },

  async decodeToken(token: string) {
    return await jwt.verify(token, `${process.env.JWT_SECRET}`);
  }

}