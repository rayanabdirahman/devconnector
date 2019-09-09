import mongoose from 'mongoose';

export interface SignUpModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

export interface UserModel {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  date?: Date;
  id?: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface ProfileModel extends mongoose.Document {
  user: object;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubUserName?: string;
  expreience: Experience[];
  education: Education[];
  social?: SocialMedia;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
}

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
}

interface SocialMedia {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedIn?: string;
  instagram?: string;
}