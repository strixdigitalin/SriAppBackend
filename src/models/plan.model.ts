import { Plan } from './../interfaces/plan.interface';
import { model, Schema, Document } from 'mongoose';

const planSchema: Schema = new Schema({
  planId: {
    type: String,
  },
  ItemId: {
    type: String,
  },
  interval: {
    type: String,
  },
  period: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  amount: {
    type: String,
  },
  unit_amount: {
    type: String,
  },
  currency: {
    type: String,
  },
  type: {
    type: String,
  },
  notes_key_1: {
    type: String,
  },
  notes_key_2: {
    type: String,
  },
});

const planModel = model<Plan & Document>('Plan', planSchema);

export default planModel;
