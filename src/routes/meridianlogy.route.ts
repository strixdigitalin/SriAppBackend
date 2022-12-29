import { upload } from './../services/multer.service';
import { CreateMeridianLogyDto, CreateMeridianLogyTypeDto } from './../dtos/meridianlogy.dto';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import MeridianLogyController from '@controllers/meridianlogy.controller';
import MeridianlogyMiddleware from '@/middlewares/Meridianlogy.middleware';

class MeridianLogyRoute implements Routes {
  public path = '/meridianlogy';
  public router = Router();
  public meridianlogyController = new MeridianLogyController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/type`,
      upload.fields([
        {
          name: 'videos',
          maxCount: 5,
        },
        {
          name: 'model3D',
          maxCount: 5,
        },
      ]),
      // validationMiddleware(UpdateMeridianLogyTypeDto, 'body'),
      this.meridianlogyController.updateMeridianlogy,
    );

    this.router.post(
      `${this.path}/type`,
      upload.fields([
        {
          name: 'videos',
          maxCount: 5,
        },
        {
          name: 'model3D',
          maxCount: 5,
        },
      ]),
      validationMiddleware(CreateMeridianLogyTypeDto, 'body'),
      this.meridianlogyController.createMeridianlogyType,
    );

    //this.router.post(`${this.path}/update`, validationMiddleware(CreateMeridianLogyDto, 'body'), this.meridianlogyController.updateMeridianlogy);
    this.router.post(`${this.path}`, validationMiddleware(CreateMeridianLogyDto, 'body'), this.meridianlogyController.createMeridianlogy);
    this.router.get(`${this.path}/`, authMiddleware, MeridianlogyMiddleware, this.meridianlogyController.getAllMeridianlogy);
    this.router.get(`${this.path}/:id`, authMiddleware, MeridianlogyMiddleware, this.meridianlogyController.getAllMeridianlogyByid);
    this.router.delete(`${this.path}/:meridianlogyId/:id`, MeridianlogyMiddleware, this.meridianlogyController.deleteMeridianLogy);
  }
}

export default MeridianLogyRoute;
