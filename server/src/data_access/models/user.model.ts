import mongoose from 'mongoose';
import { UserModel } from '../interfaces';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now } 
});

export default mongoose.model<UserModel>('User', UserSchema);
