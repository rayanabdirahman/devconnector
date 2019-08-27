import { Document } from 'mongoose';

export interface UserSignUpModel extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  date: Date;
}