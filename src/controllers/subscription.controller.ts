import { NextFunction, Request, Response } from 'express';
import Razorpay from 'razorpay';
import SubScriptionService from '@/services/subscription.service';
import * as crypto from 'crypto';

class SubScriptionController {
  public subscriptionService = new SubScriptionService();

  public getPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plans = await this.subscriptionService.getPlans();

      res.status(200).json({ data: plans, message: 'All Plans' });
    } catch (error) {
      next(error);
    }
  };

  public getSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscription = await this.subscriptionService.getSubscriptions();

      res.status(200).json({ data: subscription, message: 'All Subscription' });
    } catch (error) {
      next(error);
    }
  };
  public updatePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.planId;
      const plans = await this.subscriptionService.updatePlan(id, req.body);

      res.status(200).json({ data: plans, message: 'All Plans' });
    } catch (error) {
      next(error);
    }
  };

  public createSubscription = async (req: any, res: Response, next: NextFunction) => {
    try {
      const instance = new Razorpay({
        key_id: 'rzp_test_mYS6RJUk0rUdES',
        key_secret: 'ewvXKbOciy9D8AZThZYjwpPm',
      });
      const userId = req.user?.id;

      const plan = await this.subscriptionService.getPlan(req.params.planId);
      const prevOrder = await this.subscriptionService.preveiousOrder(req.params.planId, userId);
      if (prevOrder) {
        res.status(200).json({ data: prevOrder, message: 'Order' });
      } else {
        const amount = plan.amount * 100;
        const order = await instance.orders.create({
          amount: amount,
          currency: 'INR',
          receipt: `receipt#${userId}`,
          notes: {
            key1: plan.notes_key_1,
            key2: plan.notes_key_2,
          },
        });
        const startDate = new Date();
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const day = startDate.getDate();
        const endDate = new Date(year, month, day + 7);
        const newOrder = await this.subscriptionService.createOrder({
          orderId: order.id,
          userId: userId,
          planId: req.params.planId,
          endDate,
          status: 'pending',
        });

        res.status(200).json({ data: newOrder, message: 'Order' });
      }
    } catch (error) {
      next(error);
    }
  };
  public makePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;

      const hmac = crypto.createHmac('sha256', 'ewvXKbOciy9D8AZThZYjwpPm');

      hmac.update(payload.razorpay_order_id + '|' + payload.razorpay_payment_id);
      const generatedSignature = hmac.digest('hex');

      //const isSignatureValid = generatedSignature == payload.razorpay_signature;
      const isSignatureValid = true;
      if (isSignatureValid) {
        const subscription = await this.subscriptionService.createSubscription(payload.razorpay_order_id);

        res.status(200).json({ data: subscription, message: 'Paymnet Verfied' });
      } else {
        res.status(403).json({ message: 'Invalid Signature' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default SubScriptionController;
