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
  password: string;
  avatar: string;
  id?: string;
}