import express from 'express';
import ApiResponse from '../util/api-response';
import logger from '../util/logger';
import JwtHelper from '../util/jwt-helper';
import { ExtendedRequest } from '../custom';

const AuthGuard = async (req: ExtendedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      throw new Error('Authorisation denied. Please login');
    }

    // verify token
    const decoded: any = await JwtHelper.decode(token);
    req.user = decoded.user;

    next()
  } catch (error) {
    logger.error(`[AuthGuard] - Unable to authorise user: ${error}`);
    return ApiResponse.error(res, error.message);
  }
};

export default AuthGuard;
