import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';
import subscriptionModel from '@/models/subscription.model';
import moment from 'moment';

const ReflexologyMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);
      //const findUser = await userModel.findOne({ _id: userId });

      if (findUser) {
        if (findUser.isFreeAccess) {
          next();
        }
        let subscriptions = await subscriptionModel.find({
          userId: findUser._id,
          accessType: 'Reflexology',
        });
        console.log(subscriptions);
        for (const subscription of subscriptions) {
          if (moment(new Date()).isBefore(subscription.endDate)) {
            next();
            return;
          }
        }
        subscriptions = await subscriptionModel.find({
          userId: findUser._id,
          accessType: 'Both',
        });
        for (const subscription of subscriptions) {
          if (moment(new Date()).isBefore(subscription.endDate)) {
            next();
            return;
          }
        }
        next()
        // next(new HttpException(401, 'No Active Plan For Reflexology'));
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log(error, 'errorerror');
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default ReflexologyMiddleware;
