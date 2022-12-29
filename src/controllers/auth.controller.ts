import { LoginUserDto } from './../dtos/users.dto';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, CreateOtpDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import * as jwt from 'jsonwebtoken';

import { SECRET_KEY } from '@config';

import passport from 'passport';

class AuthController {
  public authService = new AuthService();
  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      } else {
        return next();
      }
    });
  }

  public authorizeJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err, user, jwtToken) {
      if (err) {
        console.log(err);
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      } else {
        const scope = req.baseUrl.split('/').slice(-1)[0];
        const authScope = jwtToken.scope;
        if (authScope && authScope.indexOf(scope) > -1) {
          return next();
        } else {
          return res.status(401).json({ status: 'error', code: 'unauthorized' });
        }
      }
    });
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      const token = jwt.sign({ _id: signUpUserData._id, scope: 'user' }, SECRET_KEY);
      //res.status(201).json({ data: signUpUserData, message: 'signup' });
      res.status(201).json({ data: signUpUserData, message: 'signup', token });
    } catch (error) {
      next(error);
    }
  };

  public otpVerified = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const otpData: CreateOtpDto = req.body;
      const otpFinalData: boolean = await this.authService.otpVerified(otpData);
      if (otpFinalData) {
        res.status(200).json({ message: 'otp-verified', success: true });
      } else {
        res.status(403).json({ message: 'otp-not- verified', success: false });
      }
    } catch (error) {
      next(error);
    }
  };

  public sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const otpData: CreateOtpDto = req.body;
      if (otpData.email) {
        const user = await this.authService.findUser({
          email: otpData.email,
        });
        if (user) {
          res.status(403).json({ message: 'user alredy exists' });
        }
      }
      if (otpData.mobileNumber) {
        const user = await this.authService.findUser({
          mobileNumber: otpData.mobileNumber,
        });
        if (user) {
          res.status(403).json({ message: 'user alredy exists' });
        }
      }
      await this.authService.sendOTP(otpData);

      res.status(200).json({ message: 'otp-sent' });
    } catch (error) {
      next(error);
    }
  };

  public loginGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.body;
      const signUpUserData: User = await this.authService.loginGoogle(userData);
      const token = jwt.sign({ _id: userData._id, scope: 'user' }, SECRET_KEY);

      res.status(201).json({ data: signUpUserData, message: 'signup', token });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { findUser } = await this.authService.login(userData);

      const token = jwt.sign({ _id: findUser._id, scope: 'user' }, SECRET_KEY);

      res.status(200).json({ data: findUser, message: 'login', token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
