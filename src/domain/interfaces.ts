import mongoose from 'mongoose';

export interface SignUpModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}