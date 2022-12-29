import { OTP } from './../interfaces/otp.interface';
import { model, Schema, Document } from 'mongoose';

const otpSchema: Schema = new Schema({
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
});

const otpModel = model<OTP & Document>('OTP', otpSchema);

export default otpModel;
