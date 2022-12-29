import { CreateReflexologyDto } from '@/dtos/reflexology.dto';
import { CreateReflexologHealthTypeDto, UpdateReflexologHealthTypeDto } from './../dtos/reflexology.dto';
import { upload } from './../services/multer.service';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import ReflexologyController from '@controllers/reflexology.controller';
import ReflexologyMiddleware from '@/middlewares/reflexology.middleware';
class ReflexologyRoute implements Routes {
  public path = '/reflexology';
  public router = Router();
  public reflexologyController = new ReflexologyController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/healthconditon/`,
      upload.fields([
        {
          name: 'images',
          maxCount: 5,
        },
      ]),
      validationMiddleware(CreateReflexologHealthTypeDto, 'body'),
      this.reflexologyController.createReflexologyHealthType,
    );
    this.router.post(
      `${this.path}/bodypartandlocation/`,
      upload.fields([
        {
          name: 'images',
          maxCount: 5,
        },
      ]),
      validationMiddleware(CreateReflexologHealthTypeDto, 'body'),
      this.reflexologyController.createReflexologyBodyTypeAndLocation,
    );

    //this.router.put(`${this.path}/:id`, validationMiddleware(CreateReflexologyDto, 'body', true), this.reflexologyController.updateReflexology);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateReflexologyDto, 'body'),
      this.reflexologyController.createReflexology,
    );
    this.router.put(
      `${this.path}/healthcondition/`,
      upload.fields([
        {
          name: 'images',
          maxCount: 5,
        },
      ]),
      this.reflexologyController.updateReflexologyHealthType,
    );
    this.router.put(
      `${this.path}/bodyandlocation/`,
      upload.fields([
        {
          name: 'images',
          maxCount: 5,
        },
      ]),
      this.reflexologyController.updateReflexologyBodyParts,
    );
    this.router.get(`${this.path}/bodyandlocation/:id`, authMiddleware, ReflexologyMiddleware, this.reflexologyController.getBodyTypeAndLocation);
    this.router.get(`${this.path}/healthandcondition/:id`, authMiddleware, ReflexologyMiddleware, this.reflexologyController.getHealthAndCondition);
    this.router.get(`${this.path}/`, authMiddleware, ReflexologyMiddleware, this.reflexologyController.getAllReflexology);
    this.router.delete(
      `${this.path}/bodyandlocation/:reflexologyId/:typeId`,
      ReflexologyMiddleware,
      this.reflexologyController.deleteReflexologyBodyPart,
    );
    this.router.delete(
      `${this.path}/healthandcondition/:reflexologyId/:typeId`,
      ReflexologyMiddleware,
      this.reflexologyController.deleteReflexologyHealthCondition,
    );
  }
}

export default ReflexologyRoute;
