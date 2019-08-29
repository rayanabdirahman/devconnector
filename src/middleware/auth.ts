import jwt from 'jsonwebtoken';
import express from 'express';
import { ErrorMessage } from '../domain/enums';

export const AuthGuard =  (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // get JWT token from request header
  const token = req.header('x-auth-token');

  // Send unauthorised error message if token is not found in request header
  if (!token) {
    return res.status(401).json({ error: ErrorMessage.NOT_AUTHORISED })
  }

  try {
    // Decode JWT token
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    // Assign decoded user value to req.user
    req.user = decoded.user;
    next();

  }
  catch (error) {
    res.status(401).json({ error: ErrorMessage.TOKEN_IS_NOT_VALID });
  }
}