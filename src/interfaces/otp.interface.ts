export interface OTP {
  _id: string;
  email: string;

  verified: boolean;

  mobile: string;
  otp: string;
}
