export interface User {
  _id: string;
  email: string;
  password: string;
  fullname: string;
  name: string;
  mobile: string;
  otp: string;
  gender: string;
  isAdmin?: boolean;
  isFreeAccess?: boolean;
}
