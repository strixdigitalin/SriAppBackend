export interface ReflexologyType {
  _id: string;
  healthCondition: IHealthCondition[];
  bodyPartsAndLocation: IBodyPartsAndLocation[];
}

export interface IBodyPartsAndLocation {
  images: string[];
  videos: string[];
  headToToeOrder?: number;
  description: string;
  name: string;
  title: string;
  _id?: string;
}
export interface IHealthCondition {
  images: string[];
  videos: string[];
  headToToeOrder?: number;
  description: string;
  name: string;
  title: string;
  _id?: string;
}
