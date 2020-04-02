import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date
}

export interface LoggedInUserModel {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  avatar: string;
  date: Date;
}


export interface ProfileModel extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: [string],
  bio?: string;
  githubusername?: string;
  experience: [UserExperience];
  education: [UserEducation];
  social: UserSocialMedia;
  date: Date
};

export interface UserExperience {
  title: string;
  company: string;
  location?: string;
  from: Date;
  to: Date;
  current: boolean,
  description?: string
}

export interface UserEducation {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean,
  description?: string
}

export interface UserSocialMedia {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}