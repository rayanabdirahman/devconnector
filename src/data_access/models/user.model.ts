import { SignUpModel } from './../../domain/interfaces';
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<SignUpModel>('User', UserSchema);