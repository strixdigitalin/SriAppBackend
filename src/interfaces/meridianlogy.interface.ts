import { MeridianlogyType } from './meridianlogyType.interface';
export interface MeridianLogy {
  _id: string;
  description: string;
  types: MeridianlogyType[];
}
