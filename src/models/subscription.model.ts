import { Subscription } from './../interfaces/subscription.interface';
import { model, Schema, Document, Types } from 'mongoose';

const subScriptionSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  accessType: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  orderId: {
    type: Types.ObjectId,
    ref: 'Orders',
  },
});

const subscriptionModel = model<Subscription & Document>('Subscription', subScriptionSchema);

export default subscriptionModel;
