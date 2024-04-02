// models/userModel.ts
import mongoose, { Document } from 'mongoose';

// Define interface for user document
interface IUser extends Document {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
}

const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean
});

// Define model for user document
const User = mongoose.model<IUser>('User', userSchema);

export default User;
