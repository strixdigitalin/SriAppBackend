export interface Subscription {
  _id: string;
  UserId: string;
  startDate: Date;
  endDate: Date;
  accessType: string;
  orderId: string;
}
