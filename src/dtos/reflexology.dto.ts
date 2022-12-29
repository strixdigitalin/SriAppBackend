import { IsString } from 'class-validator';

export class CreateReflexologyDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;
}

export class CreateReflexologTypeDto {
  @IsString()
  public name: string;
  @IsString()
  public _id: string;
  public model3D: any;
  public videos: any;
  public headToToeOrder?: number;
}
export class CreateReflexologHealthTypeDto {
  @IsString()
  public name: string;
  @IsString()
  public _id: string;
  @IsString()
  public title: any;
  @IsString()
  public description: any;
  public headToToeOrder?: number;

  images: string[];
}
export class UpdateReflexologHealthTypeDto {
  public name?: string;
  public _id?: string;
  public title?: any;
  public description?: any;
  public headToToeOrder?: number;
  public availableImages?: string[];
  images?: string[];
}
export class UpdateReflexologBodyTypeAndLocationDto {
  public name?: string;
  public _id?: string;
  public typeId?: string;

  public title?: any;
  public description?: any;
  public headToToeOrder?: number;
  public availableImages?: string[];
  images?: string[];
}
export class CreateBodyTypeAndLocationDto {
  @IsString()
  public name: string;
  @IsString()
  public _id: string;
  @IsString()
  public title: any;
  @IsString()
  public description: any;
  public headToToeOrder?: number;

  images: string[];
}
