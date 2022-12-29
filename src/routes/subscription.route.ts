import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import SubScriptionController from '@/controllers/subscription.controller';
class SubscriptionRoute implements Routes {
  public path = '/subscriptions';
  public router = Router();
  public usersController = new UsersController();

  public subscriptionController = new SubScriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, authMiddleware, this.subscriptionController.getSubscription);

    this.router.get(`${this.path}/plans`, authMiddleware, this.subscriptionController.getPlans);
    this.router.post(`${this.path}/plan/:planId`, authMiddleware, this.subscriptionController.updatePlan);

    this.router.get(`${this.path}/link/:planId`, authMiddleware, this.subscriptionController.createSubscription);
    this.router.post(`${this.path}`, authMiddleware, this.subscriptionController.makePayment);
  }
}

export default SubscriptionRoute;
