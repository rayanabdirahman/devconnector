import { UserSocialMedia, UserEducation, UserExperience } from "../data_access/interfaces";

export interface SignUpModel {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface JwtUserPayload {
  _id: string
}

export interface CreateProfileModel {
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string | string[],
  bio?: string;
  githubusername?: string;
  experience: UserExperience[];
  education: UserEducation[];
  social: UserSocialMedia;
}
