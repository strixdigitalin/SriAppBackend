import { LoginUserDto, CreateOtpDto } from './../dtos/users.dto';
import { hash, compare } from 'bcrypt';

import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { sendMailForForfotPassword } from '../services/sendmail.service';
import otpModel from '@/models/otp.model';

class AuthService {
  public users = userModel;
  public otp = otpModel;

  public async otpVerified(payload: CreateOtpDto): Promise<any> {
    if (payload.email) {
      const isOtpExist = await this.otp.findOne({
        email: payload.email,
      });
      console.log(isOtpExist);

      if (isOtpExist) {
        if (isOtpExist.otp === payload.otp) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
    if (payload.mobileNumber) {
      const isOtpExist = await this.otp.findOne({
        mobileNumber: payload.mobileNumber,
      });
      if (isOtpExist) {
        if (isOtpExist.otp === payload.otp) {
          return true;
        } else {
          return false;
        }
      } else return false;
    }
    return false;
  }

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const findMobile: User = await this.users.findOne({ mobile: userData.mobile.toString() });
    if (findMobile) throw new HttpException(409, `You're Mobile ${userData.mobile} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    delete createUserData.password;
    return createUserData;
  }

  public async sendOTP(payload: CreateOtpDto): Promise<any> {
    try {
      if (payload.email) {
        const isOtpExist = await this.otp.findOne({
          email: payload.email,
        });
        if (isOtpExist) {
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
          isOtpExist.otp = otp;
          await this.otp.updateOne(
            {
              _id: isOtpExist._id,
            },
            isOtpExist,
          );
          isOtpExist.verified = false;
          await sendMailForForfotPassword(payload.email, otp, payload.email);
        } else {
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
          await this.otp.create({
            email: payload.email,
            otp,
          });

          await sendMailForForfotPassword(payload.email, otp, payload.email);
        }
      }
      if (payload.mobileNumber) {
        const isOtpExist = await this.otp.findOne({
          mobileNumber: payload.mobileNumber,
        });
        if (isOtpExist) {
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
          isOtpExist.otp = otp;
          isOtpExist.verified = false;
          await this.otp.updateOne(
            {
              id: isOtpExist.id,
            },
            isOtpExist,
          );
          //  await sendMailForForfotPassword(payload.email, otp, payload.email);
        } else {
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
          await this.otp.create({
            email: payload.mobileNumber,
            otp,
          });
          // await sendMailForForfotPassword(payload.mobileNumber, otp, payload.mobileNumber);
        }
      }
    } catch (err) {
      throw err;
    }
  }

  public async findUser(criteria: any): Promise<User> {
    try {
      const findUser: User = await this.users.findOne(criteria);
      return findUser;
    } catch (err) {
      throw err;
    }
  }

  public async login(userData: LoginUserDto): Promise<{ findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    console.log(userData);

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

      return { findUser };
    } else {
      const findUser: User = await this.users.findOne({ mobile: userData.mobile });
      if (!findUser) throw new HttpException(409, `You're Phione ${userData.mobile} not found`);

      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
      return { findUser };
    }
  }
  public async loginGoogle(userData: LoginUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    let findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) {
      const createUserData: User = await this.users.create({ ...userData, password: '123456', fromGoogle: 'yes' });
      delete createUserData.password;
    }
    findUser = await this.users.findOne({ email: userData.email });

    return findUser;
  }
}

export default AuthService;
