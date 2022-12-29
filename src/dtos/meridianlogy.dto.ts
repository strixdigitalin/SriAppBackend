import { IsString } from 'class-validator';

export class CreateMeridianLogyDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;
}
export class CreateMeridianLogyTypeDto {
  @IsString()
  public name: string;
  @IsString()
  public _id: string;
  public model3D: any;
  public videos: any;
  @IsString()
  public headToToeOrder: number;
}

export class UpdateMeridianLogyTypeDto {
  @IsString()
  name: string;
  @IsString()
  _id: string;
  model3D: any;
  videos: any;
  typeId: string;

  availableVideos?: any;

  availableModels?: any;

  @IsString()
  headToToeOrder: number;
}
