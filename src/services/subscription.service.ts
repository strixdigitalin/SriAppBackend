import { Order } from './../interfaces/order.interface';
import { Plan } from './../interfaces/plan.interface';

import userModel from '@models/users.model';

import planModel from '@/models/plan.model';
import orderModal from '@/models/order.model';
import subscriptionModel from '@/models/subscription.model';
import moment from 'moment';

class SubScriptionService {
  public users = userModel;
  public orders = orderModal;
  public subscriptions = subscriptionModel;
  public plan = planModel;

  public async getPlans(): Promise<any> {
    return await this.plan.find();
  }
  public async getPlan(id: string): Promise<Plan> {
    return await this.plan.findById(id);
  }

  public async createOrder(payload: any): Promise<any> {
    return await this.orders.create(payload);
  }
  public async getOrder(id: any): Promise<any> {
    return await this.orders.findById(id);
  }
  public async getSubscriptions(): Promise<any> {
    return await this.subscriptions.find().populate('userId');
  }

  public async updatePlan(id: string, payload: any) {
    const plan = await this.plan.findById(id);
    console.log({ plan });

    await this.plan.updateOne(
      {
        _id: id,
      },
      payload,
    );
  }
  public async preveiousOrder(planId: string, userId: string): Promise<any> {
    const orders = await this.orders.find({
      planId,
      userId,
      status: 'pending',
    });
    for (const order of orders) {
      if (moment(order.endDate).isAfter(new Date())) {
        return order;
      }
    }
    return null;
  }

  public async createSubscription(orderId: any): Promise<any> {
    const order: any = await this.orders.findOne({ orderId: orderId }).populate('userId planId');
    const accessType = order.planId?.name;
    const startDate = new Date();
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();
    const endDate = new Date(year + 1, month, day);
    await this.orders.updateOne(
      {
        _id: order._id,
      },
      {
        status: 'completed',
      },
    );
    const newSubScription = await this.subscriptions.create({
      startDate,
      endDate,
      orderId: order._id,
      amount: order.planId.amount,
      accessType,
      userId: order.userId._id,
    });
    return newSubScription;
  }
}

export default SubScriptionService;
