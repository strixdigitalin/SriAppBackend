import { Reflexology } from '@interfaces/reflexology.interface';
import { model, Schema, Document } from 'mongoose';

const bodyPartsAndLocationSchema: Schema = new Schema({
  images: {
    type: Array,
  },
  videos: {
    type: Array,
  },
  headToToeOrder: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const healthConditionSchema: Schema = new Schema({
  images: {
    type: Array,
  },
  videos: {
    type: Array,
  },
  headToToeOrder: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const reflexologyTypeSchema: Schema = new Schema({
  healthCondition: [
    {
      type: healthConditionSchema,
    },
  ],
  bodyPartsAndLocation: [
    {
      type: bodyPartsAndLocationSchema,
      required: true,
    },
  ],
});

const reflexologySchema: Schema = new Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  types: {
    type: reflexologyTypeSchema,
    required: false,
    default: {
      healthCondition: [],
      bodyPartsAndLocation: [],
    },
  },
});

const reflexologyModel = model<Reflexology & Document>('Reflexology', reflexologySchema);

export default reflexologyModel;
