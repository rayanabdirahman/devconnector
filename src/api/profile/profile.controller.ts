import express from 'express';
import { ProfileModel } from './../../domain/interfaces';
import { ProfileService } from './../../services/profile.service';
import { ErrorMessage } from '../../domain/enums';
import { ProfileValidator } from './profile.validation';

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

  async createProfile (req: express.Request, res: express.Response) {
    try {
      // store request body
      const profileModel: ProfileModel = {
        ...req.body
      }

      // Ensure all required fields have been filled
      const validity = ProfileValidator.createProfile(profileModel);
      if (validity.error) {
        const { message } = validity.error;
        return res.status(400).json({error: message});
      }

      // convert skills string into array
      const { skills } = req.body;
      profileModel.skills = skills.split(',').map(skill => skill.trim());

      // store user id
      const user = req.user.id;

      // Build user profile
      const profile = {
        user,
        ...profileModel
      };

      return res.json({profile})

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    
  }
}