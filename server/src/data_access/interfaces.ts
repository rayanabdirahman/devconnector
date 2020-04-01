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
