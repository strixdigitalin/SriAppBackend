import { Order } from './../interfaces/order.interface';
import { model, Schema, Document, Types } from 'mongoose';

const orderSchema: Schema = new Schema({
  planId: {
    type: Types.ObjectId,
    ref: 'Plan',
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
  },
});

const orderModal = model<Order & Document>('Orders', orderSchema);

export default orderModal;
