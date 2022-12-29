import { ReflexologyType } from '@interfaces/reflexologyType.interface';
export interface Reflexology {
  _id: string;
  description: string;
  types?: ReflexologyType;
  name: string;
}
