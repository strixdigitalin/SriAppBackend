import { IsBoolean, IsEmail, IsEnum, IsMobilePhone, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullname: string;

  @IsString()
  public lastname: string;
  @IsBoolean()
  public isAdmin: boolean;

  @IsEnum(['male', 'female'], {
    message: 'Gender must be male or female',
  })
  public gender: string;

  @IsMobilePhone()
  public mobile: number;
}
export class UpdateUserDto {
  @IsEmail()
  public email: string;
  @IsString()
  public password?: string;
  @IsBoolean()
  public isAdmin?: Boolean;

  @IsString()
  public fullname?: string;

  @IsString()
  public lastname?: string;
 

  @IsEnum(['male', 'female'], {
    message: 'Gender must be male or female',
  })
  public gender?: string;

  @IsMobilePhone()
  public mobile?: number;

  @IsBoolean()
  public isFreeAccess?: boolean;
  @IsBoolean()
  public isFreeReflexology?: boolean;
}
export class CreateOtpDto {
  @IsString()
  otp?: string;
  @IsEmail()
  email?: string;
  @IsMobilePhone()
  mobileNumber?: string;
}

export class LoginUserDto {
  @IsEmail()
  public email?: string;

  @IsMobilePhone()
  public mobile?: string;

  @IsString()
  public password: string;
}
export class LoginGoogleUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullname: string;

  @IsString()
  public lastname: string;
}
