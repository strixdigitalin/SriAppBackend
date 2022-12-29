import { MeridianLogy } from '@interfaces/meridianlogy.interface';
import { model, Schema, Document } from 'mongoose';

const meridianlogyTypeSchema: Schema = new Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  model3D: {
    type: Array,
  },
  videos: {
    type: Array,
  },
  headToToeOrder: {
    type: Number,
    required: true,
  },
});

const meridianLogySchema: Schema = new Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  types: [
    {
      type: meridianlogyTypeSchema,
      required: true,
    },
  ],
});

const meridianLogyModel = model<MeridianLogy & Document>('MeridianLogy', meridianLogySchema);

export default meridianLogyModel;
