import express from 'express';
import { AuthService } from '../../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authoriseUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id: userId } = req.user;

      const user = await this.authService.findUserById(userId);

      res.json(user);
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}