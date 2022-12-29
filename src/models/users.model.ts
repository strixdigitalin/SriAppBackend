import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
  },
  otp: {
    type: String,
  },
  type: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isFreeAccess: {
    type: Boolean,
    default: false,
  },
  isFreeReflexology: {
    type: Boolean,
    default: false,
  }
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
