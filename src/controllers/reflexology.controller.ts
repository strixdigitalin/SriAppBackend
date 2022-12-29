import { CreateReflexologHealthTypeDto } from './../dtos/reflexology.dto';
import * as _ from 'lodash';
import { Reflexology } from './../interfaces/reflexology.interface';
import { uploadToCloudinary } from './../services/multer.service';

import { NextFunction, Request, Response } from 'express';

import { CreateReflexologyDto } from '@/dtos/reflexology.dto';
import ReflexologyService from '@/services/reflexology.service';
class ReflexologyController {
  public reflexplogyService = new ReflexologyService();

  public createReflexology = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyData: CreateReflexologyDto = req.body;
      const createReflexologyData: Reflexology = await this.reflexplogyService.createReflexology(reflexologyData);

      res.status(201).json({ data: createReflexologyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public createReflexologyHealthType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyData: CreateReflexologHealthTypeDto = req.body;

      const imagesFiles = req.files['images'];

      const imagesLinks = [];
      for (const image of imagesFiles) {
        const url = await uploadToCloudinary(image.path);
        imagesLinks.push(url);
      }

      const reflexology = await this.reflexplogyService.addReflexologyHealthType({
        images: imagesLinks,
        _id: reflexologyData._id,
        name: reflexologyData.name,
        headToToeOrder: reflexologyData.headToToeOrder,
        title: reflexologyData.title,
        description: reflexologyData.description,
      });

      res.status(201).json({ data: reflexology, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateReflexologyHealthType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyData = req.body;

      const imagesLinks = [];

      if (req.files) {
        const imagesFiles = req.files['images'];
        if (imagesFiles)
          for (const image of imagesFiles) {
            const url = await uploadToCloudinary(image.path);
            imagesLinks.push(url);
          }
      }
      if (reflexologyData.availableImages)
        for (const url of reflexologyData.availableImages) {
          imagesLinks.push(url);
        }
      const reflexology = await this.reflexplogyService.updateReflexologyHealthAndCondition({
        images: imagesLinks,
        _id: reflexologyData?._id,
        name: reflexologyData?.name,
        title: reflexologyData?.title,
        description: reflexologyData?.description,
        typeId: reflexologyData?.typeId,
      });

      res.status(201).json({ data: reflexology, message: 'success' });
    } catch (err) {
      next(err);
    }
  };

  public updateReflexologyBodyParts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyData = req.body;

      const imagesLinks = [];

      if (req.files) {
        const imagesFiles = req.files['images'];
        if (imagesFiles)
          for (const image of imagesFiles) {
            const url = await uploadToCloudinary(image.path);
            imagesLinks.push(url);
          }
      }
      if (reflexologyData.availableImages)
        for (const url of reflexologyData.availableImages) {
          imagesLinks.push(url);
        }
      const reflexology = await this.reflexplogyService.updateReflexologyBodyParts({
        images: imagesLinks,
        _id: reflexologyData?._id,
        name: reflexologyData?.name,
        title: reflexologyData?.title,
        description: reflexologyData?.description,
        typeId: reflexologyData?.typeId,
      });

      res.status(201).json({ data: reflexology, message: 'success' });
    } catch (err) {
      next(err);
    }
  };

  public createReflexologyBodyTypeAndLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyData: CreateReflexologHealthTypeDto = req.body;
      const imagesFiles = req.files['images'];

      const imagesLinks = [];
      for (const image of imagesFiles) {
        const url = await uploadToCloudinary(image.path);
        imagesLinks.push(url);
      }

      const reflexology = await this.reflexplogyService.addReflexologyBodyTypeAndLocation({
        images: imagesLinks,
        _id: reflexologyData._id,
        name: reflexologyData.name,
        headToToeOrder: reflexologyData.headToToeOrder,
        title: reflexologyData.title,
        description: reflexologyData.description,
      });

      res.status(201).json({ data: reflexology, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public getBodyTypeAndLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyId = req.params.id;

      const reflexolgy = await this.reflexplogyService.findReflexologyById(reflexologyId);
      const { types } = reflexolgy;
      let { bodyPartsAndLocation } = types;
      const orderBy = req.query.orderBy;

      if (orderBy === 'atoz') {
        bodyPartsAndLocation = _.sortBy(bodyPartsAndLocation, [
          o => {
            return o.name;
          },
        ]);
      }
      if (orderBy === 'headtotoe') {
        bodyPartsAndLocation = _.sortBy(bodyPartsAndLocation, [
          o => {
            return o.headToToeOrder;
          },
        ]);
      }
      res.status(201).json({ data: bodyPartsAndLocation, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public getHealthAndCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyId = req.params.id;

      const orderBy = req.query.orderBy;

      const reflexolgy = await this.reflexplogyService.findReflexologyById(reflexologyId);
      const { types } = reflexolgy;
      let { healthCondition } = types;
      if (orderBy === 'atoz') {
        healthCondition = _.sortBy(healthCondition, [
          o => {
            return o.name;
          },
        ]);
      }
      if (orderBy === 'headtotoe') {
        healthCondition = _.sortBy(healthCondition, [
          o => {
            return o.headToToeOrder;
          },
        ]);
      }
      res.status(201).json({ data: healthCondition, message: 'success' });
    } catch (error) {
      console.log(error);

      next(error);
    }
  };

  public getAllReflexology = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let reflexolgy = await this.reflexplogyService.findReflexology();
      reflexolgy = reflexolgy.map(ref => {
        return {
          _id: ref._id,
          name: ref.name,
          description: ref.description,
        };
      });
      res.status(201).json({ data: reflexolgy, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteReflexologyBodyPart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyId: string = req.params.reflexologyId;
      const typeId: string = req.params.typeId;

      const deleteReflexplogyIdData: Reflexology = await this.reflexplogyService.deletereflexologyBodyPartAndLocation(reflexologyId, typeId);

      res.status(200).json({ data: deleteReflexplogyIdData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public deleteReflexologyHealthCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexologyId: string = req.params.reflexologyId;
      const typeId: string = req.params.typeId;

      const deleteReflexplogyIdData: Reflexology = await this.reflexplogyService.deletereflexologyHealthAndConditon(reflexologyId, typeId);

      res.status(200).json({ data: deleteReflexplogyIdData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReflexologyController;
