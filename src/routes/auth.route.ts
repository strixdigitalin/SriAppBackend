import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto, LoginGoogleUserDto, CreateOtpDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}send-otp`, validationMiddleware(CreateOtpDto, 'body', true), this.authController.sendOTP);

    this.router.post(`${this.path}otp-verified`, validationMiddleware(CreateOtpDto, 'body', true), this.authController.otpVerified);
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(LoginUserDto, 'body', true), this.authController.logIn);
    this.router.post(`${this.path}loginGoogle/`, validationMiddleware(LoginGoogleUserDto, 'body'), this.authController.loginGoogle);
  }
}

export default AuthRoute;
