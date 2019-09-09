import { ProfileService } from './../../services/profile.service';
import express from 'express';
import { ErrorMessage } from '../../domain/enums';

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  getCurrentUserProfile = async (req: express.Request, res: express.Response) => {
    try {
      const { id: userId } = req.user;

      // stores current user profile populated with users name and avatar
      const profile = await this.profileService.findCurrentUserProfile(userId);

      if (!profile) {
        return res.status(400).json({ error: ErrorMessage.NO_PROFILE });
      }

      return res.json(profile);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}